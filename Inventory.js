let modalinventory = undefined;

// Load inventory data into the table
function loadinventory() {
    const Inventory = getLocalStorage(localStorageKeys.inventory) || []; // Ensure an empty array if no data
    /**
     * @type {HTMLTableSectionElement}
     */
    const tableBody = document.querySelector('#inventory-table tbody');
    tableBody.innerHTML = '';

    Inventory.forEach((inventory) => {
        const newRow = tableBody.insertRow();


        // Inventory name(edible)
        const inventoryNameCell = newRow.insertCell();
        const inventoryNameInput = document.createElement('input');
        inventoryNameInput.type = 'text';
        inventoryNameInput.value = inventory.name || '';
        inventoryNameInput.addEventListener('change', (event) => {
            inventory.name = event.target.value;
            modalinventory = inventory;
            onSaveinventory();
        });
        inventoryNameCell.appendChild(inventoryNameInput);

        // Inventory Quantity
        const inventoryQuantityCell = newRow.insertCell();
        const inventoryQuantityInput = document.createElement('input');
        inventoryQuantityInput.type = 'number';
        inventoryQuantityInput.min = 0;
        inventoryQuantityInput.value = inventory.quantity || '';
        inventoryQuantityInput.addEventListener('change', (event) => {
            inventory.quantity = event.target.value;
            modalinventory = inventory;
            onSaveinventory();
        });
        inventoryQuantityCell.appendChild(inventoryQuantityInput);

        // Inventory Location (dropdown)
        const inventoryLocationCell = newRow.insertCell();
        const inventoryLocationDropdown = document.createElement('select');
        inventoryLocationDropdown.className = 'form-select';
        ['Storage inventory A', 'Storage inventory B', 'Storage inventory C'].forEach((location) => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            if (location === inventory.location) option.selected = true;
            inventoryLocationDropdown.appendChild(option);
        });

        inventoryLocationDropdown.addEventListener('change', (event) => {
            inventory.location = event.target.value;
            modalinventory = inventory;
            onSaveinventory(); // Save after updating location
        });
        inventoryLocationCell.appendChild(inventoryLocationDropdown);

        // Inventory Restock (dropdown)
        const inventoryRestockCell = newRow.insertCell();
        const inventoryRestockDropdown = document.createElement('select');
        inventoryRestockDropdown.className = 'form-select';
        getLocalStorage(localStorageKeys.staff)
            .map(staff => staff.name)
            .forEach((restock) => {
                const option = document.createElement('option');
                option.value = restock;
                option.textContent = restock;
                if (restock === inventory.restock) option.selected = true;
                inventoryRestockDropdown.appendChild(option);
            });
        inventoryRestockDropdown.addEventListener('change', (event) => {
            inventory.restock = event.target.value;
            modalinventory = inventory;
            onSaveinventory(); // Save after updating restock
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
    document.querySelector('#inventoryLocation').value = '';
    document.querySelector('#inventoryRestock').value = '';


    // The inventory ID will be automatically assigned once the inventory is saved
    const Inventory = getLocalStorage(localStorageKeys.inventory);
    let id = 1;
    if (Inventory.length > 0) {
        id = Math.max(...Inventory.map(inventory => inventory.id)) + 1; // Auto-increment ID
    }
}

// Save inventory
function onSaveinventory() {

    const Inventory = getLocalStorage(localStorageKeys.inventory);



    if (!modalinventory) {
        // Add new inventory
        const inventoryName = document.querySelector('#inventoryName').value;
        const inventoryQuantity = document.querySelector('#inventoryQuantity').value;
        const inventoryLocation = document.querySelector('#inventoryLocation').value;
        const inventoryRestock = document.querySelector('#inventoryRestock').value

        let id = 1;
        Inventory.forEach(inventory => {
            if (inventory.id >= id) {
                id = inventory.id + 1;
            }
        });
        Inventory.push({
            id: id,
            name: inventoryName,
            quantity: inventoryQuantity,
            location: inventoryLocation,
            restock: inventoryRestock
        });
    } else {
        // Editing an existing inventory
        const inventoryUpdate = Inventory.find(inventory => inventory.id === modalinventory.id);
        if (inventoryUpdate) {
            inventoryUpdate.name = modalinventory.name; // Update the inventory name
            inventoryUpdate.quantity = modalinventory.quantity; // Update the inventory type
            inventoryUpdate.location = modalinventory.location; // Update the inventory location
            inventoryUpdate.restock = modalinventory.restock; // Update the inventory restock
        }
    }

    setLocalStorage(localStorageKeys.inventory, Inventory); // Save updated inventory to localStorage
    loadinventory(); // Reload table
}

// Delete inventory
function deleteInventory(inventoryID, Inventory) {
    const updatedInventory = Inventory.filter((inventory) => inventory.id !== inventoryID);
    setLocalStorage(localStorageKeys.inventory, updatedInventory); // Save updated inventory
    loadinventory(); // Reload table
}

function loadStaff() {
    const staffs = getLocalStorage(localStorageKeys.staff);
    const dropdown = document.querySelector('#inventoryRestock')
    staffs.forEach((staff) => {
        const option = document.createElement('option');
        option.value = staff.name;
        option.textContent = staff.name;
        dropdown.appendChild(option);
    });
}

// Event Listener Initialization
document.addEventListener('DOMContentLoaded', () => {
    loadinventory();
    loadStaff();


    document.querySelector('#btn-add-inventory').addEventListener('click', onAddinventory);

});

