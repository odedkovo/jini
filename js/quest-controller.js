'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
  console.log('Started...');
  createQuestsTree();
}

function onStartGuessing() {
  $('.game-start').hide();
  renderQuest();
  $('.quest').show();
  // TODO: show the quest section
}

function renderQuest() {
  $('.quest h2').text(getCurrQuest().txt);
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  console.log(res);
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      alert('Yes, I knew it!');
      onRestartGame();
      init();

      // TODO: improve UX
    } else {
      alert('I dont know...teach me!');
      $('.quest').hide();
      $('.new-quest').show();

      // TODO: hide and show new-quest section
    }
  } else {
    gLastRes = res;
    // TODO: update the lastRes global var
    moveToNextQuest(res);
    renderQuest();
  }
  console.log('the res in onuserrespone', res);
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  if (newGuess === '' || newQuest === '') return;

  addGuess(newQuest, newGuess, gLastRes);
  // TODO: Get the inputs' values
  // TODO: Call the service addGuess

  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  gLastRes = null;
}
