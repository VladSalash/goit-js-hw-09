import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
}

refs.form.addEventListener('submit', onFormSubmit)

function onFormSubmit(evt) {
  evt.preventDefault();
  let delay = Number(refs.inputDelay.value);
  let step = Number(refs.inputStep.value);
  let amount = Number(refs.inputAmount.value);

  for (let i = 0; i <= amount; i += 1){
    let position = 1;
    createPromise(position, delay).then(Notify.success).catch(Notify.failure)
    delay += step
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
    resolve(`✅ Fulfilled promise ${position} in ${delay}ms`)
  } else {
    reject(`❌ Rejected promise ${position} in ${delay}ms`)
  }
  }, delay)
  })
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//     Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//     Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//   });