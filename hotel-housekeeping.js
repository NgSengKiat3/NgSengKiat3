const localStorageKeys = {
    staff: 'staff',
    room: 'room',
    task: 'task',
    feedback: 'feedback',
    inventory: 'inventory'
}

function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, value) {
    const strValue = JSON.stringify(value);
    return localStorage.setItem(key, strValue);
}

function initializeValues() {
    if (!getLocalStorage(localStorageKeys.room)) {
        const rooms = [];
        for (let i = 0; i < 20; i++) {
            rooms.push(`Room ${i}`)
        }
        setLocalStorage(localStorageKeys.room, rooms);
    }

    if (!getLocalStorage(localStorageKeys.task)) {
        const tasks = [];
        setLocalStorage(localStorageKeys.task, tasks);
    }

    if (!getLocalStorage(localStorageKeys.inventory)) {
        const inventory = {
            towel: 100,
            toothbrsh: 200,
        };
        setLocalStorage(localStorageKeys.inventory, inventory);
    }
}


initializeValues();