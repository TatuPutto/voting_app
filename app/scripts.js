function toggleResults() {
    let element = document.getElementsByClassName('answers')[0];
    let btn = document.getElementsByClassName('results')[0];

    if(element.style.display === 'inline') {
        element.style.display = 'none'
        btn.value = 'Results';
    } else {
        element.style.display = 'inline';
        btn.value = 'Hide results';
    }
}

function addOptionField() {
    let optionFields = document.getElementsByClassName('option');
    const optionsAmount = optionFields.length + 1;

    var textInput = document.createElement("input");
    textInput.setAttribute('type', 'text');
    textInput.setAttribute('class', 'option');
    textInput.setAttribute('name', 'option' + optionsAmount);
    textInput.setAttribute('placeholder', optionsAmount + '. option');

    let pollOptions = document.getElementsByClassName('poll-options')[0];
    pollOptions.append(textInput);

}
