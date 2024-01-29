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
    answer_1: "<audio>",
    answer_2: "<mp3>",
    answer_3: "<sound>",
    answer_4: "<music>",
    right_answer: "1",
  },
  {
    question: "What is the correct HTML element for playing video files??",
    answer_1: "<media>>",
    answer_2: "<video>>",
    answer_3: "<movie>",
    answer_4: "<cinema>",
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

function init() {
  document.getElementById(`all-questions`).innerHTML = quizJson.length;
  showQuestion();
}

function showQuestion() {
  let question = quizJson[currentQuestion];
  document.getElementById(`question`).innerHTML = question["question"];
  document.getElementById(`answer_1`).innerHTML = question["answer_1"];
  document.getElementById(`answer_2`).innerHTML = question["answer_2"];
  document.getElementById(`answer_3`).innerHTML = question["answer_3"];
  document.getElementById(`answer_4`).innerHTML = question["answer_4"];
}

function answer(selection) {
  let question = quizJson[currentQuestion];
  let lastNumberOfSelection = selection.slice(-1);

  let rightAnswer = `answer_${question.right_answer}`;

  if (lastNumberOfSelection == question["right_answer"]) {
    console.log(`Richtig`);
    document.getElementById(selection).parentNode.classList.add(`bg-success`);
  } else {
    console.log(`Falsch`);
    document.getElementById(selection).parentNode.classList.add(`bg-danger`);
    document.getElementById(rightAnswer).parentNode.classList.add(`bg-success`);
  }
  document.getElementById(`disable-btn`).disabled = false;
}
