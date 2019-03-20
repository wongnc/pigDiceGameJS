/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//declaring variables
var scores , roundScore, activePlayer, gamePlaying;

//sets game to initial state of 0 everything
function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    //hiding the dice when game first starts
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    //set all score values to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //reset name of players
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    //remove winner and active class from both players
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

};

init();

//change to next player function
function nextPlayer(){
    //change to next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        //change current score of player to 0
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        //add css class to current player
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
};  

//dice button function
var lastDice;
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //1. generate random number
        var dice1 = Math.floor(Math.random()*6) +1;
        var dice2 = Math.floor(Math.random()*6) +1;

        //2. display dice image result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block'; 
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        
        //3. update round score IF the rolled number is not a 1
        if (dice1 !== 1 && dice2 !== 1) {
            //add score and display
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //change to next player
            nextPlayer();
        } 

        //3. update round score IF the rolled number is not a 1
        /*if(dice === 6 && lastDice === 6){
            //player loses score if rolls two 6s in a row
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice !== 1) {
            //add score and display
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //change to next player
            nextPlayer();
        } 
        
        lastDice = dice;
        */
    }
});

//hold button function
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //add current score to global score
        scores[activePlayer] += roundScore;
        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        //allows players to define winning score
        var input = document.querySelector('.final-score').value;
        var winningScore;
        //undefined, 0, null, or "" are COERCED to false
        //Anything else is COERCED to true
        if(input){
            winningScore = input;
        } else{
            winningScore = 100;
        }
        
        //check if player won the game
        if(scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('winner');
            //changes gamestate to false
            gamePlaying = false;
        }else{
            //change to next player
            nextPlayer();
        }  
    }
});

//new button click function
document.querySelector('.btn-new').addEventListener('click', init);




























