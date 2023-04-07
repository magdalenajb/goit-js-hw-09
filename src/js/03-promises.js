import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const firstDelay = document.querySelector('input[name="delay"]');
const stepDelay = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  let delayValue = Number(firstDelay.value);
  const stepValue = Number(stepDelay.value);
  const amountValue = Number(amountInput.value);
  for (let position = 1; position <= amountValue; position++) {
    createPromise(position, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
        //console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayValue += stepValue;
  }
});
