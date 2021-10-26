document.body.addEventListener('click', event => {
    if (event.target === document.body) {
        document.body.classList.toggle('body_dark')
    }
});
