// Global variable to store the room being edited
let modalRoom = undefined;

// Load room data into the table
function loadRooms() {
    const rooms = getLocalStorage(localStorageKeys.room);

    /**
     * @type {HTMLTableSectionElement}
     */
    const tableBody = document.querySelector('#room-table tbody');
    tableBody.innerHTML = ''; // Clear the table before loading new data

    rooms.forEach(room => {
        const newRow = tableBody.insertRow();

        // Room Name (editable input)
        const roomNameCell = newRow.insertCell();
        const roomNameInput = document.createElement('input');
        roomNameInput.type = 'text';
        roomNameInput.value = room.name;
        roomNameInput.className = 'form-control';
        roomNameInput.addEventListener('change', (event) => {
            room.name = event.target.value;
            // Update modalRoom when the user changes the name
            modalRoom = room;
        });
        roomNameCell.appendChild(roomNameInput);

        // Room Type (dropdown)
        const roomTypeCell = newRow.insertCell();
        const roomTypeDropdown = document.createElement('select');
        roomTypeDropdown.className = 'form-select';
        ['Single', 'Double', 'Suite'].forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            if (type === room.type) option.selected = true;
            roomTypeDropdown.appendChild(option);
        });

        roomTypeDropdown.addEventListener('change', (event) => {
            room.type = event.target.value;
            modalRoom = room;
        });
        roomTypeCell.appendChild(roomTypeDropdown);

        // Room Status (dropdown)
        const roomStatusCell = newRow.insertCell();
        const roomStatusDropdown = document.createElement('select');
        roomStatusDropdown.className = 'form-select';
        ['Available', 'Occupied', 'Under Maintenance'].forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            if (status === room.status) option.selected = true;
            roomStatusDropdown.appendChild(option);
        });
        roomStatusDropdown.addEventListener('change', (event) => {
            room.status = event.target.value;
            modalRoom = room;
        });
        roomStatusCell.appendChild(roomStatusDropdown);
    });
}

// Add a new room (reset modal fields)
function onAddRoom() {
    modalRoom = { id: Date.now(), name: '', type: 'Single', status: 'Available' }; // Initialize with default values
    document.querySelector('#roomModalLabel').textContent = 'Add Room';
    document.querySelector('#room-name').value = '';
    document.querySelector('#room-type').value = 'Single';
    document.querySelector('#room-status').value = 'Available';
}

// Save room (add or update)
function onSaveRoom() {
    const rooms = getLocalStorage(localStorageKeys.room);
    
    // If modalRoom is not set, that means we are adding a new room
    if (!modalRoom.id) {
        // Adding a new room
        const newRoomName = document.querySelector('#room-name').value;
        const newRoomType = document.querySelector('#room-type').value;
        const newRoomStatus = document.querySelector('#room-status').value;

        let id = rooms.length ? rooms[rooms.length - 1].id + 1 : 1; // Increment ID based on existing rooms
        rooms.push({
            id: id,
            name: newRoomName,
            type: newRoomType,
            status: newRoomStatus
        });
    } else {
        // Editing an existing room
        const roomToUpdate = rooms.find(room => room.id === modalRoom.id);
        if (roomToUpdate) {
            roomToUpdate.name = document.querySelector('#room-name').value; // Update the room name
            roomToUpdate.type = document.querySelector('#room-type').value; // Update the room type
            roomToUpdate.status = document.querySelector('#room-status').value; // Update the room status
        }
    }

    setLocalStorage(localStorageKeys.room, rooms);
    loadRooms(); // Reload rooms after saving
}

// Initialize and load data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadRooms();
});
