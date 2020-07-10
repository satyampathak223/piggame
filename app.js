/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var dice, scores, roundscore, activeplayer, domdice, flag;
function init() {
   scores = [0, 0];
   activeplayer = 0;
   roundscore = 0;
   flag = true;
   //Hide dice at the begining of the game
   // console.log(dice);
   domdice = document.querySelector('.dice');
   domdice.style.display = 'none';
   //Make all  scors 0 at the beginnning of the game;
   document.querySelector('#score-0').textContent = '0';
   document.querySelector('#current-0').textContent = '0';
   document.querySelector('#score-1').textContent = '0';
   document.querySelector('#current-1').textContent = '0';
   document.querySelector('#name-0').textContent = 'Player 1';
   document.querySelector('#name-1').textContent = 'Player 2';
   document.querySelector('.player-0-panel').classList.remove('winner');
   document.querySelector('.player-1-panel').classList.remove('winner');
   document.querySelector('.player-0-panel').classList.remove('active');
   document.querySelector('.player-1-panel').classList.remove('active');
   document.querySelector('.player-0-panel').classList.add('active');
}
init();

//Adding event listener on Roll dice(.btn-roll class)
document.querySelector('.btn-roll').addEventListener('click', function () {
   if (flag) {
      //Random Number
      dice = Math.floor(Math.random() * 6) + 1;

      //Display result
      domdice.style.display = 'block';
      domdice.src = 'dice-' + dice + '.png';
      if (dice !== 1) {
         roundscore += dice;
         //Dislay round score of active player
         document.querySelector('#current-' + activeplayer).textContent = roundscore;
      }
      else {
         changeplayer();
      }
   }
});

//Hold button functionality
document.querySelector('.btn-hold').addEventListener('click', function () {
   if (flag) {
      //Add roundscore to active player total score
      scores[activeplayer] += roundscore;
      //Update th UI
      document.querySelector('#score-' + activeplayer).textContent = scores[activeplayer];
      //Check if the player won the game
      if (scores[activeplayer] >= 100) {
         document.querySelector('#name-' + activeplayer).textContent = 'WINNER!';
         //After winning the game hide the dice and remove the active class frome current player.
         domdice.style.display = 'none';
         document.querySelector('.player-' + activeplayer + '-panel').classList.add('winner');
         document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');
         flag = false;
      }
      else {
         //Change the active player
         changeplayer();
      }
   }
});

function changeplayer() {
   activeplayer === 0 ? activeplayer = 1 : activeplayer = 0;
   roundscore = 0;
   //Make current score 0 at each turn
   document.querySelector('#current-0').textContent = '0';
   document.querySelector('#current-1').textContent = '0';
   //Toggle active class
   document.querySelector('.player-0-panel').classList.toggle('active');
   document.querySelector('.player-1-panel').classList.toggle('active');
   domdice.style.display = 'none';
}

//Implementing the new game functionality
document.querySelector('.btn-new').addEventListener('click', init);
