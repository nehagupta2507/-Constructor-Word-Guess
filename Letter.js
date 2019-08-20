let Letter = function(letter){
    this.letter = letter;
    this.guessed = false;
    this.showEncrypted = function(){
        if(this.letter === " "){
            return " ";
        }
        else if(this.guessed === false){
            return "?";
        }
        else {
            return this.letter;
        } 
    };
    this.checkGuessed = function(guess){
        if(guess === this.letter){
            this.guessed = true;
        }
        return this.guessed;
        
    };
};
module.exports = Letter;