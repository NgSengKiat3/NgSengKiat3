let modalTask = undefined;

// Load inventory data into the table
function loadTask() {
    const tasks = getLocalStorage(localStorageKeys.task) || []; // Ensure an empty array if no data
    /**
     * @type {HTMLTableSectionElement}
     */
    const tableBody = document.querySelector('#task-table tbody');
    tableBody.innerHTML = '';

    tasks.forEach((task) => {
        const newRow = tableBody.insertRow();

        // Inventory Description
        const taskDescriptionCell = newRow.insertCell();
        const taskDescriptionInput = document.createElement('input');
        taskDescriptionInput.type ='text';
        taskDescriptionInput.value = task.quantity || '';
        taskDescriptionInput.addEventListener('change', (event) => {
            task.quantity = event.target.value;
            modalTask = task;
            saveTask();
        });
        taskDescriptionCell.appendChild(taskDescriptionInput);

        // Inventory Status (dropdown)
        const taskStatusCell = newRow.insertCell();
        const taskStatusDropdown = document.createElement('select');
        taskStatusDropdown.className = 'form-select';
        ['Available', 'Occupied', 'Under Maintanence'].forEach((status) => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            if (status === task.status) option.selected = true;
            taskStatusDropdown.appendChild(option);
        });

        taskStatusDropdown.addEventListener('change', (event) => {
            task.status = event.target.value;
            modalTask = task;
            saveTask(); // Save after updating location
        });
        taskStatusCell.appendChild(taskStatusDropdown);

        // Inventory Assigned to (dropdown)
        const taskAssignToCell = newRow.insertCell();
        const taskAssignToDropdown = document.createElement('select');
        taskAssignToDropdown.className = 'form-select';
        getLocalStorage(localStorageKeys.staff)
            .map(staff => staff.name)
            .forEach((assign) => {
                const option = document.createElement('option');
                option.value = assign;
                option.textContent = assign;
                if (assign === task.assign) option.selected = true;
                taskAssignToDropdown.appendChild(option);
            });
        taskAssignToDropdown.addEventListener('change', (event) => {
            task.assign = event.target.value;
            modalTask = task;
            saveTask(); // Save after updating restock
        });
        taskAssignToCell.appendChild(taskAssignToDropdown);

        // Delete Button
        const deleteTaskCell = newRow.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.addEventListener('click', () => {
            deleteTask(task.id, tasks);
        });
        deleteTaskCell.appendChild(deleteButton);
    });
}

// Add new inventory
function addTask() {
    modalTask = undefined;
    document.querySelector('#description').value = '';
    document.querySelector('#taskStatus').value = '';
    document.querySelector('#Assigned').value = '';

    // The inventory ID will be automatically assigned once the inventory is saved
    const tasks = getLocalStorage(localStorageKeys.task);
    let id = 1;
    if (tasks.length > 0) {
        id = Math.max(...tasks.map(task => task.id)) + 1; // Auto-increment ID
    }
}

// Save inventory
function saveTask() {

    const tasks = getLocalStorage(localStorageKeys.task);



    if (!modalTask) {
        // Add new inventory
        const taskDescription = document.querySelector('#description').value;
        const taskStatus = document.querySelector('#taskStatus').value;
        const taskAssigned = document.querySelector('#Assigned').value;
        
        let id = 1;
        tasks.forEach(task => {
            if (task.id >= id) {
                id = task.id + 1;
            }
        });
        tasks.push({
            id: id,
            description: taskDescription,
            status: taskStatus,
            assign: taskAssigned,
        });
    } else {
        // Editing an existing room
        const taskUpdate = tasks.find(task => task.id === modalTask.id);
        if (taskUpdate) {
            taskUpdate.description = modalTask.description; // Update the room name
            taskUpdate.status = modalTask.status; // Update the room type
            taskUpdate.assign = modalTask.assign; // Update the room location
        }
    }

    setLocalStorage(localStorageKeys.task, tasks); // Save updated inventory to localStorage
    loadTask(); // Reload table
}

// Delete a task
function deleteTask(taskID, tasks) {
    const updatedTask = tasks.filter((task) => task.id !== taskID);
    setLocalStorage(localStorageKeys.task, updatedTask); // Save updated inventory
    loadTask(); // Reload table
}
 
function loadStaff() {
    const staffs = getLocalStorage(localStorageKeys.staff);
    const dropdown = document.querySelector('#Assigned')
    staffs.forEach((staff) => {
        const option = document.createElement('option');
        option.value = staff.name;
        option.textContent = staff.name;
        dropdown.appendChild(option);
    }); 
}

// Event Listener Initialization
document.addEventListener('DOMContentLoaded', () => {
    loadTask();
    loadStaff();
    

    document.querySelector('#btn-add-room').addEventListener('click', addTask);

});



