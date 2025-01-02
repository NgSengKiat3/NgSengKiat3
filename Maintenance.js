let modalmaintenance = undefined;

// Load room data into the table
function loadmaintenance() {
    const maintanences = getLocalStorage(localStorageKeys.maintenance);

    /**
     * @type {HTMLTableSectionElement}
     */
    const tableBody = document.querySelector('#maintenance-table tbody');
    tableBody.innerHTML = ''; // Clear the table before loading new data

    maintanences.forEach(maintenance => {
        const newRow = tableBody.insertRow();

        // Room Description
        const maintenanceDescription = newRow.insertCell();
        maintenanceDescription.textContent = maintenance.description;

        // Room Status(dropdown)
        const maintenaceStatusCell = newRow.insertCell();
        const maintenanceStatusDropdown = document.createElement('select');
        maintenanceStatusDropdown.classdescription = 'form-select';
        ['Pending', 'In Progress', 'Completed'].forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            if (status === maintenance.status) option.selected = true;
            maintenanceStatusDropdown.appendChild(option);
        });

        maintenanceStatusDropdown.addEventListener('change', (event) => {
            maintenance.status = event.target.value;
            modalmaintenance = maintenance;
            saveMaintenance();
        });
        maintenaceStatusCell.appendChild(maintenanceStatusDropdown);

        // Room Assigned (dropdown)
        const maintenanceAssignedCell = newRow.insertCell();
        const maintenanceAssignedDropdown = document.createElement('select');
        maintenanceAssignedDropdown.className = 'form-select';
        getLocalStorage(localStorageKeys.technician)
            .map(technician => technician.name)
            .forEach((assigned) => {
                const option = document.createElement('option');
                option.value = assigned;
                option.textContent = assigned;
                if (assigned === maintenance.assigned) option.selected = true;
                maintenanceAssignedDropdown.appendChild(option);
            });

        maintenanceAssignedDropdown.addEventListener('change', (event) => {
            maintenance.assigned = event.target.value;
            modalmaintenance = maintenance;
            saveMaintenance();
        });
        maintenanceAssignedCell.appendChild(maintenanceAssignedDropdown);

        // Delete Button
        const deleteMaintenanceCell = newRow.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.addEventListener('click', () => {
            deleteMaintenance(maintenance.id, maintanences);
        });
        deleteMaintenanceCell.appendChild(deleteButton);
    });
}

// Add a new room (reset modal fields)
function addMaintenance() {
    modalmaintenance = undefined; // Reset modalRoom for a new addition
    document.querySelector('#maintenanceModalLabel').textContent = 'Add Maintenance';
    document.querySelector('#maintenanceDescription').value = '';
    document.querySelector('#maintenanceStatus').value = '';
    document.querySelector('#assignedTo').value = '';

    // The inventory ID will be automatically assigned once the inventory is saved
    const maintenances = getLocalStorage(localStorageKeys.maintenance);
    let id = 1;
    if (maintenances.length > 0) {
        id = Math.max(...maintenances.map(maintenance => maintenance.id)) + 1; // Auto-increment ID
    }
}

// Save room (add or update)
function saveMaintenance() {
    console.log('save');

    const maintenances = getLocalStorage(localStorageKeys.maintenance);

    if (!modalmaintenance) {
        // Adding a new room
        const newMaintenanceDescription = document.querySelector('#maintenanceDescription').value;
        const newMaintenanceStatus = document.querySelector('#maintenanceStatus').value;
        const newAssignedTo = document.querySelector('#assignedTo').value;

        let id = 1;
        maintenances.forEach(maintenance => {
            if (maintenance.id >= id) {
                id = maintenance.id + 1;
            }
        });

        maintenances.push({
            id: id,
            description: newMaintenanceDescription,
            status: newMaintenanceStatus,
            assigned: newAssignedTo
        });
    } else {
        // Editing an existing room
        const maintenanceToUpdate = maintenances.find(maintenance => maintenance.id === modalmaintenance.id);
        if (maintenanceToUpdate) {
            maintenanceToUpdate.description = modalmaintenance.description; // Update the room description
            maintenanceToUpdate.status = modalmaintenance.status; // Update the room status
            maintenanceToUpdate.assigned = modalmaintenance.assigned; // Update the room type
        }
    }

    setLocalStorage(localStorageKeys.maintenance, maintenances);
    loadmaintenance();
}

// Delete a task
function deleteMaintenance(maintenanceID, maintenances) {
    const updatedMaintenances = maintenances.filter((maintenance) => maintenance.id !== maintenanceID);
    setLocalStorage(localStorageKeys.maintenance, updatedMaintenances); // Save updated inventory
    loadmaintenance(); // Reload table
}

function loadTechnician() {
    const technicians = getLocalStorage(localStorageKeys.technician);
    const dropdown = document.querySelector('#assignedTo')
    technicians.forEach((technician) => {
        const option = document.createElement('option');
        option.value = technician.name;
        option.textContent = technician.name;
        dropdown.appendChild(option);
    });
}

// Initialize and load data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadmaintenance();
    loadTechnician();


});
