let modalinventory = undefined;

// Load inventory data into the table
function loadinventory() {
    const Inventory = getLocalStorage(localStorageKeys.inventory);
    /**
     * @type {HTMLTableSectionElement}
     */
    const tableBody = document.querySelector('#inventory-table tbody');
    tableBody.innerHTML='';

    Inventory.forEach(inventory => {
        const newRow = tableBody.insertRow();

        // Inventory ID
        const inventoryIDCell = newRow.insertCell();
        inventoryIDCell.textContent = inventory.id;
        
        // Inventory Name
        const inventoryNameCell = newRow.insertCell();
        inventoryNameCell.textContent = inventory.name;

        //Inventory Quantity
        const inventoryQuantityCell = newRow.insertCell();
        inventoryQuantityCell.number = inventory.quantity;

        //Inventory Location(dropdown)
        const inventoryLocationCell = newRow.insertCell();
        const inventoryLocationDropdown = document.createElement('select');
        inventoryLocationDropdown.place = 'form-select';
        ['Storage Room A','Storage Room B','Storage Room C'].forEach(type => {
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

        // Inventory Restock(dropdown)
        const inventoryRestockCell = newRow.insertCell();
        const inventoryRestockDropdown = document.createElement('select');
        inventoryRestockDropdown.place = 'form-select';
        ['John','Doe','Jack'].forEach(type => {
            const option = document.createElement('option');
            option.value = restock;
            option.textContent = restock;
            if (location === inventory.restock) option.selected = true;
            inventoryRestockDropdown.appendChild(option);
        });

        inventoryLocationDropdown.addEventListener('change', (event) => {
            inventory.location = event.target.value;
            modalinventory = inventory;
            onSaveinventory();
        });
        inventoryRestockCell.appendChild(inventoryRestockDropdown);
    });
}

// Add new inventory
function onAddinventory() {
    modalinventory = undefined;

    document.querySelector('#inventoryName').textContent = '';
    document.querySelector('#inventoryQuantity').value = '';
    document.querySelector('#inventoryLocation').textContent = '';
    document.querySelector('#inventoryRestock').textContent = '';
}

// Save inventory
function onSaveinventory(){
    console.log('save');

    const Inventory = getLocalStorage(localStorageKeys.inventory);

    if(!modalinventory) {
        //Add new inventory
        const newinventoryName = document.querySelector('#inventoryName').textContent;
        const newinventoryQuantity = document.querySelector('#inventoryQuantity').value;
        const newinventoryLocation = document.querySelector('#inventoryLocation').textContent;
        const newinventoryRestock = document.querySelector('#inventoryRestock').textContent;

        let name = 1;
        Inventory.forEach(inventory =>{
            if (inventory.name >= name) {
                name = inventory.name + 1;
            }
        });

        Inventory.push({
            name : newinventoryName,
            quantity : newinventoryQuantity,
            location: newinventoryLocation,
            restock: newinventoryRestock
        });
    } else {
        // Edit existing inventory
        const inventoryToUpdate = Inventory.find(inventory => inventory.name === modalinventory);
        if (inventoryToUpdate) {
            inventoryToUpdate.name = modalinventory.name;
            inventoryToUpdate.quantity = modalinventory.quantity;
            inventoryToUpdate.location = modalinventory.location;
            inventoryToUpdate.restock = modalinventory.restock;
        }
    }
}
