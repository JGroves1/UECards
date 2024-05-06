'use strict';

// hero slideshow

// today's hours
const today = new Date();
let day =today.getDay();
const hours = document.querySelectorAll(".hours");
let todaysHours = hours[day];
todaysHours.setAttribute("id", "today");

// subscribe validation
 