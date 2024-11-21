const questions = [
	{ question: "How old are you?", answer: "I'm am 22 years old." },
	{ question: "Where are you from?", answer: "I'm from São Paulo, Brazil." },
	{ question: "What are your favorite subjects?", answer: "I could spend hours talking about anthropology and science." },
	{ question: "What's your favorite music genre?", answer: "I really like bass garage and drum & bass, but sometimes I listen to indie music. You can check my spotify on the desktop." },
	{ question: "What's your type of guy?", answer: "Oh, you're really interested on that. ˙𐃷˙" },
	{ question: "What's your favorite food?", answer: "My favorite food is sushi." },
	{ question: "What's your favorite drink?", answer: "Well... I really enjoy Redbull, but natural juices in general are amazing." },
	{ question: "What's your favorite book?", answer: "Parallel Worlds by Michio Kaku, MANAIC by Benjamin Labatut and Cosmos by Carl Sagan." },
	{ question: "What's your favorite TV series?", answer: "Dark, Hannibal and Breaking Bad. ദ്ദി´▽`)" },
	{ question: "What's your biggest dream?", answer: "Make my mother truly happy one day." },
	{ question: "A curiosity about you?", answer: "I learned graphic design when I was 13, during my free time on the internet, it was a way for me to express myself creatively, and I carry that with me to this day. You can see some of my work in my portfolio on behance (raikali) " },
];

const label = "type ask and the number. Ex: ask 1";

module.exports = {
	name: "ask",
	description: "List of questions you can ask in the terminal",
	exec: (terminalRef, input) => {
		if (input.trim() === "ask") {
			terminalRef.current.writeToTerminal(label, false, true);
			for (let index = 0; index < questions.length; index++) {
				terminalRef.current.writeToTerminal(`${index + 1}.${questions[index].question}`, false, false);
			}

			terminalRef.current.writeToTerminal(null, false, true);
		} else {
			const index = Number(input.split(" ")[1]);
			if (index - 1 < questions.length && index >= 1) {
				terminalRef.current.writeToTerminal(questions[index - 1].answer, false, true);
			} else {
				terminalRef.current.writeToTerminal("This question number doesn't exist.", false, true);
			}
		}
	},
};
