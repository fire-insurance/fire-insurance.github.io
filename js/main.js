const TypeWriter = function (txtElement, words, delay = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.delay = parseInt(delay, 10);
    this.type();
    this.isDeleting = false;
}

//Type Method
TypeWriter.prototype.type = function () {
    //Current index of a word
    const current = this.wordIndex % this.words.length;
    //Get full current word
    const fulltxt = this.words[current];

    //Check if in deleting state
    if (this.isDeleting) {
        //Remove a char
        this.txt = fulltxt.substring(0, this.txt.length - 1);
    } else {
        //Add a char 
        this.txt = fulltxt.substring(0, this.txt.length + 1);
    }

    //Insert txt into element
    this.txtElement.innerHTML = `<span class = "txt">${this.txt}</span>`

    //Initial Type speed
    let typeSpeed = 200;

    if(this.isDeleting){
        typeSpeed /= 2;
    }

    //if the word is complete
    if(!this.isDeleting && this.txt == fulltxt){
        typeSpeed = this.delay;
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt == ''){
        this.isDeleting = false;
        //Move to the next word
        this.wordIndex++;
        //Pause before typing a new word
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
}

//Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

//Init Func
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const delay = txtElement.getAttribute('data-wait');

    //Init Typewriter
    new TypeWriter(txtElement, words, delay);
}