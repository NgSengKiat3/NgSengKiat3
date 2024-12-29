const localStorageKey = 'maintanence';

// Helper functions for localStorage
function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Initialize Maintanence data
function initializeMaintanenceData() {
    if (!localStorage.getItem(localStorageKey)) {
        const defaultMaintanences = [
            { MaintanenceId: '001', MaintanenceDescription: 'Single',
                 MaintanenceStatus: WIP, MaintanenceAssign: 'Mike Tyson',
                MaintanencePriority: 'High' },
            { MaintanenceId: '002', MaintanenceDescription: 'Double',
                 MaintanenceStatus: Pending, MaintanenceAssign: 'Sarah Green',
                MaintanencePriority: 'Low' },
        ];
        setLocalStorage(localStorageKey, defaultMaintanences);
    }
}

// Load Maintanence data into the table
function loadMaintanences() {
    const Maintanence = getLocalStorage(localStorageKey);
    const tableBody = document.getElementById('MaintanenceTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing rows

    Maintanence.forEach(Maintanence => {
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <td>${Maintanence.MaintanenceId}</td>
            <td>${Maintanence.MaintanenceDescription}</td>
            <td>${Maintanence.MaintanenceStatus}</td>
            <td>${Maintanence.MaintanenceAssign}</td>
            <td>${Maintanence.MaintanencePriority}</td>
        `;
    });
}

// Add a new Maintanence
function addMaintanence() {
    // Get form values
    const MaintanenceId = document.getElementById('MaintanenceId').value;
    const MaintanenceDescription = document.getElementById('MaintanenceDescription').value;
    const MaintanenceStatus = parseInt(document.getElementById('MaintanenceStatus').value, 10);
    const MaintanenceAssign = document.getElementById('MaintanenceAssign').value;

    // Validate input
    if (!MaintanenceId || !MaintanenceDescription || isNaN(MaintanenceStatus) || !MaintanenceAssign || !MaintanencePriority) {
        alert('All fields are required!');
        return;
    }

    // Get existing Maintanence from localStorage
    const Maintanence = getLocalStorage(localStorageKey);

    // Add the new Maintanence to the list
    Maintanence.push({ MaintanenceId, MaintanenceDescription, MaintanenceStatus, MaintanenceAssign, MaintanencePriority });
    setLocalStorage(localStorageKey, Maintanence);

    // Update the table
    loadMaintanences();

    // Clear the form
    document.getElementById('addMaintanenceForm').reset();
}

// Initialize and load data on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeMaintanenceData();
    loadMaintanences();
});