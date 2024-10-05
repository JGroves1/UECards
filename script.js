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

// event expanding for mobile friendliness 
function expandDetails() {
    const expBtns = document.querySelectorAll(".eventExpand");
    
    // event listener & local function
    expBtns.forEach(expBtn => {
        expBtn.addEventListener("click", function() {
            // find the closest parent listing & sibling info
            const eventListing = this.closest(".eventListing");
            const eventInfo = eventListing.querySelector(".eventInfo");
            const eventDesc = eventListing.querySelector(".eventDesc");
            
            // toggle height & arrow direction
            if (eventInfo.style.height === "auto") {
                eventInfo.style.height = "";
                eventDesc.style.opacity = "";
                this.style.transform = "rotate(0deg)";
                this.style.transition = "transform 0.5s";
            } else {
                eventInfo.style.height = "auto";
                eventDesc.style.opacity = "100%";
                this.style.transform = "rotate(180deg)";
                this.style.transition = "transform 0.5s";
            }
        });
    });
};

// now the fun part of event filtering by month/selection! 
function sortEvents() {

    // are there events?
    const listings = document.querySelectorAll(".eventListing");
    if(listings.length > 0) {
        // gather the other elements
        const monthDropdown = document.querySelector("#monthsDropdown");
        const yearDropdown = document.querySelector("#yearDropdown");
        const moreBtn = document.querySelector("#loadMoreBtn");  

        // check today's month & year
        const date = new Date();
        let currMonth = date.getMonth() + 1;
        let currYear = date.getFullYear();

        // default the dropdown menus to this
        monthDropdown.value = currMonth;
        yearDropdown.value = currYear;

        // "globally" store the selections
        var selectedMonth = parseInt(monthDropdown.value);
        var selectedYear = parseInt(yearDropdown.value);

        // display the selected events!
        function display() {
            // first we have to apply the hidden class 
            listings.forEach((listing) => {
                listing.classList.add("hiddenEvent");
            });

            // filtering based on selections
            let filteredEvents = [];
            filteredEvents = Array.from(listings).filter((listing) => {
                const eventYear = parseInt(listing.classList[2]);
                const eventMonth = parseInt(listing.classList[1]);
                return eventYear === selectedYear && eventMonth === selectedMonth;
            });

            // establishing future events
            const futureEvents = Array.from(listings).filter((listing) => {
                const eventYear = parseInt(listing.classList[2]);
                const eventMonth = parseInt(listing.classList[1]);
                if(eventYear === selectedYear) {
                    return eventMonth > selectedMonth;
                }else if(eventYear > selectedYear) {
                    return true;
                }else {
                    return false;
                };
            });

            // default poss visible events
            var visEvents = filteredEvents.concat(futureEvents);

            // but let's only load up to 4 initially
            filteredEvents.slice(0, 4).forEach((listing) => {
                listing.classList.remove("hiddenEvent");
            });
            
            // get the number visible
            let currItem = Math.min(filteredEvents.length, 4);

            // more button reset -- if there are any future events it shows
            moreBtn.style.display = (futureEvents.length > 0) ? "block" : "none"

            // no message reset
            noMsg.style.display = "none";

            // now make the more btn function
            moreBtn.onclick = () => {
                // determine how many to load --mathing maths
                let itemsToDisplay;
                if(currItem === 1) {
                    itemsToDisplay = 3;
                }else if(currItem === 2) {
                    itemsToDisplay = 2;
                }else {
                    itemsToDisplay = 4;
                };

                // show em
                for (let i = currItem; i < currItem + itemsToDisplay && i < visEvents.length; i++) {
                    visEvents[i].classList.remove("hiddenEvent");
                };

                // update number visible
                currItem += itemsToDisplay;

                // show or hide more button
                var remainingEvents = visEvents.length - currItem;
                if (remainingEvents <= 0) {
                    moreBtn.style.display = "none";
                };

                // no message reset
                noMsg.style.display = "none";
            };

            // no events message show/hide
            if (currItem === 0) {
                let noMsg = document.querySelector("#noMsg");
                noMsg.style.display = "block";
            };
        };

        // go go go! -- defaults show
        display();

        // functions when user selects month/year
        // display events based on month selection
        monthDropdown.addEventListener("change", () => {
            selectedMonth = parseInt(monthDropdown.value);
    
            listings.forEach((listing) => {
                listing.classList.add("hiddenEvent");
            });
    
            display();
        });
  
        // display events based on year selection
        yearDropdown.addEventListener("change", () => {
            selectedYear = parseInt(yearDropdown.value);
    
            listings.forEach((listing) => {
                listing.classList.add("hiddenEvent");
            });
    
            display();
        });
    };
};

// Return to Top Button (About & Events Pages)
function returnToTop() {
    const topBtn = document.getElementById("topBtn");

    // if it's there, we're gonna make it visible after the user scrolls
    if(topBtn) {
        function toggleBtnVis() {
            if(window.pageYOffset > 100) {
                topBtn.style.display = "block";
            }else {
                topBtn.style.display = "none";
            };
        };

        // now make it work
        function scrollToTop(e) {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: "smooth"});
        };

        // event listeners
        window.addEventListener("scroll", toggleBtnVis);
        topBtn.addEventListener("click", scrollToTop);
    };
};

// time to call the functions on page load
document.addEventListener("DOMContentLoaded", function() {
    highlightToday();
    heroSlideshow();
    formFunction();
    subFunction();
    expandDetails();
    sortEvents();
    returnToTop();
});
