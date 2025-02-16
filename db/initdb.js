import sql from "better-sqlite3";
const db = sql("quiz.db");

const DUMMY_QUIZES = [
  {
    title: "JavaScript Quiz",
    image: "",
    creator_id: "1",
  },
];

const DUMMY_QUESTIONS = [
  {
    quiz_id: 1,
    question: "What is the result of `typeof null` in JavaScript?",
    image: "",
  },
  {
    quiz_id: 1,
    question: "Which method is used to add an element to the end of an array?",
    image: "",
  },
  {
    quiz_id: 1,
    question: "What does `NaN` stand for?",
    image: "",
  },
  {
    quiz_id: 1,
    question: "What is the output of `console.log(1 + '1')`?",
    image: "",
  },
  {
    quiz_id: 1,
    question: "Which keyword is used to declare a variable in JavaScript?",
    image: "",
  },
];

const DUMMY_ANSWERS = [
  // Answers for question 1
  {
    question_id: 1,
    answer: "object",
    correct: 1,
  },
  {
    question_id: 1,
    answer: "null",
    correct: 0,
  },
  {
    question_id: 1,
    answer: "undefined",
    correct: 0,
  },
  {
    question_id: 1,
    answer: "string",
    correct: 0,
  },

  // Answers for question 2
  {
    question_id: 2,
    answer: "push()",
    correct: 1,
  },
  {
    question_id: 2,
    answer: "pop()",
    correct: 0,
  },
  {
    question_id: 2,
    answer: "shift()",
    correct: 0,
  },
  {
    question_id: 2,
    answer: "unshift()",
    correct: 0,
  },

  // Answers for question 3
  {
    question_id: 3,
    answer: "Not a Number",
    correct: 1,
  },
  {
    question_id: 3,
    answer: "No applicable Number",
    correct: 0,
  },
  {
    question_id: 3,
    answer: "Null and None",
    correct: 0,
  },
  {
    question_id: 3,
    answer: "New Array Notation",
    correct: 0,
  },

  // Answers for question 4
  {
    question_id: 4,
    answer: "11",
    correct: 1,
  },
  {
    question_id: 4,
    answer: "2",
    correct: 0,
  },
  {
    question_id: 4,
    answer: "undefined",
    correct: 0,
  },
  {
    question_id: 4,
    answer: "NaN",
    correct: 0,
  },

  // Answers for question 5
  {
    question_id: 5,
    answer: "var",
    correct: 0,
  },
  {
    question_id: 5,
    answer: "let",
    correct: 0,
  },
  {
    question_id: 5,
    answer: "const",
    correct: 0,
  },
  {
    question_id: 5,
    answer: "All of the above",
    correct: 1,
  },
];

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS quizzes (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       title TEXT NOT NULL,
       image TEXT NOT NULL,
       creator_id TEXT NOT NULL
   )
`
).run();

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS questions (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       quiz_id INTEGER NOT NULL,
       question TEXT NOT NULL,
       image TEXT,
       FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
   )
`
).run();

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS answers (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       question_id INTEGER NOT NULL,
       answer TEXT NOT NULL,
       correct INTEGER DEFAULT 0,
       FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
   )
`
).run();

function initData() {
  // Insert quizzes
  const insertQuiz = db.prepare(`
      INSERT INTO quizzes (creator_id, title, image) VALUES (
         @creator_id,
         @title,
         @image
      )
   `);

  for (const quiz of DUMMY_QUIZES) {
    insertQuiz.run(quiz);
  }

  // Insert questions
  const insertQuestion = db.prepare(`
      INSERT INTO questions (quiz_id, question, image) VALUES (
         @quiz_id,
         @question,
         @image
      )
   `);

  for (const question of DUMMY_QUESTIONS) {
    insertQuestion.run(question);
  }

  // Insert answers
  const insertAnswer = db.prepare(`
      INSERT INTO answers (question_id, answer, correct) VALUES (
         @question_id,
         @answer,
         @correct
      )
   `);

  for (const answer of DUMMY_ANSWERS) {
    insertAnswer.run(answer);
  }
}

initData();

// Close the database connection
db.close();
