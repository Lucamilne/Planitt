const rollingText = document.querySelector(".rolling-text p");
const slide = document.querySelector(".slide");
const body = document.body;
const images = document.querySelectorAll("[data-src]");
let isMobile = false;

if (document.documentElement.clientWidth < 768) {
    isMobile = true;
}

const video = document.querySelector("video");

//if mobile don't run scripts
if (!isMobile) {
    //enable the downloading of video
    video.src = "./img/freeuse/space.mp4";

    //throttled scroll event
    $(window).bind('wheel', _.debounce(function(event) {
        if (event.originalEvent.wheelDelta >= 0) {
            scrollUp();
        } else {
            scrollDown();
            console.log("fired")
        }
    }, 200));

    //the above, but for tablet devices with touchstart/touchend
    var touchStart;
    $(document).bind('touchstart', function (e){
        touchStart = e.originalEvent.touches[0].clientY;
    });

    $(document).bind('touchend', function (e){
            var touchEnd = e.originalEvent.changedTouches[0].clientY;
        if(touchStart > touchEnd+5){
            scrollDown();
        } else if(touchStart < touchEnd-5){
            scrollUp();
        }
    });
}

//lazy loading scripts
var lazyLoadInstance = new LazyLoad({
    elements_selector: ".render-image, .carousel__image"
});

var lazyLoadInstance = new LazyLoad({
    elements_selector: ".gallery__image"
});

let landingAnimDuration = setTimeout(contentReadyCheck, 2000);

// check if content is ready
function contentReadyCheck() {
    if (document.readyState == 'complete') {
        revealMain(600);
    } else {
        $(window).on('load', function (e) {
        revealMain(600);
        })
    }
}

//reveal content
function revealMain(animationDuration) {
    $("#landing-animation").slideUp(animationDuration)
    $("main").animate({ opacity: 1 }, animationDuration)
    $(".promo").fadeIn(animationDuration);
}

function scrollTo(hash) {
    document.getElementById(`${hash}`).scrollIntoView();
}

//toggle nav menu
$(".branded-menu").click(function () {
    toggleNav();
})

//cancel nav menu if filter is clicked.
$("#filter").click(function () {
    toggleNav();
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
$("a").on('click', function (event) {
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
        }, 0, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    }
});

// kitchen-selector hover label highlighting
$(".column li").hover(function () {
    $(this).children("label").css({
        "background-color": "rgba(255,255,255,0.5",
        "color": "#222",
        "transform": "translate(-12px, 0)"
    })
}, function () {
    $(this).children("label").css({
        "background-color": "rgba(0, 0, 0, 0.3)",
        "color": "#eee",
        "transform": "translate(0,0)"
    })
});

//intersection observer
const sections = document.querySelectorAll("section");
const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");
const header = document.querySelector("header");
const mediaBar = document.getElementById("media-bar")

const options = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            entry.target.classList.remove("appear");
            // return;
        } else {
            entry.target.classList.add("appear");
            // appearOnScroll.unobserve(entry.target);
        }
    });
}, options);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
})

sliders.forEach(slider => {
    appearOnScroll.observe(slider);
})
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
const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button-right");
const prevButton = document.querySelector(".carousel__button-left");
const slideWidth = slides[0].getBoundingClientRect().width;
const dotsNav = document.querySelector(".carousel__nav")
const dots = Array.from(dotsNav.children);

slides.forEach((slide, index) => {
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
    if (isMobile) {
        return;
    }

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

    if (!targetDot) {
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

//scroll functions
function scrollUp() {  
    let currentSegment = document.querySelector(".current-segment");
    const prevSegment = currentSegment.previousElementSibling;

    if (currentSegment.previousElementSibling === null) {
        // if no prev element exists
        return;
    } else {
        currentSegment.previousElementSibling.scrollIntoView();
        updateCurrentSegment(currentSegment, prevSegment)
    }
}

function scrollDown() {
    let currentSegment = document.querySelector(".current-segment");
    const nextSegment = currentSegment.nextElementSibling;

    if (currentSegment.nextElementSibling === null) {
        // if no next element exists
        return;
    } else {
        currentSegment.nextElementSibling.scrollIntoView();
        updateCurrentSegment(currentSegment, nextSegment)
    }
}

function updateCurrentSegment(currentSegment, targetSegment) {
    currentSegment.classList.remove("current-segment");
    targetSegment.classList.add("current-segment");
}