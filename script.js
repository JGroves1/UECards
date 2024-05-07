'use strict';

// hero slideshow
    // acquire elements
    const heroSlides = document.querySelectorAll(".slide");
    // NEED TO ADD LIL DOTS TO NAVIGATE BTWN IMAGES

    let activeSlide = 0;
        
    // functions
        function currSlide(n) {
            heroSlides.forEach(slide => {
                slide.classList.remove("active");
            });

            heroSlides[n].classList.add("active");
        }

        function nextSlide() {
            activeSlide++;

            if (activeSlide >= heroSlides.length) {
                activeSlide = 0;
            }

            currSlide(activeSlide);
        }

    // automate it
    setInterval(nextSlide, 5000);

// today's hours
    const today = new Date();
    let day = today.getDay();
    const hours = document.querySelectorAll(".hours");
    let todaysHours = hours[day];
    todaysHours.setAttribute("id", "today");

// subscribe validation
 