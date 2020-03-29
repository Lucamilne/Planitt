const rollingText = document.querySelector(".rolling-text p");
const slide = document.querySelector(".slide");
const body = document.body;
const images = document.querySelectorAll("[data-src]");

//lazy loading scripts
function preloadImage(img) {
    const src = img.getAttribute("data-src");
    if (!src) {
        return;
    }

    img.src = src;
}

//threshold options
const imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px 300px 0px"
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            preloadImage(entry.target);
            //Stops observing once img loaded
            imgObserver.unobserve(entry.target);
        }
    })
}, imgOptions);

images.forEach(image => {
    imgObserver.observe(image);
})

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
$(".product-styles ul").click(function () {
    removeActiveClasses();
    $(this).addClass("active")
})

function removeActiveClasses() {
    $(".product-styles ul").removeClass("active")
}

$("#modern").click(function () {
    $(".column:nth-of-type(1)").css({
        "transform": "translate(0,0)"
    })
    $(".column:nth-of-type(2)").css({
        "transform": "translate(0,100%)"
    })
    $(".column:nth-of-type(3)").css({
        "transform": "translate(0,200%)"
    })
})

$("#classic").click(function () {
    $(".column:nth-of-type(1)").css({
        "transform": "translate(0,-100%)"
    })
    $(".column:nth-of-type(2)").css({
        "transform": "translate(0,0)"
    })
    $(".column:nth-of-type(3)").css({
        "transform": "translate(0,100%)"
    })
})

$("#trad").click(function () {
    $(".column:nth-of-type(1)").css({
        "transform": "translate(0,-200%)"
    })
    $(".column:nth-of-type(2)").css({
        "transform": "translate(0,-100%)"
    })
    $(".column:nth-of-type(3)").css({
        "transform": "translate(0,0)"
    })
})

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
$(".column").hover(function () {
    $(this).children().css({
        "background-color": "rgba(255,255,255,0.5",
        "color": "#222",
        "transform": "translate(10px, 0)"
    })
}, function () {
    $(this).children().css({
        "background-color": "rgba(0, 0, 0, 0.3)",
        "color": "#eee",
        "transform": "translate(0,0)"
    })
});


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