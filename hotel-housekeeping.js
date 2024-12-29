const localStorageKeys = {
    staff: 'staff',
    room: 'room',
    task: 'task',
    feedback: 'feedback',
    inventory: 'inventory',
    maintanence: 'maintanence'
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
    for (let i = 0; i < 20; i++) {
        rooms.push(`Room ${i}`)
    }
    initializeIfNotSet(localStorageKeys.room, rooms);

    const tasks = [];
    initializeIfNotSet(localStorageKeys.task, tasks);

    const inventory = {
        towel: 100,
        toothbrush: 200,
    };
    initializeIfNotSet(localStorageKeys.inventory, inventory);

    const maintanence = [];
    initializeIfNotSet(localStorageKeys.maintanence, maintanence);

    const feedback = [];
    initializeIfNotSet(localStorageKeys.feedback, feedback);

    const staff = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }];
    initializeIfNotSet(localStorageKeys.staff, staff);
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
