// Mendapatkan elemen div ratingIcons
const ratingIconsContainer = document.getElementById('ratingIcons');

// Jumlah bintang yang ingin ditampilkan
const numberOfStars = 5;

// Loop untuk membuat dan menambahkan ikon bintang
for (let i = 1; i <= numberOfStars; i++) {
    const starIcon = document.createElement('i');
    starIcon.classList.add('far', 'fa-star');
    starIcon.dataset.index = i;

    // Menambahkan event listener untuk menanggapi klik pada bintang
    starIcon.addEventListener('click', handleStarClick);

    // Menambahkan ikon bintang ke dalam container
    ratingIconsContainer.appendChild(starIcon);
}

// Fungsi yang akan dipanggil ketika bintang diklik
function handleStarClick(event) {
    const clickedIndex = event.target.dataset.index;

    // Lakukan sesuatu dengan nilai rating yang dipilih (misalnya, simpan nilai di variabel atau lakukan tindakan lainnya)
    console.log('Rating selected:', clickedIndex);

    // Untuk memberikan tampilan visual feedback, Anda dapat mengubah warna ikon bintang yang telah diklik
    for (let i = 1; i <= numberOfStars; i++) {
        const starIcon = ratingIconsContainer.querySelector(`[data-index="${i}"]`);
        if (i <= clickedIndex) {
            starIcon.classList.remove('far');
            starIcon.classList.add('fas', 'rated');
        } else {
            starIcon.classList.remove('fas', 'rated');
            starIcon.classList.add('far');
        }
    }
}


// Your existing JavaScript code here
let selectedRating = 0;

document.querySelectorAll('.rating-icons i').forEach((star) => {
    star.addEventListener('click', () => {
        selectedRating = star.dataset.index;
        updateRatingIcons();
    });
});

function updateRatingIcons() {
    document.querySelectorAll('.rating-icons i').forEach((star) => {
        const index = parseInt(star.dataset.index);
        star.classList.toggle('fa-star', index <= selectedRating);
        star.classList.toggle('fa-star-o', index > selectedRating);
    });
}

function submitFeedback() {
    const name = document.getElementById('name').value;
    const product = document.getElementById('product').value;
    const feedbackText = document.getElementById('feedback').value;

    const feedbackList = document.getElementById('feedbackList');

    // Create a new feedback element
    const newFeedback = document.createElement('div');
    newFeedback.classList.add('feedback-item');
    newFeedback.innerHTML = `<strong>${name}</strong> rated ${selectedRating} stars for ${product}.<br>${feedbackText}`;

    // Append the new feedback to the feedback list
    feedbackList.appendChild(newFeedback);

    // Show confirmation popup
    document.getElementById('confirmationPopup').style.display = 'flex';

    // Clear the form
    document.getElementById('feedbackForm').reset();
    selectedRating = 0;
    updateRatingIcons();
}

function closePopup() {
    // Hide confirmation popup
    document.getElementById('confirmationPopup').style.display = 'none';
}

// Function to load feedback from localStorage and display on the page
function loadFeedback() {
    const feedbackList = document.getElementById('feedbackList');

    // Retrieve feedback from localStorage
    const savedFeedback = JSON.parse(localStorage.getItem('feedback')) || [];

    // Display feedback on the page
    savedFeedback.forEach((feedback) => {
        const feedbackItem = document.createElement('div');
        feedbackItem.classList.add('feedback-item');
        feedbackItem.innerHTML = `<strong>${feedback.name}</strong> rated ${feedback.rating} stars for ${feedback.product}.<br>${feedback.feedback}`;
        feedbackList.appendChild(feedbackItem);
    });
}

// Call the loadFeedback function when the page loads
document.addEventListener('DOMContentLoaded', loadFeedback);
