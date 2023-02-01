
function getTimeFromSeconds(seconds){
    const data = new Date(seconds * 1000);
   
    return data.toLocaleTimeString('pt-BR', {
        hour12: false,
        timeZone: 'UTC'
    });
}

const clock = document.querySelector('.clock');
const start = document.querySelector('.start');
const pause = document.querySelector('.pause');
const reset = document.querySelector('.reset');
let seconds = 0;
let timer;

function startClock(){
    timer = setInterval(function(){
        seconds++;
        clock.innerHTML = getTimeFromSeconds(seconds);
    }, 1000);
}

start.addEventListener('click', function(event){
    clock.classList.remove('pausado');
    clearInterval(timer);
    startClock();
});

pause.addEventListener('click', function(event){
    clearInterval(timer);
    clock.classList.add('pausado');
});

reset.addEventListener('click', function(event){
    clock.classList.remove('pausado');    
    clearInterval(timer);
    clock.innerHTML = '00:00:00'
});