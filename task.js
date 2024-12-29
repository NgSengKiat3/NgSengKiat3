let modalTask = undefined; // Tracks the task being edited

// Load tasks data into the table
function loadTasks() {
    const tasks = getLocalStorage(localStorageKeys.task);

    /**
     * @type {HTMLTableSectionElement}
     */
    const tableBody = document.querySelector('#task-table tbody');
    tableBody.innerHTML = ''; // Clear the table before loading new data

    tasks.forEach(task => {
        const newRow = tableBody.insertRow();

        // Task ID
        const taskIdCell = newRow.insertCell();
        taskIdCell.textContent = task.id;

        // Task Description (editable input)
        const descriptionCell = newRow.insertCell();
        const descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        descriptionInput.value = task.description || ''; // Ensure no undefined values
        descriptionInput.className = 'form-control';
        descriptionInput.addEventListener('change', (event) => {
            task.description = event.target.value;
            saveTasks(tasks); // Save changes instantly
        });
        descriptionCell.appendChild(descriptionInput);

        // Task Status (dropdown)
        const statusCell = newRow.insertCell();
        const statusDropdown = document.createElement('select');
        statusDropdown.className = 'form-select';
        ['Pending', 'In Progress', 'Completed'].forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            if (status === task.status) option.selected = true;
            statusDropdown.appendChild(option);
        });
        statusDropdown.addEventListener('change', (event) => {
            task.status = event.target.value;
            saveTasks(tasks); // Save changes instantly
        });
        statusCell.appendChild(statusDropdown);

        // Task Assigned To (dropdown)
        const assignedToCell = newRow.insertCell();
        const assignedDropdown = document.createElement('select');
        assignedDropdown.className = 'form-select';
        ['John', 'Doe', 'Jack'].forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            if (name === task.assignedTo) option.selected = true;
            assignedDropdown.appendChild(option);
        });
        assignedDropdown.addEventListener('change', (event) => {
            task.assignedTo = event.target.value;
            saveTasks(tasks); // Save changes instantly
        });
        assignedToCell.appendChild(assignedDropdown);

        // Delete Button
        const deleteCell = newRow.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.addEventListener('click', () => {
            deleteTask(task.id, tasks);
        });
        deleteCell.appendChild(deleteButton);
    });
}

// Save tasks to localStorage
function saveTasks(tasks) {
    setLocalStorage(localStorageKeys.task, tasks);
    loadTasks(); // Reload to ensure consistency
}

// Add new task
function addTask() {
    const tasks = getLocalStorage(localStorageKeys.task);

    let id = 1;
    if (tasks.length > 0) {
        id = Math.max(...tasks.map(task => task.id)) + 1; // Auto-increment ID
    }

    tasks.push({
        id: id,
        description: '', // Default description
        status: 'Pending', // Default status
        assignedTo: 'John', // Default assignedTo
    });

    saveTasks(tasks);
}

// Delete a task by ID
function deleteTask(taskId, tasks) {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(updatedTasks);
}

// Initialize and load data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    // Add Task button event
    document.querySelector('#add-task-button').addEventListener('click', addTask);
});
