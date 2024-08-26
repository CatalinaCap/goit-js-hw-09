import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        //Fulfill
        resolve({ position, delay });
      } else {
        //Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]').value;
  const stepInput = document.querySelector('input[name="step"]').value;
  const amountInput = document.querySelector('input[name="amount"]').value;
  let delay = Number(delayInput);
  const step = Number(stepInput);
  const amount = Number(amountInput);
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += step;
  }
});
