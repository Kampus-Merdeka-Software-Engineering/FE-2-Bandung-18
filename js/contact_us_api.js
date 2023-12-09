async function submitForm() {
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    if (name.trim() === '' || message.trim() === '') {
        document.getElementById('falsePopup').style.display = 'flex';
        document.getElementById('confirmationPopup').style.display = 'none';
        return false;
    } else {
        document.getElementById('falsePopup').style.display = 'none';
    }

    try {
        const response = await fetch('https://be-2-bandung-18-production.up.railway.app/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, message }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Server Response:', responseData);

        document.getElementById('confirmationPopup').style.display = 'flex';
        resetForm();
    } catch (error) {
        console.error('Error:', error);
    }

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
