"use strict";
import codes_definitions from "./codes_definitions.js";
const status_code_game = {
	correctAnswer: "",
	indexOfCorrectAnswer: 0,
	generateQuestion: function () {
		const randomNum = Math.round(Math.random() * 70);
		console.log("random: ", randomNum);
		const question = `What does the HTTP Status Code ${codes_definitions.codes[randomNum]} mean?`;
		this.correctAnswer = codes_definitions.definitions[randomNum];
		this.indexOfCorrectAnswer = randomNum;
		return question;
	},
	generateAnswer: function () {
		const toReturn = [];
		// create an array of mixed and different number
		const arrayIndex = [];
		while (arrayIndex.length < 4) {
			const randomNum = Math.round(Math.random() * 70);
			if (!arrayIndex.includes(this.indexOfCorrectAnswer)) {
				arrayIndex.push(this.indexOfCorrectAnswer);
				continue;
			}
			if (
				!arrayIndex.includes(randomNum) &&
				randomNum !== this.indexOfCorrectAnswer
			) {
				arrayIndex.push(randomNum);
			}
		}
		// reorder the previous order of the array so that the correct answer is not always at the same place
		arrayIndex.sort();
		for (let i = 0; i < arrayIndex.length; i++) {
			const divEl = document.createElement("div");
			divEl.textContent = `${codes_definitions.definitions[arrayIndex[i]]}`;
			if (arrayIndex[i] === this.indexOfCorrectAnswer) {
				divEl.id = "child_div";
			}
			toReturn.push(divEl);
		}
		return toReturn;
	},
	check_user_answer: function (user_answer) {
		if (user_answer === this.correctAnswer) {
			return 1;
		}
	},
};

export default status_code_game;
