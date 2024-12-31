
let modalStaff = undefined;

// Load staff data into the table
function loadStaffs() {
    const staffs = getLocalStorage(localStorageKeys.staff);
    /**
     * @type {HTMLTableSectionElement}
     */
    const tableBody = document.querySelector('#staff-table tbody');
    tableBody.innerHTML = '';

    staffs.forEach(staff => {
        const newRow = tableBody.insertRow();
        const staffNameCell = newRow.insertCell();
        staffNameCell.textContent = staff.name;



        //Edit button
        const actionButtonCell = newRow.insertCell();
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-primary';
        editButton.textContent = 'Edit';
        editButton.setAttribute('data-bs-target', '#staticBackdrop');
        editButton.setAttribute('data-bs-toggle', "modal");
        editButton.addEventListener('click', () => {
            console.log('Edit button clicked for staff', staff);
            onEdit(staff);
        });

        //Delete button
        const id = staff.id
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger m-2';
        deleteButton.addEventListener('click', () => {
            console.log('Delete button clicked for id', id);
            onDelete(id);
        });

        actionButtonCell.appendChild(editButton);
        actionButtonCell.appendChild(deleteButton);
    });
}

function onDelete(id) {
    const staffs = getLocalStorage(localStorageKeys.staff)
    const newStaffs = staffs.filter(staff => staff.id !== id);
    setLocalStorage(localStorageKeys.staff, newStaffs)
    loadStaffs()

}

function onAdd() {
    modalStaff = undefined;
    document.querySelector('#staticBackdropLabel').textContent = 'Add Staff';
    document.querySelector('#name').value = '';
}

function onEdit(staff) {
    modalStaff = staff;
    document.querySelector('#staticBackdropLabel').textContent = 'Edit Staff';
    document.querySelector('#name').value = staff.name;

}

function onSave() {
    console.log('save');

    const newStaffName = document.querySelector('#name').value;
    const staffs = getLocalStorage(localStorageKeys.staff);

    if (!modalStaff) {
        let id = 1;
        staffs.forEach(staff => {
            if (staff.id >= id) {
                id = staff.id + 1;
            }
        });
        staffs.push({
            id: id,
            name: newStaffName
        });
    } else {
        staffs.forEach(staff => {
            if (staff.id === modalStaff.id) {
                staff.name = newStaffName; // Update the name of the staff
            }
        });
    }


    setLocalStorage(localStorageKeys.staff, staffs);
    loadStaffs();

}

// Initialize and load data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadStaffs();
});

let modalStaff = undefined;

// Load staff data into the table
function loadStaffs() {
    const staffs = getLocalStorage(localStorageKeys.staff);
    /**
     * @type {HTMLTableSectionElement}
     */
    const tableBody = document.querySelector('#staff-table tbody');
    tableBody.innerHTML = '';

    staffs.forEach(staff => {
        const newRow = tableBody.insertRow();
        const staffNameCell = newRow.insertCell();
        staffNameCell.textContent = staff.name;



        //Edit button
        const actionButtonCell = newRow.insertCell();
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-primary';
        editButton.textContent = 'Edit';
        editButton.setAttribute('data-bs-target', '#staticBackdrop');
        editButton.setAttribute('data-bs-toggle', "modal");
        editButton.addEventListener('click', () => {
            console.log('Edit button clicked for staff', staff);
            onEdit(staff);
        });

        //Delete button
        const id = staff.id
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger m-2';
        deleteButton.addEventListener('click', () => {
            console.log('Delete button clicked for id', id);
            onDelete(id);
        });

        actionButtonCell.appendChild(editButton);
        actionButtonCell.appendChild(deleteButton);
    });
}

function onDelete(id) {
    const staffs = getLocalStorage(localStorageKeys.staff)
    const newStaffs = staffs.filter(staff => staff.id !== id);
    setLocalStorage(localStorageKeys.staff, newStaffs)
    loadStaffs()

}

function onAdd() {
    modalStaff = undefined;
    document.querySelector('#staticBackdropLabel').textContent = 'Add Staff';
    document.querySelector('#name').value = '';
}

function onEdit(staff) {
    modalStaff = staff;
    document.querySelector('#staticBackdropLabel').textContent = 'Edit Staff';
    document.querySelector('#name').value = staff.name;

}

function onSave() {
    console.log('save');

    const newStaffName = document.querySelector('#name').value;
    const staffs = getLocalStorage(localStorageKeys.staff);

    if (!modalStaff) {
        let id = 1;
        staffs.forEach(staff => {
            if (staff.id >= id) {
                id = staff.id + 1;
            }
        });
        staffs.push({
            id: id,
            name: newStaffName
        });
    } else {
        staffs.forEach(staff => {
            if (staff.id === modalStaff.id) {
                staff.name = newStaffName; // Update the name of the staff
            }
        });
    }


    setLocalStorage(localStorageKeys.staff, staffs);
    loadStaffs();

}

// Initialize and load data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadStaffs();
});

