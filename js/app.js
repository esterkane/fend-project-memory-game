/*
 * Create a list that holds all of cards
 */
const cards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube",
    "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb","fa fa-bomb"]

const cardContainer = document.querySelector(".deck");

let openedCards = [];
let matchedCards = [];

let star = `<li><i class="fa fa-star"></i></li>`;

let initialClick = true;

let endTime = 0;


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*
* Initialize the game
*/
function init() {
    cardList = shuffle(cards);
for (let i = 0; i < cardList.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${cardList[i]}"</i>`;
    cardContainer.appendChild(card);

    // Add click event to each card
    click(card);
    }
}

/*
* Timer
*/
var timer = new Timer();
timer.addEventListener('secondsUpdated', function (e) {
    $('#basicUsage').html(timer.getTimeValues().toString());
});


/*
* Create card click event
*/
function click(card) {
    card.addEventListener("click", function() {

        const currentCard = this;
        const previousCard = openedCards[0];
        
        if (initialClick){
            timer.start();
            initialClick = false;
        }

        if(openedCards.length < 2 ){
        //If there is existing opened card
            if(openedCards.length === 1){
    
            card.classList.add("open", "show", "dismiss");
            openedCards.push(this);
            
            //Compare two opened cards
            compare(currentCard, previousCard);
            } else {
    
            card.classList.add("open", "show", "dismiss");
            openedCards.push(this);
    
            }
        }
    });
}


/*
/ Compare the cards
*/


function compare(currentCard, previousCard) {
if (currentCard.innerHTML === previousCard.innerHTML) {
                    
    currentCard.classList.add("match", "bounce");
    previousCard.classList.add("match", "bounce");

    matchedCards.push(currentCard, previousCard);

    openedCards = [];

    isOver();

} else {

    currentCard.classList.add("nomatch");
    previousCard.classList.add("nomatch");

    setTimeout(function() {
            currentCard.classList.remove("open", "show", "nomatch", "dismiss");
            previousCard.classList.remove("open", "show", "nomatch", "dismiss");
            openedCards = [];
    }, 500);
}
    addMove();
}


/*
* Check if the game is over!
*/

function isOver () {
    if(matchedCards.length === cardList.length){
        gameOver();
    }
}

/*
* Add a move
*/
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

    // Set the raiting
    raiting();
}

/*
* Rating
*/
const starsContainer = document.querySelector(".stars");
function raiting() {
    switch(moves) {
        case 15:
            starsContainer.innerHTML =`${star} ${star}`;
            break;

        case 20:
        starsContainer.innerHTML =`${star}`;
        break;

        case 25:
        starsContainer.innerHTML =``;
        break;
    }
}

/*
* Restart the game
*/
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function() {
    // Delete all cards
    cardContainer.innerHTML ="";

    // Call 'init' to create new cards
    init();
    /*shuffle(cardList);*/

    // Reset any related variables
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML =`${star} ${star} ${star}`;
    timer.stop();
    $('#basicUsage').html("00:00:00");
    initialClick = true;
});

/*
* Game over popup
*/

function gameOverMessage() {

}


/* 
* Start the game for the first time
*/

init();


