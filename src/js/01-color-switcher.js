const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const bodyBackgr = document.body;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let changer;

startButton.addEventListener('click', () => {
    changer = setInterval(() => {
        bodyBackgr.style.backgroundColor = getRandomHexColor();
    },
        1000);
    startButton.disabled = true;
    stopButton.disabled = false;
})

stopButton.setAttribute('disabled', true);

stopButton.addEventListener('click', () => {
    clearInterval(changer);
    startButton.disabled = false;
    stopButton.disabled = true;

})