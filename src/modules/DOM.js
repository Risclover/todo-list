function pageLoader() {
    const content = document.getElementById('content');
    const newInput = document.createElement('input');
    const newLabel = document.createElement('label');
    const submitBtn = document.createElement('button');
    
    newLabel.textContent = "Item:";
    newLabel.setAttribute('for', 'todo');
    submitBtn.textContent = 'Submit';
    newInput.setAttribute('placeholder', 'Ex: Do laundry');
    newInput.setAttribute('name', 'todo');

    content.appendChild(newLabel);
    content.appendChild(newInput);
    content.appendChild(submitBtn);
}

export default pageLoader;