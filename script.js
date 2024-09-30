'use strict';
// today's hours
const today = new Date();
let day = today.getDay();
const hours = document.querySelectorAll(".hours");
let todaysHours = hours[day];
todaysHours.classList.add("today");

// hero slideshow
    // acquire elements
    const heroSlides = document.querySelectorAll(".slide");
    const heroDots = document.querySelector(".heroDots");

    let activeSlide = 0;

    // create the right number of dots
        for (let i = 0; i < heroSlides.length; ++i) {
            const newDot = document.createElement("span");
            newDot.classList.add("heroDot");
            heroDots.appendChild(newDot);
        }
        
        // gather all created dots and style the first one as active
        const allDots = document.querySelectorAll(".heroDot");
        allDots[0].classList.add("active");

    // functions
        function currSlide(n) {
            heroSlides.forEach(slide => {
                slide.classList.remove("active");
            });

            allDots.forEach(heroDot => {
                heroDot.classList.remove("active");
            })

            heroSlides[n].classList.add("active");
            allDots[n].classList.add("active");
        }

        function nextSlide() {
            activeSlide++;

            if (activeSlide >= heroSlides.length) {
                activeSlide = 0;
            }

            currSlide(activeSlide);
        }

    // make the dots click-y
        allDots.forEach((heroDot, i) => {
            heroDot.addEventListener("click", () => {
                currSlide(i);
            });
        });

    // automate it
    setInterval(nextSlide, 5000);

// subscribe validation/functionality would go here
 