function onload() {
  start();
  // questionFooter();
  // renderQuestionAnswer();
}

function start() {
  let CardBody = document.getElementById(`cardBody`);

  CardBody.innerHTML = `
  <div class="startDiv" onclick="startQuiz()">START</div>
  `;
}

let n = 1;
function questionFooter() {
  let questionFooter = document.getElementById(`questionFooter`);
  questionFooter.innerHTML = ``;

  questionFooter.innerHTML += `
    <div class="footer_counter">
    <b>${n}</b> of <b id="array_lengh"></b>questions
    </div>
    <a onclick="checkAnswer()" href="javascript: void(0)" class="btn btn-primary">Next</a>
    `;

  document.getElementById(`array_lengh`).innerHTML = `${quizJson.length}`;
}

let i = 0;

function renderQuestionAnswer() {
  let CardBody = document.getElementById(`cardBody`);
  CardBody.innerHTML = ``;

  CardBody.innerHTML += ` 
        <h5 class="card-title">${quizJson[i].question}</h5>
        <div onclick="saveAnswer('answer_1')" id="a1" class="card mb-2">
                <div id="answerCard" class="card-body">
                ${quizJson[i].answer_1}
                </div>
        </div>
        <div onclick="saveAnswer('answer_2')" id="a2" class="card mb-2">
                <div id="answerCard" class="card-body">
                ${quizJson[i].answer_2}
                </div>
        </div>
        <div onclick="saveAnswer('answer_3')" id="a3" class="card mb-2">
                <div id="answerCard" class="card-body">
                ${quizJson[i].answer_3}
                </div>
        </div>
        <div onclick="saveAnswer('answer_4')" id="a4" class="card mb-2">
                <div id="answerCard" class="card-body">
                ${quizJson[i].answer_4}
                </div>
        </div>
        `;
}

function changeColorOfSelectedDiv(selection) {
  let lastCharSelection = +selection.slice(-1);
  if (lastCharSelection == "1") {
    document.getElementById("a1").classList.add("changeColor");
    removeColor("a2", "a3", "a4");
  }
  if (lastCharSelection == "2") {
    document.getElementById("a2").classList.add("changeColor");
    removeColor("a1", "a3", "a4");
  }
  if (lastCharSelection == "3") {
    document.getElementById("a3").classList.add("changeColor");
    removeColor("a2", "a1", "a4");
  }
  if (lastCharSelection == "4") {
    document.getElementById("a4").classList.add("changeColor");
    removeColor("a2", "a3", "a1");
  }
}

function removeColor(x, y, z) {
  document.getElementById(x).classList.remove("changeColor");
  document.getElementById(y).classList.remove("changeColor");
  document.getElementById(z).classList.remove("changeColor");
}

function checkAnswer() {
  collectionOfQuestionSelections.push(saveSelection[0]);

  if (n == 8 && i == 7) {
    n = 1;
    i = 0;
    document.getElementById(`result`).classList.remove(`d-none`);
    renderResult();
  } else {
    n++;
    i++;
  }

  saveCollectedAnswers();
  loadAnswerCollection();
  onload();
}

function renderResult() {
  let resultDiv = document.getElementById(`result`);
  resultDiv.innerHTML = ``;
  for (let j = 0; j < collectionOfQuestionSelections.length; j++) {
    let finalSelection = collectionOfQuestionSelections[j];
    resultDiv.innerHTML += `
    <button id="btn-close" class="btn btn-primary" onclick="closeResultDiv()">Close</button>
    <div>${finalSelection}</div>
    `;
  }
}

function closeResultDiv() {
  document.getElementById(`result`).classList.add(`d-none`);
}

// --------------------------------------------------------------------------------------------------------------

function saveAnswer(selection) {
  saveSelection.splice(0, 1);
  saveSelection.push(selection);

  let saveSelectedAnswer = JSON.stringify(selection);
  localStorage.setItem("selection", saveSelectedAnswer);
  changeColorOfSelectedDiv(selection);
}

function saveCollectedAnswers() {
  let saveCollection = JSON.stringify(collectionOfQuestionSelections);
  localStorage.setItem("collectionOfQuestionSelections", saveCollection);
}

function loadAnswerCollection() {
  let saveCollection = localStorage.getItem(`collectionOfQuestionSelections`);

  if (saveCollection) {
    collectionOfQuestionSelections = JSON.parse(saveCollection);
  }
}
