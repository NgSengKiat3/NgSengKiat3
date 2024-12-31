
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

let modalitem = undefined;

// Load item data into the table
function loadItem() {
    const items = getLocalStorage(localStorageKeys.item);

    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = ''; // Clear the table before loading new data

    items.forEach(item => {
        const newRow = tableBody.insertRow();

        // item Name (editable input)
        const itemNameCell = newRow.insertCell();
        const itemNameInput = document.createElement('input');
        itemNameInput.type = 'text';
        itemNameInput.value = item.name;
        itemNameInput.className = 'form-control';
        itemNameInput.addEventListener('change', (event) => {
            item.name = event.target.value;
            modalitem = item;
            onSaveitem();
        });
        itemNameCell.appendChild(itemNameInput);

        // item Quantity (editable input)
        const itemQuantityCell = newRow.insertCell();
        const itemQuantityInput = document.createElement('input');
        itemQuantityInput.type = 'text';
        itemQuantityInput.value = item.quantity;
        itemQuantityInput.className = 'form-control';
        itemQuantityInput.addEventListener('change', (event) => {
            item.quantity = event.target.value;
            modalitem = item;
            onSaveitem();
        });
        itemQuantityCell.appendChild(itemQuantityInput);

        // item Location (dropdown)
        const itemLocationCell = newRow.insertCell();
        const itemLocationDropdown = document.createElement('select');
        itemLocationDropdown.className = 'form-select';
        ['Storage Room A', 'Storage Room B', 'Storage Room C'].forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            if (location === item.location) option.selected = true;
            itemLocationDropdown.appendChild(option);
        });

        itemLocationDropdown.addEventListener('change', (event) => {
            item.location = event.target.value;
            modalitem = item;
            onSaveitem();
        });
        itemLocationCell.appendChild(itemLocationDropdown);

        // item Restock (dropdown)
        const itemRestockCell = newRow.insertCell();
        const itemRestockDropdown = document.createElement('select');
        itemRestockDropdown.className = 'form-select';
        ['John', 'Doe', 'Jack'].forEach(restock => {
            const option = document.createElement('option');
            option.value = restock;
            option.textContent = restock;
            if (restock === item.restock) option.selected = true;
            itemRestockDropdown.appendChild(option);
        });

        itemRestockDropdown.addEventListener('change', (event) => {
            item.restock = event.target.value;
            modalitem = item;
            onSaveitem();
        });
        itemRestockCell.appendChild(itemRestockDropdown);
    });
}

function onAdditem() {
    modalitem = undefined;

    // Reset form fields
    document.querySelector('input[name="item-name"]').value = '';
    document.querySelector('input[name="item-quantity"]').value = '';
    document.querySelector('select[name="item-location"]').value = 'Storage Room A';
    document.querySelector('select[name="item-restock"]').value = 'John';
}

// Save item (add or update)
function onSaveitem() {
    const items = getLocalStorage(localStorageKeys.item);

    const newItemName = document.querySelector('input[name="item-name"]').value;
    const newItemQuantity = document.querySelector('input[name="item-quantity"]').value;
    const newItemLocation = document.querySelector('select[name="item-location"]').value;
    const newItemRestock = document.querySelector('select[name="item-restock"]').value;

    if (!modalitem) {
        // Adding a new item
        let id = Math.max(0, ...items.map(item => item.id)) + 1;
        items.push({
            id: id,
            name: newItemName,
            quantity: newItemQuantity,
            location: newItemLocation,
            restock: newItemRestock
        });
    } else {
        // Editing an existing item
        const itemToUpdate = items.find(item => item.id === modalitem.id);
        if (itemToUpdate) {
            itemToUpdate.name = newItemName;
            itemToUpdate.quantity = newItemQuantity;
            itemToUpdate.location = newItemLocation;
            itemToUpdate.restock = newItemRestock;
        }
    }

    setLocalStorage(localStorageKeys.item, items);
    loadItem();
}

// Initialize and load data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadItem();
});

