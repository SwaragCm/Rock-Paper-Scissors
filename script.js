let randomNum=Math.random();
let result='';
let aiMove='';

let score= JSON.parse(localStorage.getItem('score'));

if(score===null){
    score={
        Wins:0,
        Losses:0,
        Ties:0
    };
}

updateScoreElem();

function aiControl() {
    randomNum=Math.random();
     let computerMove='';
     result='';
    if (randomNum>=0 && randomNum<1/3){
     computerMove='Rock';
    }
    else if(randomNum>=1/3 && randomNum<2/3){
     computerMove='Paper';
    }
    else if(randomNum>=2/3 && randomNum<1){
     computerMove='Scissors';
    }
    return computerMove ;
    
}
let isAutoPlay=false;
let intervalId;
function autoPlay() {

    if (!isAutoPlay){
        intervalId=setInterval( () => {
            const playerMove=aiControl();
            playGame(playerMove);
        },1000);
        isAutoPlay=true;

    }else{
        clearInterval(intervalId);
        isAutoPlay=false;
    }
   
}

document.querySelector('.js-rock-btn').addEventListener('click',()=>{
    playGame('Rock');
});
document.querySelector('.js-paper-btn').addEventListener('click',()=>{
    playGame('Paper');
});
document.querySelector('.js-scissors-btn').addEventListener('click',()=>{
    playGame('Scissors');
});


document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r'){
        playGame('Rock');
    }else if(event.key==='p'){
        playGame('Paper');
    }else if(event.key==='s'){
        playGame('Scissors')
    }
})

function playGame(playerMove) {
        aiMove= aiControl();    
               
        if (playerMove==="Scissors"){
            if(aiMove==='Rock'){
            result='You Loose';
            }
            else if(aiMove==='Paper'){
            result='You Win';
            }
            else if(aiMove==='Scissors'){
            result='Tie';
            }       
        }

        else if (playerMove==="Paper"){
            if (aiMove==='Rock'){
                result='You Win';
            }
            else if(aiMove==='Paper'){
                result='Tie';
            }
            else if(aiMove==='Scissors'){
                result='You Loose';
            }
        }        
    
        else if(playerMove==="Rock"){
                if (aiMove==='Rock'){
                    result='Tie';
                }
                else if(aiMove==='Paper'){
                result='You Loose';
                }
                else if(aiMove==='Scissors'){
                result='You Win';
                }     
        }
        
        
        if (result=='You Win'){
            score.Wins+=1;
        }else if(result=='You Loose'){
            score.Losses+=1;
        }else if(result=='Tie'){
            score.Ties+=1;
        }

        localStorage.setItem('score',JSON.stringify(score));

        updateScoreElem();

        document.querySelector('.js-moves').innerHTML= `You
        <img src="./imgs/${playerMove}.png" alt="" class="move-icon">
        <img src="./imgs/${aiMove}.png" alt="" class="move-icon">
        Computer`;

        document.querySelector('.js-result').innerHTML=result;

}

function updateScoreElem() {
    document.querySelector('.js-score')
        .innerHTML= `Wins:${score.Wins} , Losses:${score.Losses} , Ties:${score.Ties}`;
}