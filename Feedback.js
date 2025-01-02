let modalfeedback = undefined;

function loadFeedback() {
    const Feedback = getLocalStorage(localStorageKeys.feedback);
    /**
     *  @type {HTMLTableSectionElement}
     */
    const tableBody = document.querySelector('#feedback-table tbody');
    tableBody.innerHTML = '';

    Feedback.forEach((feedback) => {
        const newRow = tableBody.insertRow();

        const feedbackONECell = newRow.insertCell();
        const feedbackONEDropdown = document.createElement('select');
        feedbackONEDropdown.className = 'form-select';
        ['1','2','3','4','5'].forEach((One) => {
            const option = document.createElement('option');
            option.value = One;
            option.textContent = One;
            if (One === feedback.One) option.selected = true;
            feedbackONEDropdown.appendChild(option);
        });

        feedbackONEDropdown.addEventListener('change', (event) => {
            feedback.One = event.target.value;
            modalfeedback = feedback;
            onSaveFeedback();
        });
        feedbackONECell.appendChild(feedbackONEDropdown);

        const feedbackTWOCell = newRow.insertCell();
        const feedbackTWODropdown = document.createElement('select');
        feedbackTWODropdown.className = 'form-select';
        ['1','2','3','4','5'].forEach((Two) => {
            const option = document.createElement('option');
            option.value = Two;
            option.textContent = Two;
            if (Two === feedback.Two) option.selected = true;
            feedbackTWODropdown.appendChild(option);
        });

        feedbackTWODropdown.addEventListener('change', (event) => {
            feedback.One = event.target.value;
            modalfeedback = feedback;
            onSaveFeedback();
        });
        feedbackTWOCell.appendChild(feedbackTWODropdown);

        const feedbackTHREECell = newRow.insertCell();
        const feedbackTHREEDropdown = document.createElement('select');
        feedbackTHREEDropdown.className = 'form-select';
        ['Yes','No'].forEach((Three) => {
            const option = document.createElement('option');
            option.value = Three;
            option.textContent = Three;
            if (Three === feedback.Three) option.selected = true;
            feedbackTHREEDropdown.appendChild(option);
        });

        feedbackTHREEDropdown.addEventListener('change', (event) => {
            feedback.One = event.target.value;
            modalfeedback = feedback;
            onSaveFeedback();
        });
        feedbackTHREECell.appendChild(feedbackTHREEDropdown);

        const feedbackFOURCell = newRow.insertCell();
        feedbackFOURCell.textContent = feedback.q4;

        const deleteFeedbackCell = newRow.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.addEventListener('click', () => {
            deleteFeedback(feedback.id, Feedback);
        });
        deleteFeedbackCell.appendChild(deleteButton);
    });
}

function onAddFeedback() {
    modalfeedback = undefined;
    document.querySelector('#feedbackONE').value = '';
    document.querySelector('#feedbackTWO').value = '';
    document.querySelector('#feedbackTHREE').value = '';
    document.querySelector('#feedbackFOUR').value = '';


    // The inventory ID will be automatically assigned once the inventory is saved
    const Feedback = getLocalStorage(localStorageKeys.feedback);
    let id = 1;
    if (Feedback.length > 0) {
        id = Math.max(...Feedback.map(feedback => feedback.id)) + 1; // Auto-increment ID
    }
}

function onSaveFeedback() {
    const Feedback = getLocalStorage(localStorageKeys.feedback);

    if (!modalfeedback) {
        // Add new inventory
        const feedbackQ1 = document.querySelector('#feedbackONE').value;
        const feedbackQ2 = document.querySelector('#feedbackTWO').value;
        const feedbackQ3 = document.querySelector('#feedbackTHREE').value;
        const feedbackQ4 = document.querySelector('#feedbackFOUR').value

        let id = 1;
        Feedback.forEach(feedback => {
            if (feedback.id >= id) {
                id = feedback.id + 1;
            }
        });
        Feedback.push({
            id: id,
            q1: feedbackQ1,
            q2: feedbackQ2,
            q3: feedbackQ3,
            q4: feedbackQ4
        });
    } else {
        // Editing an existing room
        const feedbackUpdate = Feedback.find(feedback => feedback.id === modalfeedback.id);
        if (feedbackUpdate) {
            feedbackUpdate.q1 = modalfeedback.q1; // Update the room q1
            feedbackUpdate.q2 = modalfeedback.q2; // Update the room type
            feedbackUpdate.q3 = modalfeedback.q3; // Update the room location
            feedbackUpdate.q4 = modalfeedback.q4; // Update the inventory restock
        }
    }

    setLocalStorage(localStorageKeys.feedback, Feedback); // Save updated inventory to localStorage
    loadFeedback(); // Reload table
}

// Delete a task
function deleteFeedback(feedbackID, Feedback) {
    const updatedFeedback = Feedback.filter((feedback) => feedback.id !== feedbackID);
    setLocalStorage(localStorageKeys.feedback, updatedFeedback); // Save updated inventory
    loadFeedback(); // Reload table
}

document.addEventListener('DOMContentLoaded', () => {
    loadFeedback()
});