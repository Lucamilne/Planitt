const rollingText = document.querySelector(".rolling-text p");
const slide = document.querySelector(".slide");
const body = document.body;

$("#landing-animation").delay(2000).slideUp(600);

$("main").delay(3000).fadeIn();

function scrollTo(hash) {
    document.getElementById(`${hash}`).scrollIntoView();
}

// rollingText.addEventListener("animationend", function() {
//     document.getElementById("our-service").scrollIntoView();
// })

$(".branded-menu").click(function () {
    $("nav").toggleClass("toggle-nav")
    invertHeader();
    toggleMenuIcon();
})

$(".contact").click(function () {
    $("#contact-form-container").toggleClass("toggle-nav")
})

function invertHeader() {
    $(".branded-menu").toggleClass("invert")
    $("header button").toggleClass("invert-button")
}

function toggleMenuIcon() {
    $(".branded-menu i").toggleClass("fa-bars fa-times")
}


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
            $(this).addClass('opacity');
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