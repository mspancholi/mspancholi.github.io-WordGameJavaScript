$(document).ready(function() {

var numberOfWins = 0;
var numberOfTries = 10;
var lettersCorrect = [];
var lettersIncorrect = [];
var computerChoices = ["apple", "banana", "pear", "strawberry", "mango", "blueberry", "orange", "grapes"];
var mathRandom = Math.floor(Math.random() * computerChoices.length);
var foundLetter = false;
var countLetterMatch = 0;
var wins = document.getElementById("wins");
var tries = document.getElementById("tries");
var guessedLetters = document.getElementById("guessedLetters");
var wordToguess = document.getElementById("wordToguess");
var audioElement = new Audio("assets/images/baby-laughing-05.mp3");
var audioElement2 = new Audio("assets/images/people136.mp3");



function letterPressedAgain(keyUsed) {
    for (var i = 0; i < lettersIncorrect.length; i++) {
        if (keyUsed == lettersIncorrect[i]) {
            return true;
        }
    }
    for (var i = 0; i < lettersCorrect.length; i++) {
        if (keyUsed == lettersCorrect[i]) {
            return true;
        }
    }

    return false;
}

function underscore(wordlength) {
    console.log("CALING UNDERSCORE");
    wordToguess.textContent = "";
    for (var i=0; i < wordlength; i++) {
        wordToguess.textContent = wordToguess.textContent + "_ "
    }

}

function replaceUnderscore(index, letter) {
    var temp_string = "";

    if (index == 0) {
        temp_string = letter + wordToguess.textContent.substr(index+1);
    }
    else {
        temp_string = wordToguess.textContent.substr(0,(index*2)) + letter + wordToguess.textContent.substr(((index*2)+1));
    }
    
    wordToguess.textContent = temp_string;
    console.log("UPDATE AFTER UNDERSCORE" + "'" + wordToguess.textContent + "'");
}

underscore(computerChoices[mathRandom].length);
wins.textContent = 0;
tries.textContent = 10;
guessedLetters.textContent = "";

document.onkeyup = function (event) {
    console.log("computer's first word " + computerChoices[mathRandom]);
    if (letterPressedAgain(event.key) == false) {

        foundLetter = false;
        for (var i = 0; i < computerChoices[mathRandom].length; i++) {
            if (event.key == computerChoices[mathRandom][i]) {
                foundLetter = true;
                countLetterMatch++;
                replaceUnderscore(i, event.key);
            }
        }
        if (foundLetter == true) {
            lettersCorrect.push(event.key);
        }
        else {
            lettersIncorrect.push(event.key);
            numberOfTries--; 
            tries.textContent = numberOfTries;
            guessedLetters.textContent = lettersIncorrect;
        }
        console.log("this is the array of correct letters " + lettersCorrect);
        console.log("these are incorrect letters " + lettersIncorrect);

        if (numberOfTries == 0) {
            console.log("you lose");
            mathRandom = Math.floor(Math.random() * computerChoices.length);
            numberOfTries = 10;
            tries.textContent = numberOfTries;
            lettersCorrect = [];
            lettersIncorrect = [];
            guessedLetters.textContent = lettersIncorrect;
            countLetterMatch = 0;
            audioElement2.play();
            setTimeout(underscore, 5000, computerChoices[mathRandom].length);
            
        }
        else if (countLetterMatch == computerChoices[mathRandom].length){
            console.log("you won");
            numberOfWins++;
            wins.textContent = numberOfWins;
            mathRandom = Math.floor(Math.random() * computerChoices.length);
            numberOfTries = 10;
            tries.textContent = numberOfTries;
            lettersCorrect = [];
            lettersIncorrect = [];
            guessedLetters.textContent = lettersIncorrect;
            countLetterMatch = 0;
            audioElement.play();
            setTimeout(underscore, 5000, computerChoices[mathRandom].length);
            
        }
    }
}

});
