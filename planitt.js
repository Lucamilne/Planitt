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
}

//lazy loading scripts
var lazyLoadInstance = new LazyLoad({
    threshold: "500",
    container: document.querySelector(".render-showcase__container")
});

var lazyLoadInstance = new LazyLoad({
    container: document.querySelector(".carousel__track-container")
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

//terms and conditions
$(".terms-btn").click(function() {
    $("#terms").fadeIn();
})

$(".close").click(function() {
    $("#terms").fadeOut();
})

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
    const footer = document.querySelector("footer");

    if (currentSegment.nextElementSibling === null) {
        //if no next element exists
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

//carousel
var swiper = new Swiper('.carousel__track-container', {
    spaceBetween: 12,
    grabCursor: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

var swiper = new Swiper('.render-showcase__container', {
    spaceBetween: 12,
    grabCursor: true,
    freeMode: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});