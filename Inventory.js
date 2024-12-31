let modalinventory = undefined;

// Load inventory data into the table
function loadinventory() {
    const inventorys = getLocalStorage(localStorageKeys.inventory);

    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = ''; // Clear the table before loading new data

    inventorys.forEach(inventory => {
        const newRow = tableBody.insertRow();

        // inventory Name (editable input)
        const inventoryNameCell = newRow.insertCell();
        const inventoryNameInput = document.createElement('input');
        inventoryNameInput.type = 'text';
        inventoryNameInput.value = inventory.name;
        inventoryNameInput.className = 'form-control';
        inventoryNameInput.addEventListener('change', (event) => {
            inventory.name = event.target.value;
            modalinventory = inventory;
            onSaveinventory();
        });
        inventoryNameCell.appendChild(inventoryNameInput);

        // inventory Quantity (editable input)
        const inventoryQuantityCell = newRow.insertCell();
        const inventoryQuantityInput = document.createElement('input');
        inventoryQuantityInput.type = 'text';
        inventoryQuantityInput.value = inventory.quantity;
        inventoryQuantityInput.className = 'form-control';
        inventoryQuantityInput.addEventListener('change', (event) => {
            inventory.quantity = event.target.value;
            modalinventory = inventory;
            onSaveinventory();
        });
        inventoryQuantityCell.appendChild(inventoryQuantityInput);

        // inventory Location (dropdown)
        const inventoryLocationCell = newRow.insertCell();
        const inventoryLocationDropdown = document.createElement('select');
        inventoryLocationDropdown.className = 'form-select';
        ['Storage Room A', 'Storage Room B', 'Storage Room C'].forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            if (location === inventory.location) option.selected = true;
            inventoryLocationDropdown.appendChild(option);
        });

        inventoryLocationDropdown.addEventListener('change', (event) => {
            inventory.location = event.target.value;
            modalinventory = inventory;
            onSaveinventory();
        });
        inventoryLocationCell.appendChild(inventoryLocationDropdown);

        // inventory Restock (dropdown)
        const inventoryRestockCell = newRow.insertCell();
        const inventoryRestockDropdown = document.createElement('select');
        inventoryRestockDropdown.className = 'form-select';
        ['John', 'Doe', 'Jack'].forEach(restock => {
            const option = document.createElement('option');
            option.value = restock;
            option.textContent = restock;
            if (restock === inventory.restock) option.selected = true;
            inventoryRestockDropdown.appendChild(option);
        });

        inventoryRestockDropdown.addEventListener('change', (event) => {
            inventory.restock = event.target.value;
            modalinventory = inventory;
            onSaveinventory();
        });
        inventoryRestockCell.appendChild(inventoryRestockDropdown);
    });
}

function onAddinventory() {
    modalinventory = undefined;

    // Reset form fields
    document.querySelector('input[name="inventory-name"]').value = '';
    document.querySelector('input[name="inventory-quantity"]').value = '';
    document.querySelector('select[name="inventory-location"]').value = 'Storage Room A';
    document.querySelector('select[name="inventory-restock"]').value = 'John';
}

// Save inventory (add or update)
function onSaveinventory() {
    const inventorys = getLocalStorage(localStorageKeys.inventory);

    const newinventoryName = document.querySelector('input[name="inventory-name"]').value;
    const newinventoryQuantity = document.querySelector('input[name="inventory-quantity"]').value;
    const newinventoryLocation = document.querySelector('select[name="inventory-location"]').value;
    const newinventoryRestock = document.querySelector('select[name="inventory-restock"]').value;

    if (!modalinventory) {
        // Adding a new inventory
        let id = Math.max(0, ...inventorys.map(inventory => inventory.id)) + 1;
        inventorys.push({
            id: id,
            name: newinventoryName,
            quantity: newinventoryQuantity,
            location: newinventoryLocation,
            restock: newinventoryRestock
        });
    } else {
        // Editing an existing inventory
        const inventoryToUpdate = inventorys.find(inventory => inventory.id === modalinventory.id);
        if (inventoryToUpdate) {
            inventoryToUpdate.name = newinventoryName;
            inventoryToUpdate.quantity = newinventoryQuantity;
            inventoryToUpdate.location = newinventoryLocation;
            inventoryToUpdate.restock = newinventoryRestock;
        }
    }

    setLocalStorage(localStorageKeys.inventory, inventorys);
    loadinventory();
}

// Initialize and load data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadinventory();
});
