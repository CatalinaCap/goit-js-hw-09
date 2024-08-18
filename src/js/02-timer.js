import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';


const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const mins = document.querySelector('span[data-minutes]');
const secs = document.querySelector('span[data-seconds]');


const addCSS = css =>
  (document.head.appendChild(document.createElement('style')).innerHTML = css);
addCSS(
  '.timer{height:80vh;display:flex;justify-content:center;align-items:center;gap:30px;font-size:50px;}'
);


let interval;
let today;
let timer;


startBtn.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    today = new Date();
    if (selectedDates[0].getTime() - today.getTime() <= 0) {
      selectedDates[0] = today;
      Report.failure('Invalid Date','Please pick a date from the future','OK',()=>window.location.reload())
    } else {
      timer = selectedDates[0].getTime() - today.getTime();
      startBtn.disabled = false;
      clearInterval(interval);
    }
  },
};

flatpickr('#datetime-picker', options);


const remainingTime = timer => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const reDays = Math.floor(timer / day);
  const reHours = Math.floor((timer % day) / hour);
  const reMinutes = Math.floor(((timer % day) % hour) / minute);
  const reSeconds = Math.floor((((timer % day) % hour) % minute) / second);

  return { reDays, reHours, reMinutes, reSeconds };
};


const addLeadingZero = value => {
  if (value < 10) {
    return value.toString().padStart(2, '0');
  } else {
    return value;
  }
};

startBtn.addEventListener('click', () => {
  interval = setInterval(() => {
    const { reDays, reHours, reMinutes, reSeconds } = remainingTime(timer);
    days.innerText = addLeadingZero(reDays);
    hours.innerText = addLeadingZero(reHours);
    mins.innerText = addLeadingZero(reMinutes);
    secs.innerText = addLeadingZero(reSeconds);
    if (
      reDays == 0 &&
      reHours == 0 &&
      reMinutes == 0 &&
      Number(reSeconds) < 10
    ) {
      addCSS('.timer{color:red;}');
    }
    timer -= 1000;
    if (timer <= 0) {
      clearInterval(interval);
    }
  }, 1000);
});