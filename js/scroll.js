//--- DEFINE a reusable animation function: ---//
function scrollThere(offset, speed) {

    $('html, body').stop().animate(
        { scrollTop: offset }, // move window so target element is at top of window
        speed, // speed in milliseconds
        'swing' // easing
    ); // end animate
} // end scrollThere function definition


function preventDefault(e) {
    e.preventDefault();
  }
  
  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
var supportsPassive = false;

function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  }
  
  // call this to Enable
  function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
  }

const HomePage = '#Home';
const AboutPage ='#AboutPage';
const Projects = '#EndPage';
var bodyRect = document.body.getBoundingClientRect();
let coords = document.querySelector(HomePage).getBoundingClientRect();
const HomeTop = coords.top - bodyRect.top;
let coords2 = document.querySelector(AboutPage).getBoundingClientRect();
const AboutTop = coords2.top - bodyRect.top;
let coords3 = document.querySelector(Projects).getBoundingClientRect();
const ProjectTop = coords3.top - bodyRect.top;
let ticking = false;

var scrollDirection;
var targetUp,
    targetDown,
    targetElement;

var prevprevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var time = Date.now();
    disableScroll();
    scrollTo();
    return function() {
      if ((time + 10000 - Date.now()) < 0) {
          console.log("Time passed!");

        time = Date.now();
      }
    }
  }

var scrollTo = function () {
    var currentprevScrollpos = window.pageYOffset;
    if (prevprevScrollpos > currentprevScrollpos) {
        scrollDirection = "Up";
    } else {
        scrollDirection = "Down";
    }
    prevprevScrollpos = currentprevScrollpos;
    

    // condition: determine the previous and next divs to scroll to, based on lastScrollTop:
    if (prevprevScrollpos === HomeTop) {
        targetUp = HomeTop;
        targetDown = AboutTop;


    } else if (prevScrollpos === AboutTop) {
        targetUp = HomePage;
        targetDown = Projects;
    } else if (prevScrollpos === ProjectTop) {
        targetUp = AboutPage;
        targetDown = Projects;
    } else if (prevScrollpos < AboutTop) {
        targetUp = HomePage;
        targetDown = AboutPage;
    } else if (prevScrollpos < ProjectTop) {
        targetUp = AboutPage;
        targetDown = Projects;
    }
    else if (prevScrollpos > AboutTop) {
        targetUp = AboutPage;
        targetDown = Projects;
    }
    else if (prevScrollpos > ProjectTop) {
        targetUp = AboutPage;
    } // end else if

    // condition: determine which of targetUp or targetDown to scroll to, based on scrollDirection:
    if (scrollDirection === 'Down') {
        targetElement = targetDown;

    } else if (scrollDirection === 'Up') {
        targetElement = targetUp;

    } // end else if
    console.log("Direction" + scrollDirection);
    if(targetElement!=0)
    {
    document.querySelector(targetElement).scrollIntoView(true);
   
    }
    // scroll smoothly to the target element:
    
}
