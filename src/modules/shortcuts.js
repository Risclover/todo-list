const submit = document.getElementById('submit');

const keyboardShortcuts = (() => {
    const input = document.getElementById('todo-input');

    input.addEventListener('keydown', function(e) {
        if(e.key === 'Enter') {
            submit.click();
        }
    });
})();

export default keyboardShortcuts;