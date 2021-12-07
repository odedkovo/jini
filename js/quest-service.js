var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
  var quests = loadFromStorage('questsDB');
  if (!quests || quests.length === 0) {
    gQuestsTree = createQuest('Male?');
    gQuestsTree.yes = createQuest('Gandhi');
    gQuestsTree.no = createQuest('Rita');
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    saveToStorage('questsDB', gCurrQuest);
  } else gCurrQuest = quests;
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  };
}

function isChildless(node) {
  return node.yes === null && node.no === null;
}

function moveToNextQuest(res) {
  gPrevQuest = gCurrQuest;
  console.log(gPrevQuest);
  console.log('before', gCurrQuest);
  gCurrQuest = gCurrQuest[res];
  console.log('after', gCurrQuest);
  // TODO: update the gPrevQuest, gCurrQuest global vars
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  console.log(lastRes);
  var newQuest = createQuest(newQuestTxt);
  newQuest.yes = createQuest(newGuessTxt);
  newQuest.no = gCurrQuest;
  gPrevQuest[lastRes] = newQuest;
  gCurrQuest = gQuestsTree;
  saveToStorage('questsDB', gQuestsTree);

  console.log(lastRes);

  //   console.log(newQuestTxt);
  //   console.log(newGuessTxt);
  //   console.log(lastRes);
  //   console.log(gCurrQuest);
  // TODO: Create and Connect the 2 Quests to the quetsions tree
}

function getCurrQuest() {
  return gCurrQuest;
}
