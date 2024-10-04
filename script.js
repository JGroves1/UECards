'use strict';

// today's hours - applies to sections on Home & About pages
function highlightToday() {
    const today = new Date();
    let day = today.getDay();
    const hours = document.querySelectorAll(".hours");
    if (hours.length > 0) {
        let todaysHours = hours[day];
        todaysHours.classList.add("today");
    };
};

// hero slideshow
function heroSlideshow() {
    // acquire elements
    const heroSlides = document.querySelectorAll(".slide");
    const heroDots = document.querySelector(".heroDots");

    // are there slides?
    if (heroSlides.length > 0) {
        let activeSlide = 0;

        // create the right number of dots
            for (let i = 0; i < heroSlides.length; ++i) {
                const newDot = document.createElement("span");
                newDot.classList.add("heroDot");
                heroDots.appendChild(newDot);
            };
            
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
            };

            function nextSlide() {
                activeSlide++;

                if (activeSlide >= heroSlides.length) {
                    activeSlide = 0;
                }

                currSlide(activeSlide);
            };

        // make the dots click-y
            allDots.forEach((heroDot, i) => {
                heroDot.addEventListener("click", () => {
                    currSlide(i);
                });
            });

        // automate it
        setInterval(nextSlide, 5000);
    };
};

// contact form validation -- form info is not sent anywhere
function formFunction() {
    // is there a contact form?
    const form = document.querySelector("#contactForm");
    if (form) {
        // acquiring the rest of the elements
        const custName = document.querySelector("#name");
        const email = document.querySelector("#email");
        const message = document.querySelector("#message");
        // don't forget error spans
        let errorSpans = document.querySelectorAll("#contactForm .errorMessage");
        const nameError = errorSpans[0];
        const emailError = errorSpans[1];
        const messageError = errorSpans[2];

        // event listener
        form.addEventListener("submit", validateForm);
        // function/validate
        function validateForm(e) {
            // resets for error messages
            nameError.style.display = "none";
            emailError.style.display = "none";
            messageError.style.display = "none";
            let isValid = true;

            // validate name length (min is only 2 just in case their name is DJ or something short)
            if(custName.value.length < 2) {
                nameError.style.display = "block";
                isValid = false;
                e.preventDefault();
            };

            // validate email is legit email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!email.value || !emailRegex.test(email.value)) {
                emailError.style.display = "block";
                isValid = false;
                e.preventDefault();
            };

            // make sure the user inputs a message
            if(message.value.length === 0){
                messageError.style.display = "block";
                isValid = false;
                e.preventDefault();
            };
        };
    };
};

// subscribe validation -- this information goes nowhere 
function subFunction() {
    const subscribe = document.querySelector("#subscribe");
    // subscribe is a mini form if you think about it
    const subEmail = document.querySelector("#subEmail");
    // feedback spans
    const subError = document.querySelector(".subErrorMessage");
    const subSuccess = document.querySelector(".successMessage");

    // event listener
    subscribe.addEventListener("submit", validateSub);

    // function mostly to make sure the email is in email legit format
    function validateSub(e) {
        e.preventDefault();
        // acquire messages
        subError.style.display = "none";
        subSuccess.style.display = "none";

        // validate email is legit email format
        const subEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!subEmail.value || !subEmailRegex.test(subEmail.value)) {
            subError.style.display = "block";
        } else {
            subSuccess.style.display = "block";
            subEmail.value = '';
        };
    };
};

// time to call the functions on page load
document.addEventListener("DOMContentLoaded", function() {
    highlightToday();
    heroSlideshow();
    formFunction();
    subFunction();
})
