const switcher = document.getElementById('switcher');

switcher.addEventListener('change', (e) => {
    if (e.target.checked) {
        document.body.classList.toggle('dark-theme')
        document.body.classList.toggle('light-theme')
    } else {
        document.body.classList.toggle('dark-theme')
        document.body.classList.toggle('light-theme')
    }
});
