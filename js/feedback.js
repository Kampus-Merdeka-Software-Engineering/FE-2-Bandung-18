class Footer extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      <section class="feedbacksection">
    <h1>CUSTOMER'S FEEDBACK</h1>
    <h2>Love our desserts? Help us make them even better!</h2>
    <form action="" id="feedback-form">
        <div class="rating">
            <input type="number" name="rating" hidden>
            <i class='bx bx-star star' style="--i: 0;"></i>
            <i class='bx bx-star star' style="--i: 1;"></i>
            <i class='bx bx-star star' style="--i: 2;"></i>
            <i class='bx bx-star star' style="--i: 3;"></i>
            <i class='bx bx-star star' style="--i: 4;"></i>
        </div>
        <input type="text" name="text" placeholder="Your Name" id="feedback-box">
        <input type="text" name="text" placeholder="Your Feedback" id="feedback-box">
        <button type="submit" onclick="sendText()" class="submit-btn">Submit</button>
    </form>
    </section>
        `;
    }
}

const allStar = document.querySelectorAll('.rating .star')
const ratingValue = document.querySelector('.rating input')

allStar.forEach((item, idx)=> {
	item.addEventListener('click', function () {
		let click = 0
		ratingValue.value = idx + 1

		allStar.forEach(i=> {
			i.classList.replace('bxs-star', 'bx-star')
			i.classList.remove('active')
		})
		for(let i=0; i<allStar.length; i++) {
			if(i <= idx) {
				allStar[i].classList.replace('bx-star', 'bxs-star')
				allStar[i].classList.add('active')
			} else {
				allStar[i].style.setProperty('--i', click)
				click++
			}
		}
	})
})

function sendText() {
  alert("Thank you for your feedback!");
  }
  
