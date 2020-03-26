const rollingText = document.querySelector(".rolling-text p");
const slide = document.querySelector(".slide");
const body = document.body;

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
    $("nav").toggleClass("toggle-nav")
    invertHeader();
    toggleMenuIcon();
})

//cancel nav menu if filter is clicked. needs refinement. .one("click") et,.c
$("#filter").click(function () {
    $("nav").toggleClass("toggle-nav");
    invertHeader();
    toggleMenuIcon();
}).fadeOut();

function toggleMediaBar() {
    $("#media-bar").fadeToggle();
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
})

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