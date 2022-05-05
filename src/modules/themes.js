const themeBoxes = document.querySelectorAll('.theme-box');

themeBoxes.forEach(box => {
    box.addEventListener('click', function(e) {
        const ele = e.target;
        selectTheme(ele);
    })
})
