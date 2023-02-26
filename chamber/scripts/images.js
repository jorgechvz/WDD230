const slider = document.querySelector('.slider-container');
const prevSlide = document.querySelector('.prev-slide');
const nextSlide = document.querySelector('.next-slide');
let slideIndex = 0;
const slides = slider.querySelectorAll('img');
const totalSlides = slides.length;

//Function to update slide visibility
function updateSlideVisibility() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}
/* Slider Code */
//Function to handle the screen size change event
function handleWindowResize() {
  if (window.innerWidth < 768) 
  {
    // If the screen width is less than 768 pixels,
    // set the slider events
    prevSlide.addEventListener('click', () => {
      slideIndex--;
      if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
      }
      updateSlideVisibility();
    });

    nextSlide.addEventListener('click', () => {
      slideIndex++;
      if (slideIndex > totalSlides - 1) {
        slideIndex = 0;
      }
      updateSlideVisibility();
    });

    // We updated the visibility of the slides
    updateSlideVisibility();
  } else {
    // If the screen width is greater than or equal to 768 pixels,
    // remove slider events and show all slides
    prevSlide.removeEventListener('click', () => {});
    nextSlide.removeEventListener('click', () => {});

    slides.forEach((slide) => {
      slide.style.display = 'block';
    });
  }
}

// We configure the screen size change event
window.addEventListener('resize', handleWindowResize);

// We initialize the slider
handleWindowResize();
