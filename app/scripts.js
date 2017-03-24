// show/hide results for singlepoll
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

// add new option field to poll
function addOptionField() {
    let options = document.getElementsByClassName('option');
    const optionsAmount = options.length + 1;

    var textInput = document.createElement("input");
    textInput.setAttribute('type', 'text');
    textInput.setAttribute('class', 'option');
    textInput.setAttribute('name', 'option' + optionsAmount);
    textInput.setAttribute('placeholder', optionsAmount + '. option');

    let pollOptions = document.getElementsByClassName('poll-options')[0];
    pollOptions.append(textInput);
}

// check radio button with matching id
function selectOption(elementId) {
    let element = document.getElementById(elementId);
    element.checked = true;

    optionSelected();
}

// enable form submit button
function optionSelected() {
    let voteBtn = document.getElementsByClassName('vote')[0];
    voteBtn.disabled = false;
}

// remove poll async
function removePoll(event, pollId) {
    // prevent click event from reaching parent
    event.stopPropagation();

    // remove node
    let parent = event.srcElement.parentNode;
    parent.remove();

    // request poll to be removed from database
    fetch('http://localhost:8080/removepoll/' + pollId, {method: 'delete'});
}
