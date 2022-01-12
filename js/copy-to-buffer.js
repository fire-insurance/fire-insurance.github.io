const writeBtn = document.querySelector('#MailTo');
const copiedTip = document.querySelector('.CopiedTip');

writeBtn.addEventListener('click', () => {
    navigator.clipboard.writeText("dmitrij.snake2000@yandex.ru")
        .then(() => {
            
            copiedTip.style.animation = "fade 1500ms linear, slideUp 150ms linear both";
           //Убираем анимацию, чтобы была возможность вызвать ее повторно
            setTimeout(() => {
                copiedTip.style.animation = "none";
            }, 1000);
        }) 
        .catch(err => {
            console.log('Something went wrong', err);
        })

});