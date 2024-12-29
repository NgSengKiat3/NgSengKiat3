const localStorageKey = 'inventory';

// Helper functions for localStorage
function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Initialize Inventory data
function initializeInventoryData() {
    if (!localStorage.getItem(localStorageKey)) {
        const defaultInventory = [
            { ItemID: '101', ItemName: 'Single', Quantity: 1, Location: 'Available' , Restock: 'Sarah Green'},
            { ItemID: '102', ItemName: 'Double', Quantity: 2, Location: 'Occupied' , Restock: 'John Brown'},
        ];
        setLocalStorage(localStorageKey, defaultInventory);
    }
}

// Load Inventory data into the table
function loadInventory() {
    const Inventory = getLocalStorage(localStorageKey);
    const tableBody = document.getElementById('InventoryTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing rows

    Inventory.forEach(Inventory => {
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <td>${Inventory.ItemID}</td>
            <td>${Inventory.ItemName}</td>
            <td>${Inventory.Quantity}</td>
            <td>${Inventory.Location}</td>
        `;
    });
}

// Add a new Inventory
function addInventory() {
    // Get form values
    const ItemID = document.getElementById('ItemID').value;
    const ItemName = document.getElementById('ItemName').value;
    const Quantity = parseInt(document.getElementById('Quantity').value, 10);
    const Location = document.getElementById('Location').value;
    const Restock = document.getElementById('Restock').value;

    // Validate input
    if (!ItemID || !ItemName || isNaN(Quantity) || !Location || !Restock) {
        alert('All fields are required!');
        return;
    }

    // Get existing Inventory from localStorage
    const Inventory = getLocalStorage(localStorageKey);

    // Add the new Inventory to the list
    Inventory.push({ ItemID, ItemName, Quantity, Location, Restock });
    setLocalStorage(localStorageKey, Inventory);

    // Update the table
    loadInventory();

    // Clear the form
    document.getElementById('addInventoryForm').reset();
}

// Initialize and load data on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeInventoryData();
    loadInventory();
});