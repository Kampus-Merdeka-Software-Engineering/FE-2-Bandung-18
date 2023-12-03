// CONTACT US
function submitForm() {
    // Mendapatkan nilai input dari formulir
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    // Memeriksa apakah kolom formulir telah diisi
    if (name.trim() === '' || message.trim() === '') {
        // Menampilkan popup 'falsePopup' jika formulir belum diisi
        document.getElementById('falsePopup').style.display = 'flex';
        // Sembunyikan popup 'confirmationPopup' jika formulir belum diisi
        document.getElementById('confirmationPopup').style.display = 'none';
        return false; // Menghentikan pengiriman formulir

    } else {
        // Sembunyikan popup 'falsePopup' jika formulir sudah diisi dengan benar
        document.getElementById('falsePopup').style.display = 'none';
    }

    // Simpan data formulir ke LocalStorage
    localStorage.setItem('formData', JSON.stringify({ name, message }));

    // Lakukan sesuatu dengan data formulir (simpan ke database, dll.)

    // Tampilkan popup terima kasih
    document.getElementById('confirmationPopup').style.display = 'flex';

    // Reset formulir
    resetForm();

    // Cegah tindakan default formulir (mencegah refresh halaman)
    return false;
}

// Fungsi untuk menyimpan data ke dalam localStorage
function saveDataToLocalStorage(name, message) {
    localStorage.setItem('contactFormData', JSON.stringify({ name, message }));
}

// Fungsi untuk mengembalikan data dari localStorage ke formulir
function restoreDataFromLocalStorage() {
    const storedData = JSON.parse(localStorage.getItem('contactFormData')) || {};
    document.getElementById('name').value = storedData.name || '';
    document.getElementById('message').value = storedData.message || '';
}

// Fungsi untuk mereset formulir dan menghapus data dari localStorage
function cancelForm() {
    localStorage.removeItem('contactFormData');
    resetForm();
}

// Fungsi untuk menyimpan data ke localStorage, mereset formulir, dan menampilkan popup
function submitForm() {
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    saveDataToLocalStorage(name, message);

    // Lakukan sesuatu dengan data formulir (simpan ke database, dll.)

    // Tampilkan popup terima kasih
    document.getElementById('confirmationPopup').style.display = 'flex';

    // Reset formulir
    resetForm();
}

// Fungsi untuk mereset formulir
function resetForm() {
    document.getElementById('contactForm').reset();
}

// Fungsi untuk menutup popup terima kasih
function closePopup() {
    document.getElementById('confirmationPopup').style.display = 'none';
}

// Panggil fungsi restoreDataFromLocalStorage saat halaman dimuat
document.addEventListener('DOMContentLoaded', restoreDataFromLocalStorage);

// Simpan data formulir sebelum pindah halaman
window.addEventListener('beforeunload', function () {
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    saveDataToLocalStorage(name, message);
});