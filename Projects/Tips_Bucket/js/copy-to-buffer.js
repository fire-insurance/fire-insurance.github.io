const CopyBtn = document.querySelector('.NumberButton');

CopyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText("89144232693")
        .then(() => {

            if (CopyBtn.innerText !== 'Скопировано!') {
                const originalText = CopyBtn.innerText;
                CopyBtn.innerText = 'Скопировано!';
                setTimeout(() => {
                    CopyBtn.innerText = originalText;
                }, 1500);
            }
        })
        .catch(err => {
            console.log('Something went wrong', err);
        })

});