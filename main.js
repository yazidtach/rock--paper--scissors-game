  // Safely load score from localStorage or initialize it
    let score = JSON.parse(localStorage.getItem('score')) || { win: 0, lose: 0, tie: 0 };
    //storing in a function make it easier to call it behin the setItem and removeItem to get updated the score
    updatedScore()
    function updatedScore(){
        document.querySelector('.js-score')
        .innerHTML = `You won: ${score.win}, You lost: ${score.lose}, You tied: ${score.tie}`
    }
    
    function resultElem(result){
        document.querySelector('.js-result')
        .innerHTML = result
    }
     function playerPCMove(playerMove, computerMove){
      let emoji;
      
        document.querySelector('.js-move')
        .innerHTML = `you 
      <img src="rockpaperscisors/${playerMove}-emoji.png" alt="">
      <img src="rockpaperscisors/${computerMove}-emoji.png" alt="">
      computer`
      };

        
    function computerRandomMove() {
      const randomNumber = Math.random();
      if (randomNumber < 1 / 3) return 'rock';
      else if (randomNumber < 2 / 3) return 'paper';
      else return 'scissors';
    }

    // to chekc is the code is runing
    let isAutoPlaying = false;
    //each interval has an id but we declare it inside the function to save the ide from the last use if it was inside the id will be updated each time we run the function
    let intervalId;
    function autoplay(){
      if(!isAutoPlaying){
        intervalId = setInterval(function (){
          const playerMove = computerRandomMove()
          playGame(playerMove)},1000)
          isAutoPlaying = true;document.querySelector('.js-autoPlay').innerHTML = 'Stop playing'
        } else{
          //to stop the id
          clearInterval(intervalId)
          isAutoPlaying = false; 
          document.querySelector('.js-autoPlay').innerHTML = 'Auto play'
        }
      }

      
     
      // autoPlay function using addevent listener 
      document.querySelector('.js-autoPlay').addEventListener('click',()=>{ autoplay() })

      // auto play when typing a 


      
      
      
      const rockButton = document.querySelector('.js-rock-button')
        rockButton.addEventListener('click', ()=> {playGame('rock')})
      const paperButton = document.querySelector('.js-paper-button')
        paperButton.addEventListener('click', ()=> {playGame('paper')})
      
      
      const scissorsButton = document.querySelector('.js-scissors-button')
        scissorsButton.addEventListener('click', ()=> {playGame('scissors')})

        function playGame(playerMove) {
          
          const computerMove = computerRandomMove();
      let result = '';
      
      if (playerMove === computerMove) {
        result = "it's a tie";
        score.tie++;
      } else if (
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')
      ) {
        result = 'you won';
        score.win++;
      } else {
        result = 'you lost';
        score.lose++;
      }
      resultElem(result);
      playerPCMove(playerMove, computerMove);
      // Save updated score to localStorage
      localStorage.setItem('score', JSON.stringify(score));
      updatedScore()
      console.log(`You picked ${playerMove}, computer picked ${computerMove}. ${result}
        `);
    }
    
    document.querySelector('.js-rest-score').addEventListener('click',()=>{
      confirmationReset()
    })

    function confirmationReset(){
       document.querySelector('.js-reset-confirm').innerHTML = ` are u sure u wanna reset score : 
        <button class="yes" >Yes</button>
        <button class="no" >No</button>
        `
    

    document.querySelector('.yes').addEventListener('click',()=>{
      resetScore()
      hideRestMsg()
    })
    
    document.querySelector('.no').addEventListener('click',()=>{
      hideRestMsg()
    })
}
    function resetScore() {
      score = { win: 0, lose: 0, tie: 0 };
      localStorage.removeItem('score');
      updatedScore()
      alert('Score was reset!');
    }
     function hideRestMsg(){
      document.querySelector('.js-reset-confirm').innerHTML = ''
     }
    // playing the game by pressing buttons
  document.body.addEventListener('keydown',(event)=>{
    if(event.key ==='r' || event.key === 'R') playGame('rock')
    else if(event.key ==='p' ) playGame('paper')
    else if(event.key ==='s' ) playGame('scissors')
    else if(event.key === 'a') autoplay()
    else if (event.key === 'Backspace') (confirmationReset())
    })
