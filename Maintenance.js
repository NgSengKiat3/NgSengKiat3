const localStorageKey = 'maintenances';

// Load maintenance tasks
function loadMaintenances() {
    const maintenances = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    const tableBody = document.querySelector('#maintenance-table tbody');
    tableBody.innerHTML = '';

    maintenances.forEach((maintenance) => {
        const row = tableBody.insertRow();

        row.insertCell(0).textContent = maintenance.id;
        const descriptionCell = row.insertCell(1);
        const statusCell = row.insertCell(2);
        const assignedCell = row.insertCell(3);
        const actionCell = row.insertCell(4);

        const descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        descriptionInput.value = maintenance.description;
        descriptionInput.addEventListener('change', () => {
            maintenance.description = descriptionInput.value;
            saveMaintenances(maintenances);
        });
        descriptionCell.appendChild(descriptionInput);

        const statusSelect = document.createElement('select');
        ['Pending', 'In Progress', 'Completed'].forEach((status) => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            if (maintenance.status === status) option.selected = true;
            statusSelect.appendChild(option);
        });
        statusSelect.addEventListener('change', () => {
            maintenance.status = statusSelect.value;
            saveMaintenances(maintenances);
        });
        statusCell.appendChild(statusSelect);

        const assignedSelect = document.createElement('select');
        ['John', 'Doe', 'Jane'].forEach((person) => {
            const option = document.createElement('option');
            option.value = person;
            option.textContent = person;
            if (maintenance.assignedTo === person) option.selected = true;
            assignedSelect.appendChild(option);
        });
        assignedSelect.addEventListener('change', () => {
            maintenance.assignedTo = assignedSelect.value;
            saveMaintenances(maintenances);
        });
        assignedCell.appendChild(assignedSelect);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            const index = maintenances.indexOf(maintenance);
            maintenances.splice(index, 1);
            saveMaintenances(maintenances);
            loadMaintenances();
        });
        actionCell.appendChild(deleteButton);
    });
}

// Add a new maintenance task
function addMaintenance() {
    const modal = {
        id: Date.now(),
        description: '',
        status: 'Pending',
        assignedTo: 'John',
    };
    const maintenances = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    maintenances.push(modal);
    saveMaintenances(maintenances);
    loadMaintenances();
}

// Save maintenance tasks to localStorage
function saveMaintenances(maintenances) {
    localStorage.setItem(localStorageKey, JSON.stringify(maintenances));
}

// Initialize the maintenance table
document.addEventListener('DOMContentLoaded', loadMaintenances);
