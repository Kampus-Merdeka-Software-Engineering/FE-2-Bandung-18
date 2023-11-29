let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}
    
window.onscroll = () =>{
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
}


// CONTACT US
function submitForm() {
  // Mendapatkan nilai input dari formulir
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  // Memeriksa apakah kolom formulir telah diisi
  if (name.trim() === '' || message.trim() === '') {
      // Menampilkan notifikasi jika formulir belum diisi
      alert('Harap isi semua kolom formulir terlebih dahulu.');
  } else {
      // Lakukan sesuatu dengan data formulir (simpan, kirim, dll.)

      // Tampilkan popup terima kasih
      document.getElementById('confirmationPopup').style.display = 'flex';

      // Reset formulir
      resetForm();
  }
}

function resetForm() {
  // Reset nilai formulir
  document.getElementById('contactForm').reset();
}

function cancelForm() {
  // Reset dan tutup formulir
  resetForm();
}

function closePopup() {
  // Tutup popup terima kasih
  document.getElementById('confirmationPopup').style.display = 'none';
}


