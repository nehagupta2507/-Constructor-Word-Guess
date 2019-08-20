//Const makes sense here as it documents the reference which is not gonna change
//use const whenever you want some variables not to be modified
// use let if you want the exact opposite of const
// use var, if you want to be compatible with ES5 implementations or if you want module/function level scope.
// Use let only when you need block level scoping, otherwise using let or var would not make any difference.
const inquirer = require("inquirer");
const Word = require("./Word.js");
const wordChoice = ["awkward","bagpipes","croquet","dwarves","fishhook"," gazebo","ivory"," memento","pixel","rogue","swivel","zombie"];
let guessesLeft; 

startGame = () => {
    let dispWord = wordChoice[Math.floor(Math.random() * wordChoice.length)];
    //constructor exported from word.js
    let word = new Word(dispWord);
    guessesLeft = 8;
    displayWord(word, dispWord);
}

function displayWord(guessedWord, correctWord){
    let letterArray = [];
    let guessesArray = [];
    console.log("");
    console.log(guessedWord.createString());
    console.log("");
    inquirer.prompt([
        {
            name: 'letterGuessed',
            message: 'Guess a letter',
            validate: function(value) {
                let valid = (value.length === 1) && ('abcdefghijklmnopqrstuvwxyz'.indexOf(value.charAt(0).toLowerCase()) !== -1);
                return valid || 'Please enter a letter';
                },
        }]).then(function (response) {
            let userGuess = response.letterGuessed.toLowerCase();
            guessedWord.isGuess(userGuess);
            guessedWord.letterArr.forEach(function(res){
            letterArray.push(res.letter);
            guessesArray.push(res.guessed);
        });

        if(letterArray.indexOf(userGuess) > -1){
            console.log("CORRECT!!!");
            console.log("");
        }
        else{
            console.log("Incorrect!");
            guessesLeft--;
            console.log(`You have ${guessesLeft} tries remaining.`)
            console.log("");
        }
        if (guessesArray.indexOf(false) > -1 && guessesLeft > 0) {
            displayWord(guessedWord, correctWord);
        }
        else {
            if (guessesLeft === 0) {
                console.log(`Nay.. You didn't quiet got it! The correct word was ${correctWord}!`);
                console.log("");
            }
            else {
                console.log(`Yayy! You guessed it right! The word was ${correctWord}`);
                console.log("");
            };
            inquirer.prompt([
                {   type: "confirm",
                    name: "restartGame",
                    message: "One more round?",
                    default: true
                }
            ]).then(function(answer){
                if(answer.restartGame){
                    startGame();
                }
                else{
                    process.exit();
                }
            });
        };
    });
};
startGame();