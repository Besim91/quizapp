let quizJson = [
  {
    question: "What is the name of the inventor of JavaScript?",
    answer_1: "Bruce Lee",
    answer_2: "Steve Jobs",
    answer_3: "Brendan Eich",
    answer_4: "Konrad Zuse",
    right_answer: "3",
  },
  {
    question: "What is true?",
    answer_1: "0 == undefined",
    answer_2: "0 == null",
    answer_3: "0 >= undefined",
    answer_4: "0 >= null",
    right_answer: "4",
  },
  {
    question: "What was JavaScript's maiden name shortly after she was born?",
    answer_1: "Mocha",
    answer_2: "Micha",
    answer_3: "Mecha",
    answer_4: "Mucha",
    right_answer: "1",
  },
  {
    question:
      "Who sets the technical specifications and guidelines for the World Wide Web?",
    answer_1: "Microsoft",
    answer_2: "Mozilla",
    answer_3: "Google",
    answer_4: "World Wide Web Consortium",
    right_answer: "4",
  },
  {
    question: "What is the correct HTML element for playing audio files?",
    answer_1: "audio",
    answer_2: "mp3",
    answer_3: "sound",
    answer_4: "music",
    right_answer: "1",
  },
  {
    question: "What is the correct HTML element for playing video files??",
    answer_1: "media",
    answer_2: "video",
    answer_3: "movie",
    answer_4: "cinema",
    right_answer: "2",
  },
  {
    question: "Which property is used to change the font of an element?",
    answer_1: "font-style",
    answer_3: "font-family",
    answer_2: "font-weight",
    answer_4: "font-fat",
    right_answer: "3",
  },
  {
    question: "What is the default value of the position property?",
    answer_1: "static",
    answer_2: "absolute",
    answer_3: "relative",
    answer_4: "fixed",
    right_answer: "1",
  },
];

let currentQuestion = 0;
let rightAnswerCounter = 0;

function init() {
  document.getElementById(`all-questions`).innerHTML = quizJson.length;
  showQuestion();
}

function showQuestion() {
  if (currentQuestion >= quizJson.length) {
    document.getElementById(`card`).style = "display: none;";
    document.getElementById(`end-container`).style = "";
  } else {
    let question = quizJson[currentQuestion];
    document.getElementById(`current-question`).innerHTML = currentQuestion + 1;
    document.getElementById(`question`).innerHTML = question["question"];
    document.getElementById(`answer_1`).innerHTML = question["answer_1"];
    document.getElementById(`answer_2`).innerHTML = question["answer_2"];
    document.getElementById(`answer_3`).innerHTML = question["answer_3"];
    document.getElementById(`answer_4`).innerHTML = question["answer_4"];
  }
  resetProgressBar();
}

function answer(selection) {
  let question = quizJson[currentQuestion];
  let lastNumberOfSelection = selection.slice(-1);
  let rightAnswer = `answer_${question.right_answer}`;

  if (lastNumberOfSelection == question["right_answer"]) {
    document.getElementById(selection).parentNode.classList.add(`bg-success`);
    document.getElementById(`audioPowerUp`).play();
    rightAnswerCounter++;
  } else {
    document.getElementById(selection).parentNode.classList.add(`bg-danger`);
    document.getElementById(rightAnswer).parentNode.classList.add(`bg-success`);
    document.getElementById(`audioGameOver`).play();
  }
  document.getElementById(`disable-btn`).disabled = false;
}

function nextQuestion() {
  document.getElementById(`disable-btn`).disabled = true;
  currentQuestion++;
  showQuestion();
  resetAnswerButton();
  showScore();
}

function resetProgressBar() {
  let percent = ((currentQuestion + 1) / quizJson.length) * 100;
  document.getElementById("progress-bar").style = `width: ${percent}%;`;
}

function resetAnswerButton() {
  document.getElementById("answer_1").parentNode.classList.remove(`bg-success`);
  document.getElementById("answer_1").parentNode.classList.remove(`bg-danger`);
  document.getElementById("answer_2").parentNode.classList.remove(`bg-success`);
  document.getElementById("answer_2").parentNode.classList.remove(`bg-danger`);
  document.getElementById("answer_3").parentNode.classList.remove(`bg-success`);
  document.getElementById("answer_3").parentNode.classList.remove(`bg-danger`);
  document.getElementById("answer_4").parentNode.classList.remove(`bg-success`);
  document.getElementById("answer_4").parentNode.classList.remove(`bg-danger`);
}

function showScore() {
  let wrongAnswers = quizJson.length - rightAnswerCounter;
  let totalScorePercent = (rightAnswerCounter * 100) / quizJson.length;

  document.getElementById("score").innerHTML = `
  <div class="right">Right answers: ${rightAnswerCounter}</div>
  <div class="mb-4">Wrong answers: ${wrongAnswers}</div>
  <h2 class="mb-2">Total Score</h2>
  <div class="scoreRating">${totalScorePercent}</div>
  <button onclick="restart()" type="button" class="btn btn-outline-success restart mt-4">Restart</button>`;
  greetings(totalScorePercent);
}

function greetings(totalScorePercent) {
  if (currentQuestion >= 8) {
    if (totalScorePercent >= 70) {
      document.getElementById(
        `greetings`
      ).innerHTML = `Congratulations, you did it!`;
      document.getElementById(`audioWin`).play();
      document.getElementById(`greetings`).classList.add(`text-success`);
    } else {
      document.getElementById(`greetings`).innerHTML = `You Lose!`;
      document.getElementById(`greetings`).classList.add(`text-danger`);
      document.getElementById(`audioLaugh`).play();
    }
  }
}

function restart() {
  document.getElementById(`end-container`).style = "display: none;";
  document.getElementById(`card`).style = "";
  currentQuestion = 0;
  rightAnswerCounter = 0;
  init();
}
