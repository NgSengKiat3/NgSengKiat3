let modaltechnician = undefined;

// Load technician data into the table
function loadtechnicians() {
    const technicians = getLocalStorage(localStorageKeys.technician);
    /**
     * @type {HTMLTableSectionElement}
     */
    const tableBody = document.querySelector('#technician-table tbody');
    tableBody.innerHTML = '';

    technicians.forEach(technician => {
        const newRow = tableBody.insertRow();

        // Technician name
        const technicianNameCell = newRow.insertCell();
        technicianNameCell.textContent = technician.name;



        //Edit button
        const actionButtonCell = newRow.insertCell();
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-primary';
        editButton.textContent = 'Edit';
        editButton.setAttribute('data-bs-target', '#staticBackdrop');
        editButton.setAttribute('data-bs-toggle', "modal");
        editButton.addEventListener('click', () => {
            console.log('Edit button clicked for technician', technician);
            onEdit(technician);
        });

        //Delete button
        const id = technician.id
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

//Delete technician
function onDelete(id) {
    const technicians = getLocalStorage(localStorageKeys.technician)
    const newtechnicians = technicians.filter(technician => technician.id !== id);
    setLocalStorage(localStorageKeys.technician, newtechnicians)
    loadtechnicians()

}


//Add technician
function onAdd() {
    modaltechnician = undefined;
    document.querySelector('#staticBackdropLabel').textContent = 'Add technician';
    document.querySelector('#name').value = '';
}

//Edit technician
function onEdit(technician) {
    modaltechnician = technician;
    document.querySelector('#staticBackdropLabel').textContent = 'Edit technician';
    document.querySelector('#name').value = technician.name;

}

//Save technician (add or update)
function onSave() {
    console.log('save');

    const newtechnicianName = document.querySelector('#name').value;
    const technicians = getLocalStorage(localStorageKeys.technician);

    if (!modaltechnician) {
        let id = 1;
        technicians.forEach(technician => {
            if (technician.id >= id) {
                id = technician.id + 1;
            }
        });
        technicians.push({
            id: id,
            name: newtechnicianName
        });
    } else {
        technicians.forEach(technician => {
            if (technician.id === modaltechnician.id) {
                technician.name = newtechnicianName; // Update the name of the technician
            }
        });
    }


    setLocalStorage(localStorageKeys.technician, technicians); //Save updated technician to localstorage
    loadtechnicians(); //Reload table

}

// Initialize and load data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadtechnicians();
});
