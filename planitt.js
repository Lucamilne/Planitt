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
    toggleFilter();
})
//toggle contact form 
$(".contact").click(function () {
    toggleContactForm();
    toggleFilter();
    toggleMediaBar();
})
//close all menus if filter is clicked.
$(".filter").click(function () {
    $("nav").removeClass("toggle-nav")
    $(".branded-menu").removeClass("invert").children("i").removeClass("fa-times").addClass("fa-bars")
    $("header button").removeClass("invert-button")
    $("#contact-form-container").removeClass("toggle-nav");

    toggleFilter()
})

//opens and closes Nav bar depending on state (toggle-nav class = menu visible)
function toggleNav() {
    if ($("nav").hasClass("toggle-nav")) {
        $("nav").removeClass("toggle-nav")
    } else {
        $("nav").addClass("toggle-nav")
        $("#contact-form-container").removeClass("toggle-nav")
    }

    animateNav();
}

//opens and closes contact form depending on state (toggle-nav class = menu visible)
function toggleContactForm() {
    if ($("#contact-form-container").hasClass("toggle-nav")) {
        $("#contact-form-container").removeClass("toggle-nav")
    } else {
        $("#contact-form-container").addClass("toggle-nav")
        $("nav").removeClass("toggle-nav")
        animateNav();
    }
}

//enables a filter overlay on page if either nav bar or contact form is open
function toggleFilter() {
    if ($("nav").hasClass("toggle-nav") || $("#contact-form-container").hasClass("toggle-nav")) {
        $(".filter").removeClass("is-hidden")
    } else {
        $(".filter").addClass("is-hidden")
    }
}

function animateNav() {
    if ($("nav").hasClass("toggle-nav")) {
        $(".branded-menu").addClass("invert").children("i").removeClass("fa-bars").addClass("fa-times")
        $("header button").addClass("invert-button")
    } else {
        $(".branded-menu").removeClass("invert").children("i").removeClass("fa-times").addClass("fa-bars")
        $("header button").removeClass("invert-button")
    }
}

//terms and conditions
$(".terms-btn").click(function () {
    $("#terms").fadeIn();
})

$(".close").click(function () {
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

//intersection observer
const sections = document.querySelectorAll("section");
const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");
const header = document.querySelector("header");
const mediaBar = document.getElementById("media-bar")

const options = {
    threshold: 0,
    rootMargin: "0px 0px -80px 0px"
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
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});

var swiper = new Swiper(".introduction__points", {
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
    },
    effect: 'cube',
    cubeEffect: {
        shadow: false,
        slideShadows: false,
    },
    grabCursor: true,
    autoplay: {
        delay: 8000,
        disableOnInteraction: false,
    },
})