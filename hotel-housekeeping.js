const localStorageKeys = {
    staff: 'staff',
    room: 'room',
    task: 'task',
    feedback: 'feedback',
    inventory: 'inventory',
    maintenance: 'maintenance',
    technician: 'technician'
}

function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, value) {
    const strValue = JSON.stringify(value);
    return localStorage.setItem(key, strValue);
}

function initializeValues() {
    const rooms = [];
    initializeIfNotSet(localStorageKeys.room, rooms);

    const tasks = [];
    initializeIfNotSet(localStorageKeys.task, tasks);

    const Inventory = [];
    initializeIfNotSet(localStorageKeys.inventory, Inventory);

    const maintenance = [];
    initializeIfNotSet(localStorageKeys.maintenance, maintenance);

    const staff = [{id: 1, name: 'Jack'}, {id: 2, name: 'John'}, {id: 3, name: 'Doe'}];
    initializeIfNotSet(localStorageKeys.staff, staff);

    const technician = [{id: 1, name: 'Ali'}, {id: 2, name: 'Abu'}, {id: 3, name: 'Aba'}];
    initializeIfNotSet(localStorageKeys.technician, technician)

    const Feedback = [];
    initializeIfNotSet(localStorageKeys.feedback, Feedback); 
}


initializeValues();

function initializeIfNotSet(key, value) {
    if (!getLocalStorage(key)) {
        try {
            setLocalStorage(key, value);
        } catch (error) {
            if (error.name === "QuotaExceedError") {
                console.error("Storage limit exceeded. Data was not saved.");
            } else {
                console.error("An unexpected error occurred:", error);
            }
        }
    }
}

