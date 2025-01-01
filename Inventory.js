let modalinventory = undefined;

// Load inventory data into the table
function loadinventory() {
    const Inventory = getLocalStorage(localStorageKeys.Inventory) || []; // Ensure an empty array if no data
    /**
     * @type {HTMLTableSectionElement}
     */
    const tableBody = document.querySelector('#inventory-table tbody');
    tableBody.innerHTML = '';

    Inventory.forEach((inventory) => {
        const newRow = tableBody.insertRow();

        // Inventory ID
        const inventoryIDCell = newRow.insertCell();
        inventoryIDCell.textContent = inventory.id;

        // Inventory Name
        const inventoryNameCell = newRow.insertCell();
        inventoryNameCell.textContent = inventory.name;

        // Inventory Quantity
        const inventoryQuantityCell = newRow.insertCell();
        inventoryQuantityCell.textContent = inventory.quantity;

        // Inventory Location (dropdown)
        const inventoryLocationCell = newRow.insertCell();
        const inventoryLocationDropdown = document.createElement('select');
        inventoryLocationDropdown.className = 'form-select';
        ['Storage Room A', 'Storage Room B', 'Storage Room C'].forEach((location) => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            if (location === inventory.location) option.selected = true;
            inventoryLocationDropdown.appendChild(option);
        });

        inventoryLocationDropdown.addEventListener('change', (event) => {
            inventory.location = event.target.value;
            onSaveinventory(Inventory); // Save after updating location
        });
        inventoryLocationCell.appendChild(inventoryLocationDropdown);

        // Inventory Restock (dropdown)
        const inventoryRestockCell = newRow.insertCell();
        const inventoryRestockDropdown = document.createElement('select');
        inventoryRestockDropdown.className = 'form-select';
        ['John', 'Doe', 'Jack'].forEach((restock) => {
            const option = document.createElement('option');
            option.value = restock;
            option.textContent = restock;
            if (restock === inventory.restock) option.selected = true;
            inventoryRestockDropdown.appendChild(option);
        });

        inventoryRestockDropdown.addEventListener('change', (event) => {
            inventory.restock = event.target.value;
            onSaveinventory(Inventory); // Save after updating restock
        });
        inventoryRestockCell.appendChild(inventoryRestockDropdown);

        // Delete Button
        const deleteInventoryCell = newRow.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.addEventListener('click', () => {
            deleteInventory(inventory.id, Inventory);
        });
        deleteInventoryCell.appendChild(deleteButton);
    });
}

// Add new inventory
function onAddinventory() {
    modalinventory = undefined;

    document.querySelector('#inventoryName').value = '';
    document.querySelector('#inventoryQuantity').value = '';
    document.querySelector('#taskinventoryLocation').value = 'Storage Room A'; // Default value
    document.querySelector('#Assigned').value = 'John'; // Default value
}

// Save inventory
function onSaveinventory(inventoryList = []) {
    const inventoryName = document.querySelector('#inventoryName').value;
    const inventoryQuantity = document.querySelector('#inventoryQuantity').value;
    const inventoryLocation = document.querySelector('#taskinventoryLocation').value;
    const inventoryRestock = document.querySelector('#Assigned').value;

    if (!modalinventory) {
        // Add new inventory
        const newInventory = {
            id: Date.now(), // Unique ID based on timestamp
            name: inventoryName,
            quantity: inventoryQuantity,
            location: inventoryLocation,
            restock: inventoryRestock,
        };
        inventoryList.push(newInventory);
    } else {
        // Update existing inventory
        modalinventory.name = inventoryName;
        modalinventory.quantity = inventoryQuantity;
        modalinventory.location = inventoryLocation;
        modalinventory.restock = inventoryRestock;
    }

    setLocalStorage(localStorageKeys.Inventory, inventoryList); // Save updated inventory to localStorage
    loadinventory(); // Reload table
}

// Delete a task
function deleteInventory(inventoryID, inventoryList) {
    const updatedInventory = inventoryList.filter((inventory) => inventory.id !== inventoryID);
    setLocalStorage(localStorageKeys.Inventory, updatedInventory); // Save updated inventory
    loadinventory(); // Reload table
}

// Event Listener Initialization
document.addEventListener('DOMContentLoaded', () => {
    loadinventory();

    document.querySelector('#btn-add-room').addEventListener('click', onAddinventory);
    document.querySelector('#btn-save-inventory').addEventListener('click', () => {
        const Inventory = getLocalStorage(localStorageKeys.Inventory) || [];
        onSaveinventory(Inventory);
    });
});

