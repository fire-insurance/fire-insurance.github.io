const CloseBtn = document.querySelector('.CloseButton');
const OtherBankBtn = document.querySelector('.OtherBank')
const OtherBankWindow = document.querySelector('.OtherBankWindow')

OtherBankBtn.addEventListener('click', () => {
    
    OtherBankWindow.style.animation = "WindowInAndOut 1s ease-in-out both";
    OtherBankWindow.style.display = "flex";

    setTimeout(deleteAnimation,1000);
    
});

CloseBtn.addEventListener('click', () => {
    
    OtherBankWindow.style.animation = "WindowInAndOut 1s ease-in-out reverse both";
    setTimeout(displaynone,1000);
   
});

var displaynone = function(){
    OtherBankWindow.style.display = "none";
    deleteAnimation();
}

var deleteAnimation = function(){
    OtherBankWindow.style.animation = "none";
}