const rollingText = document.querySelector(".rolling-text p");
const slide = document.querySelector(".slide");
const body = document.body;
const images = document.querySelectorAll("[data-src]");
let isMobile = false;

if (document.documentElement.clientWidth < 768) {
    isMobile = true;
}

//lazy loading scripts
var lazyLoadInstance = new LazyLoad({
    elements_selector: ".hero-image"
});

var lazyLoadInstance = new LazyLoad({
    elements_selector: ".carousel__image"
});

// landing animation (logo)
$("#landing-animation").delay(2000).slideUp(600);

// $("main").delay(3000).fadeIn("slow");

function scrollTo(hash) {
    document.getElementById(`${hash}`).scrollIntoView();
}

// rollingText.addEventListener("animationend", function() {
//     $(".slider").slideUp("slow");
// })


//toggle nav menu
$(".branded-menu").click(function () {
    toggleNav();
    // toggleContactButton();
})

//cancel nav menu if filter is clicked. needs refinement. .one("click") etc.
$("#filter").click(function () {
    toggleNav();
    //resetNav
    //reset contact form
}).fadeOut();

function toggleMediaBar() {
    $("#media-bar").fadeToggle();
}

function toggleNav() {
    $("nav").toggleClass("toggle-nav");
    invertHeader();
    toggleMenuIcon();
}

$(".contact").click(function () {
    $("#contact-form-container").toggleClass("toggle-nav")
    toggleMediaBar()
})

function invertHeader() {
    $(".branded-menu").toggleClass("invert")
    $("header button").toggleClass("invert-button")
}

function toggleMenuIcon() {
    $(".branded-menu i").toggleClass("fa-bars fa-times")
    //toggles filter on menu dropdown
    $("#filter").fadeToggle("fast");
}

//kitchen selector functionality for desktop only
$(".product-styles button").click(function () {
    removeActiveClasses();


    
    $(this).addClass("active")
})

function removeActiveClasses() {
    $(".product-styles button").removeClass("active")
}

// Add smooth scrolling to all links
$("a").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== "") {
    // Prevent default anchor click behavior
    event.preventDefault();
      // Store hash
    var hash = this.hash;
      // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 0, function(){
 
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
  }
});

//kitchen-selector :hover label highlighting
// $(".column li").hover(function () {
//     $(this).children("label").css({
//         "background-color": "rgba(255,255,255,0.5",
//         "color": "#222",
//         "transform": "translate(10px, 0)"
//     })
// }, function () {
//     $(this).children("label").css({
//         "background-color": "rgba(0, 0, 0, 0.3)",
//         "color": "#eee",
//         "transform": "translate(0,0)"
//     })
// });


//scroll into view animation triggering
function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

$(window).scroll(function () {
    $('.step').each(function () {
        if (isScrolledIntoView(this) === true) {
            $(this).addClass('step-animation');
        }
    });
});
//^ This is a load of bollocks. Change it.


//media bar hover effect
$(".contact-icon i").hover(function () {
    //mouse in
    $(this).css({
        "background-color": "#fff",
        "color": "#222"
    })
}, function () {
    //mouse out
    $(this).css({
        "background-color": "",
        "color": "#fff"
    })
})

//carousel
//carousel
//carousel
//carousel

const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button-right");
const prevButton = document.querySelector(".carousel__button-left");
const slideWidth = slides[0].getBoundingClientRect().width;
const dotsNav = document.querySelector(".carousel__nav")
const dots = Array.from(dotsNav.children);

slides.forEach((slide, index) => {
    if (isMobile) {
        return;
    }

    slide.style.left = `${slideWidth * index}px`;
})

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide.style.left})`
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide")
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("current-slide");
    targetDot.classList.add("current-slide");
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add("is-hidden");
        nextButton.classList.remove("is-hidden");
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove("is-hidden");
        nextButton.classList.add("is-hidden");
    } else {
        prevButton.classList.remove("is-hidden")
        nextButton.classList.remove("is-hidden")
    }
}

nextButton.addEventListener("click", () => {
    let currentSlide = track.querySelector(".current-slide");
    let nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector(".current-slide");
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

prevButton.addEventListener("click", () => {
    let currentSlide = track.querySelector(".current-slide");
    let prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector(".current-slide");
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);


    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
})

dotsNav.addEventListener("click", e => {
    const targetDot = e.target.closest("button");

    if(!targetDot) { 
        return; 
    }

    const currentSlide = track.querySelector(".current-slide");
    const currentDot = dotsNav.querySelector(".current-slide");
    const targetIndex = dots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
});