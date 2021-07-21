"use strict";
import status_code_game from "./logics/logics.js";
const start_game = document.getElementById("game_start");
const next = document.getElementById("game_nextQuestion");
const game_Question = document.getElementById("game_question");
const game_question_section = document.querySelector(".game_questions");
const game_answers = document.getElementById("game_answers");
const game_score = document.getElementById("game_score");
const currentYear = document.getElementById("current_year");

let real_time_score = 0;
// create questions and answer options dynamically
async function question_answers() {
    game_answers.innerHTML = "";
    const question = await status_code_game.generateQuestion();
    const answers = await status_code_game.generateAnswer();
    game_Question.textContent = `${question}`;
    for (let i = 0; i < answers.length; i++) {
        game_answers.appendChild(answers[i]);
    }
}
next.onclick = question_answers;

function onStart_onLoad() {
    next.style.display = "initial";
    game_question_section.style.display = "initial";
    question_answers();
    start_game.style.display = "none";
}
start_game.onclick = onStart_onLoad;
// check the user answer
game_answers.onclick = function(event) {
    const targetEl = event.target;
    const targetValue = event.target.textContent;
    const checkAnswer = status_code_game.check_user_answer(targetValue);
    if (checkAnswer === 1) {
        targetEl.style =
            "background-color: green; color:white; border: 1px green solid; outline: none;";
        real_time_score += checkAnswer;
        game_score.textContent = `${real_time_score}`;
    } else {
        targetEl.style =
            "background-color: red; color:white; border: 1px red solid; outline: none;";
        const correctAnswerEl = document.getElementById("child_div");
        correctAnswerEl.style =
            "background-color: green; color:white; border: 1px green solid; outline: none;";
    }
};
// search status code
const searchInput = document.getElementById("search_status_code");
const searchResult = document.getElementById("search_result");
const searchBtn = document.querySelector(".searchBtn")

function FindAnswer() {
    const userInput = searchInput.value
    const onlyChar = userInput.replaceAll(/\s/g, '')
    let result = ""
    if (onlyChar.length > 2) {
        if (!onlyChar.includes("x")) {
            const toNum = Number(onlyChar)
            result = status_code_game.searchStatusCode(toNum)
            if (result === "undefined" || result === undefined) {
                searchResult.innerText = "could not find result for the response code " + onlyChar
                return
            }
            searchResult.innerText = result

        } else {
            result = status_code_game.searchStatusCode(onlyChar)
            if (result === "undefined" || result === undefined) {
                searchResult.innerText = "could not find result for the response code " + onlyChar
                return
            }
            searchResult.innerText = result
        }
    }
}
searchBtn.onclick = FindAnswer

// set the current year in the footer

function cY() {
    const cDate = new Date()
    const onlyYear = cDate.getFullYear()
    currentYear.innerText = onlyYear
}

cY()