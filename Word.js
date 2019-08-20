const Letter = require('./Letter.js');
//splitting word into character
let Word = function(word){
    this.letterArr = [];
    for(let i=0; i < word.length; i++){
        if(word.charAt(i) === " "){
            this.letterArr.push(" ");
        }
        else{
            let char = new Letter(word.charAt(i))
            this.letterArr.push(char);
        };
    };
    this.createString = function() {
        let wordDisp = "";
        this.letterArr.forEach((element) => {
           if(element === " "){
               wordDisp += "  ";
           }
           else{
               wordDisp += element.showEncrypted();
           }
        });
        return wordDisp;    
    }
    this.isGuess = function(Guessed) {
        this.letterArr.forEach((element) => {
            if(element.letter !== undefined){
                element.checkGuessed(Guessed);
            }
        });
    };
};
module.exports = Word;
