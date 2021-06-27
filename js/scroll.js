//--- DEFINE a reusable animation function: ---//
function scrollThere(offset, speed) {

    $('html, body').stop().animate(
        { scrollTop: offset }, // move window so target element is at top of window
        speed, // speed in milliseconds
        'swing' // easing
    ); // end animate
} // end scrollThere function definition

const HomePage = document.querySelector('#Home');
const AboutPage = document.querySelector('#AboutPage');
const Projects = document.querySelector('#EndPage');
var bodyRect = document.body.getBoundingClientRect();
let coords = HomePage.getBoundingClientRect();
const HomeTop = coords.top - bodyRect.top;
let coords2 = AboutPage.getBoundingClientRect();
const AboutTop = coords2.top - bodyRect.top;
let coords3 = Projects.getBoundingClientRect();
const ProjectTop = coords3.top - bodyRect.top;
let ticking = false;

var scrollPos;
var scrollDirection;
var targetUp,
    targetDown,
    targetElement;



$(window).on('mousewheel', function (e) {

    if ( e.deltaY > 0 ) {
        scrollDirection = 'up';
      } else if ( e.deltaY <= 0 ) {
        scrollDirection = 'down';
      } // end if
console.log(scrollDirection);
    // condition: determine the previous and next divs to scroll to, based on lastScrollTop:
    if (scrollPos == HomeTop) {
        targetUp = HomeTop;
        targetDown = AboutTop;


    } else if (scrollPos == AboutTop) {
        targetUp = HomeTop;
        targetDown = ProjectTop;
    } else if (scrollPos == ProjectTop) {
        targetUp = AboutTop;
        targetDown = ProjectTop;
    } else if (scrollPos < AboutTop) {
        targetUp = HomeTop;
        targetDown = AboutTop;
    } else if (scrollPos < ProjectTop) {
        targetUp = AboutTop;
        targetDown = ProjectTop;
    }
    else if (scrollPos > AboutTop) {
        targetUp = AboutTop;
        targetDown = ProjectTop;
    }
    else if (scrollPos > ProjectTop) {
        targetUp = AboutTop;
        console.log(JSON.stringify("targetup: " + targetUp));
        targetDown = ProjectTop;
    } // end else if

    // condition: determine which of targetUp or targetDown to scroll to, based on scrollDirection:
    if (scrollDirection == 'down') {
        targetElement = targetDown;

    } else if (scrollDirection == 'up') {
        targetElement = targetUp;

    } // end else if

    // scroll smoothly to the target element:
    scrollThere(targetElement, 400);
});
