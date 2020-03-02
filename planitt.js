const rollingText = document.querySelector(".rolling-text p");

$("#landing-animation").delay(2000).slideUp(600);

$("main").delay(3000).fadeIn();


rollingText.addEventListener("animationend", function() {
    document.getElementById("article-1").scrollIntoView();
})

$(".branded-menu").click(function() {
    $("nav").toggleClass("toggle-nav")
    invertHeader();
})

function invertHeader() {
    $(".branded-menu").toggleClass("invert")
    $("header button").toggleClass("invert-button")
}