document.addEventListener("DOMContentLoaded", () => {
    // Variables
    let secretWord = "";
    let updatedSecret;
    let totalAttempts;
    let running = true;
    let maxTime = 60;
    
    // DOM Elements
    const displayHint1 = document.getElementById("hint1");
    const displayHint2 = document.getElementById("hint2");
    const status = document.querySelector("#d-progress");
    const displayAttempts = document.getElementById("t-attempts");
    const timing = document.getElementById("digital-clock");

    // Game initialization
    gameResources(selectWord, hint);
    dash_notation();

    // Functions

    // Game setup
    function gameResources(callback, callback2) {
        const fruits = [
            'mango', 'pinneaple', 'orange', "avocado","watermelon","banana","strawberrie","grape",
            'lemons','papaya'
        ];
        const animal = [
            'human', 'gorilla', 'lion', "bird", "owl", "snake","horse","cat","cheetah","turtle",
            'tortoise','leopard','rabbit','donkey','bear','pig','cow','lizard','sheep','chameleon',
            'giraffe','wolf','jellyfish'
        ];
        const others = [
            'water', 'food', 'basket', "knife", "bottle","jellycan"
        ];
        const utensils=[
            "fork","spoon","plate","dish","sourcepan","cupboard",
        ];
        const electronicDevice=[
            "laptop","television","radio","telephone","walk tokie","printer","mouse","Keyboard","router","scanner","headphones",
            "ipod"
        ];
        const combination = [...fruits, ...animal, ...others, ...electronicDevice, ...utensils];
        const randomIndex = Math.floor(Math.random() * combination.length);
        
        callback(combination[randomIndex]); 
        callback2(fruits, animal, others,electronicDevice,utensils);  
    }

    // Display hints based on word category
    function hint(fruits, animal, others,electronicDevice,utensils) {
        const categories = { fruits, animal, others,electronicDevice,utensils};

        for (const category in categories) {
            if (categories[category].includes(secretWord)) {
                displayHint1.innerHTML = `Word is in ${category} class`;
                break;
            }
        }
    }

    // Select a random word and set up initial attempts
    function selectWord(word) {
        secretWord = word;
        totalAttempts = secretWord.length * 2;
        displayAttempts.innerHTML = `${totalAttempts}`;
    }
    

    // Initialize secret word with dashes
    function dash_notation() {
        updatedSecret = secretWord.split("").fill('-');
        status.innerHTML = updatedSecret.join("");
        displayHint2.innerHTML = `${secretWord[0]}-${secretWord[2]}${updatedSecret.slice(3).join("")}`;
    }

    // Handle user's guess
    function guess(letter) {
        let n = 0;
        const chars = secretWord.split("");
        const guessed = letter;
        while (n !== chars.length && running) {
            if (chars[n] === guessed) {
                updatedSecret[n] = guessed;           
                guess_status();         
            }           
            n++;
        }

        if (!chars.includes(guessed)) {
            settings();
        }

        if (updatedSecret.join("") === secretWord) {
            changeBackgroundColor();
            document.querySelector('.ifwon').style.display = "block";
            document.getElementById("out-time").textContent= "Congratulations! You saved the man!";
            document.getElementById('reveal').innerHTML=secretWord;
            document.getElementById('control').style.display="none";
            document.querySelector("footer").style.display="none"
            running = false;
        }
    }

    // Update status display with guessed letters
    function guess_status() {
        status.innerHTML = updatedSecret.join("");
    }

    // Timer function
    function timer() {
        if (maxTime !== 0 && running) {
            maxTime--;
            timing.innerHTML = `00:${maxTime}`;
        } else if (maxTime === 0 && running) {
            handleGameLoss("Time out! You lost the game.");
            document.getElementById('reveal').innerHTML=secretWord;
        }
    }
    setInterval(timer,1000);


    // Change background color
    function changeBackgroundColor() {
        document.body.style.backgroundColor = "rgba(0, 128, 0, 0.548)";
    }   

    // Handle game loss
    function handleGameLoss(message) {
        changeBackgroundColor();
        document.querySelector('.ifwon').style.display = "block";
        document.getElementById("out-time").textContent = message;
        document.querySelector(".images").innerHTML = ` `;
        document.getElementById('control').style.display="none";
        maxTime = 0;
        timing.innerHTML = `00:${maxTime}`;
        running = false;
        document.querySelector("footer").style.display="none"
    }

    // Game settings - update attempts and check for game over
    function settings() {
        totalAttempts--;
        if (totalAttempts === 0) {
            handleGameLoss("Out of attempts! You lost.");
            document.getElementById('reveal').innerHTML=secretWord;
        }
        displayAttempts.innerHTML = `${totalAttempts}`;
    }
    // initialize vitual keyboard

    // variables
    const includeLetter="abcdefghijklmnopqrstuvwxyz".split('');
    function initalizeKeyboard(){
        const keyboard=document.querySelector(".keyboard");
        includeLetter.forEach(letter=>{
            const button=document.createElement("button");
            button.textContent=letter;
            button.addEventListener('click',()=>{
                updateStatus(letter)
            })
            keyboard.appendChild(button);
        })
    }
    function updateStatus(letter){
        if (running) {
            guess(letter);
        }
    }
    initalizeKeyboard()

    // re run guess  if not happy with the word
    
    // Game reset
    function reset(){
        document.getElementById("reset").onclick = () => {
            maxTime = 60;
            document.getElementById('control').style.display="flex";
            document.querySelector(".images").innerHTML = `<img src="../media/images/readyHang.png">`;
            gameResources(selectWord, hint);
            document.getElementById("exclude").innerHTML = `None`;
            dash_notation();
            guess();
            document.body.style.backgroundColor = "rgba(0, 128, 0, 0.849)";
            document.querySelector('.ifwon').style.display="none"
            document.querySelector("#life").innerHTML = `SAVE ME`;
            running = true;
            document.querySelector("footer").style.display="block"
        }
    }
    reset();
    
});
