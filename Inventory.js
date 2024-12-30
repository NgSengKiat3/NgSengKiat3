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
