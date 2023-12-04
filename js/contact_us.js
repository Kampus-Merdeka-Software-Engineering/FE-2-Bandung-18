// CONTACT US
function submitForm() {
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    if (name.trim() === '' || message.trim() === '') {
        document.getElementById('falsePopup').style.display = 'flex';
        document.getElementById('confirmationPopup').style.display = 'none';
        return false;
    } else {
        document.getElementById('falsePopup').style.display = 'none';
    }

    // Save form data to LocalStorage
    saveDataToLocalStorage(name, message);

    // Do something with the form data (e.g., send to the server, save to a database, etc.)

    document.getElementById('confirmationPopup').style.display = 'flex';

    resetForm();

    return false;
}

function saveDataToLocalStorage(name, message) {
    // Save data with a unique key or use a different key if needed
    localStorage.setItem('contactFormData', JSON.stringify({ name, message }));
}

function restoreDataFromLocalStorage() {
    const storedData = JSON.parse(localStorage.getItem('contactFormData')) || {};
    document.getElementById('name').value = storedData.name || '';
    document.getElementById('message').value = storedData.message || '';
}

function cancelForm() {
    localStorage.removeItem('contactFormData');
    resetForm();
}

function resetForm() {
    document.getElementById('contactForm').reset();
}

function closePopup() {
    document.getElementById('confirmationPopup').style.display = 'none';
    document.getElementById('falsePopup').style.display = 'none';
}
document.addEventListener('DOMContentLoaded', restoreDataFromLocalStorage);

window.addEventListener('beforeunload', function () {
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    saveDataToLocalStorage(name, message);
});
