const localStorageKeys = {
    staff: 'staff',
    room: 'room',
    task: 'task',
    feedback: 'feedback',
    inventory: 'inventory',
    maintanence: 'maintanence',
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
    rooms.push



    const tasks = [];
    initializeIfNotSet(localStorageKeys.task, tasks);

    const inventory = [{ id: 1, inventory: 100 }, { id: 2, inventory: 50 }];
    initializeIfNotSet(localStorageKeys.inventory, inventory);

    const maintanence = [];
    initializeIfNotSet(localStorageKeys.maintanence, maintanence);

    const staff = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }];
    initializeIfNotSet(localStorageKeys.staff, staff);

    const technician = [];
    initializeIfNotSet(localStorageKeys.technician, technician)
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

