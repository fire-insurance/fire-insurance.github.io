var prevScrollpos = 0;//window.pageYOffset;
let anchors = ["Home", "AboutPage", "EndPage"];
var currentPage = 0;


var locked = false;
var lastCall = false;
var scrollEvent = function()
{
if(locked) {return;}

    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        // document.getElementById("navbar").style.top = "0";
        scrollToAnchor("UP");
    } else {
        //  document.getElementById("navbar").style.top = "-70px";
        scrollToAnchor("DOWN");
        console.log(prevScrollpos);
    }
    
    prevScrollpos = currentScrollPos;
    locked = true;
    setTimeout(()=>{
        locked = false;
        console.log(locked);
    }, 2000);

    console.log(locked);
}

var scrollToAnchor = function (direction) {

    if(direction === "DOWN" && currentPage < 2)
    {
        currentPage++;
        var nextAnchor = document.getElementById(anchors[currentPage]);
        nextAnchorPosition = nextAnchor.getBoundingClientRect().top + window.pageYOffset;
    }
    if (direction === "UP" && currentPage > 0)
    {
        currentPage--;
        var nextAnchor = document.getElementById(anchors[currentPage]);
        nextAnchorPosition = nextAnchor.getBoundingClientRect().top + window.pageYOffset;
    }
    window.scrollTo({
        top: nextAnchorPosition,
        behavior:"smooth"
    });
}

$(window).on('scroll', scrollEvent());

/*
var addEvent = function () {

    console.log("event added");
    $(window).on('scroll', function () { // bind event handler
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            // document.getElementById("navbar").style.top = "0";
            scrollToAnchor("UP");
            $(window).off('scroll');
           

        } else {
            //  document.getElementById("navbar").style.top = "-70px";
            scrollToAnchor("DOWN");
            $(window).off('scroll');

           
        }
        prevScrollpos = currentScrollPos;
    });
}

addEvent();



var scrollToAnchor = function (direction) {

    if (direction === "DOWN" && currentPage < 2) {
        currentPage++;
        var nextAnchor = document.getElementById(anchors[currentPage]);
        nextAnchorPosition = nextAnchor.getBoundingClientRect().top + window.pageYOffset;
    }
    if (direction === "UP" && currentPage > 0) {
        currentPage--;
        var nextAnchor = document.getElementById(anchors[currentPage]);
        nextAnchorPosition = nextAnchor.getBoundingClientRect().top + window.pageYOffset;
    }
    window.scrollTo({
        top: nextAnchorPosition,
        behavior: "smooth"
    });
}

*/

/*

var scrollEvent = function()
{
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        // document.getElementById("navbar").style.top = "0";
        scrollToAnchor("UP");
        $(window).off('scroll');

    } else {
        //  document.getElementById("navbar").style.top = "-70px";
        scrollToAnchor("DOWN");
        $(window).off('scroll');
        console.log(prevScrollpos);
    }
    prevScrollpos = currentScrollPos;

}

var scrollToAnchor = function (direction) {

    if(direction === "DOWN" && currentPage < 2)
    {
        currentPage++;
        var nextAnchor = document.getElementById(anchors[currentPage]);
        nextAnchorPosition = nextAnchor.getBoundingClientRect().top + window.pageYOffset;
    }
    if (direction === "UP" && currentPage > 0)
    {
        currentPage--;
        var nextAnchor = document.getElementById(anchors[currentPage]);
        nextAnchorPosition = nextAnchor.getBoundingClientRect().top + window.pageYOffset;
    }
    window.scrollTo({
        top: nextAnchorPosition,
        behavior:"smooth"
    });
}


$(window).on('scroll', scrollEvent());



*/