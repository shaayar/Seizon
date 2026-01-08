let slideIndex = 1;

// Start the carousel immediately on load
window.onload = function () {
  showSlides(slideIndex);
  startAutoSlide();
}

let autoSlideInterval;

function startAutoSlide() {
  // Auto-advance the carousel every 5000 milliseconds (5 seconds)
  autoSlideInterval = setInterval(() => {
    plusSlides(1);
  }, 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

function plusSlides(n) {
  resetAutoSlide();
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  resetAutoSlide();
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("carousel-slide");
  let dots = document.getElementsByClassName("dot");

  if (slides.length === 0) return;

  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  // 1. Reset all slides and animations
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].classList.remove("fade");

    // Remove animation classes from the previous active slide content
    const textContent = slides[i].querySelector('.text-content');
    const knowMoreBtn = slides[i].querySelector('.know-more-btn');

    if (textContent) textContent.classList.remove('animate-in');
    if (knowMoreBtn) knowMoreBtn.classList.remove('animate-in');
  }

  // 2. Deactivate all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // 3. Display the current slide and add the fade animation
  slides[slideIndex - 1].style.display = "block";
  slides[slideIndex - 1].classList.add("fade");

  // 4. Trigger the text and button entrance animation
  // Wait briefly for the slide transition to start before animating content
  setTimeout(() => {
    const currentText = slides[slideIndex - 1].querySelector('.text-content');
    const currentButton = slides[slideIndex - 1].querySelector('.know-more-btn');

    if (currentText) currentText.classList.add('animate-in');
    if (currentButton) currentButton.classList.add('animate-in');
  }, 100);

  // 5. Activate the current dot
  dots[slideIndex - 1].className += " active";
}

// Product Carousel
let currentIndex = 0;
const carousel = document.getElementById('product-carousel');
const cards = carousel ? carousel.getElementsByClassName('product-card') : [];
const totalCards = cards.length;

// This function moves the carousel left or right
function moveCarousel(direction) {
  // Determine the number of cards to move based on screen size
  let cardsPerView;
  if (window.innerWidth <= 600) {
    cardsPerView = 1; // 1 card on mobile
  } else if (window.innerWidth <= 900) {
    cardsPerView = 2; // 2 cards on tablet
  } else {
    cardsPerView = 3; // 3 cards on desktop
  }

  // Update the index
  currentIndex += direction;

  // Boundary conditions
  if (currentIndex < 0) {
    // Go to the last logical "slide"
    currentIndex = Math.max(0, totalCards - cardsPerView);
  } else if (currentIndex > totalCards - cardsPerView) {
    // Loop back to the start
    currentIndex = 0;
  }

  // Calculate the translation distance. Each card is 100% / cardsPerView
  const cardWidthPercentage = 100 / cardsPerView;
  const translationDistance = currentIndex * cardWidthPercentage;

  // Apply the transformation
  carousel.style.transform = `translateX(-${translationDistance}%)`;
}

// Initial check to handle cases where the carousel is not full
window.onload = () => {
  moveCarousel(0); // Initialize position
};

// Re-evaluate position on resize for proper responsiveness
window.addEventListener('resize', () => {
  // Reset index to 0 when resizing significantly to prevent blank spaces
  currentIndex = 0;
  moveCarousel(0);
});

// Since the example only shows 3 cards, if you add more to make the carousel
// functional, this script will allow you to cycle through them!