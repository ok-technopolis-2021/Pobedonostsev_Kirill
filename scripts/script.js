const switcher = document.getElementById('switcher');

switcher.addEventListener('change', (event) => {
    if (event.target.checked) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
});
