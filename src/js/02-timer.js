import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timer = document.querySelector('.timer');
const dateInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysView = document.querySelector('span[data-days]');
const hoursView = document.querySelector('span[data-hours]');
const minutesView = document.querySelector('span[data-minutes]');
const secondsView = document.querySelector('span[data-seconds]');

startButton.disabled = true;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < new Date().getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
      return;
    } else {
      startButton.disabled = false;
      startButton.addEventListener('click', startCountDown);
      function startCountDown() {
        timerId = setInterval(() => {
          startButton.disabled = true;
          const countDown = new Date(dateInput.value).getTime() - new Date().getTime();
          const setTime = convertMs(countDown);
          if (countDown >= 0) {
            daysView.textContent = addLeadingZero(setTime.days);
            hoursView.textContent = addLeadingZero(setTime.hours);
            minutesView.textContent = addLeadingZero(setTime.minutes);
            secondsView.textContent = addLeadingZero(setTime.seconds);
            if (countDown <= 5900) {
              timer.style.color = '#ff4500';
            }
          } else {
            Notiflix.Notify.info('The time is over!');
            timer.style.color = '#3388ff';
            clearInterval(timerId);
          }
        }, 1000);
      }
    }
  },
};

flatpickr(dateInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
 return value.toString().padStart(2, '0');
}