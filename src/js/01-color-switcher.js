function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  body: document.querySelector('body'),
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
};
console.log(refs.buttonStop)

let timerId = null;

const NOTIFICATION_DELAY = 1000;


refs.buttonStart.addEventListener("click", () => {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
    refs.buttonStart.disabled = true;
    refs.buttonStop.disabled = false;
}, NOTIFICATION_DELAY);
});


refs.buttonStop.addEventListener("click", () => {
  clearInterval(timerId);
  refs.buttonStart.disabled = false;
    refs.buttonStop.disabled = true;
});