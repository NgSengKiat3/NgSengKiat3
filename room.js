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

        // Room Name 
        const roomNameCell = newRow.insertCell();
        roomNameCell.textContent = room.name;

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
            onSaveRoom();
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
            onSaveRoom();
        });
        roomStatusCell.appendChild(roomStatusDropdown);
        
    });
}

// Add a new room (reset modal fields)
function onAddRoom() {
    modalRoom = undefined; // Reset modalRoom for a new addition
    document.querySelector('#roomModalLabel').textContent = 'Add Room';
    document.querySelector('#room-name').value = '';
    document.querySelector('#room-type').value = '';
    document.querySelector('#room-status').value = '';
}

// Save room (add or update)
function onSaveRoom() {
    console.log('save');

    const rooms = getLocalStorage(localStorageKeys.room);

    if (!modalRoom) {
        // Adding a new room
        const newRoomName = document.querySelector('#room-name').value;
        const newRoomType = document.querySelector('#room-type').value;
        const newRoomStatus = document.querySelector('#room-status').value;

        let id = 1;
        rooms.forEach(room => {
            if (room.id >= id) {
                id = room.id + 1;
            }
        });

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
            roomToUpdate.name = modalRoom.name; // Update the room name
            roomToUpdate.type = modalRoom.type; // Update the room type
            roomToUpdate.status = modalRoom.status; // Update the room status
        }
    }

    setLocalStorage(localStorageKeys.room, rooms);
    loadRooms();
}

// Initialize and load data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadRooms();
});
