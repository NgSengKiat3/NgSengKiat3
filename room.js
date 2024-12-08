window.onload = function () {
    const roomList = document.querySelector('#room-list');
    const rooms = getLocalStorage(localStorageKeys.room);
    for (const room of rooms) {
        const liEl = document.createElement('li');
        liEl.appendChild(document.createTextNode(room));
        roomList.appendChild(liEl);
    }
};