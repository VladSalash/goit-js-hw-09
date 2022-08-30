import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),
  field: document.querySelector('.field'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
}

refs.btnStart.setAttribute('disabled', '');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.btnStart.setAttribute('disabled', '');
    } else {
     refs.btnStart.removeAttribute('disabled', '');
    }

    console.log(selectedDates[0]);
  },
};


const fp = flatpickr(refs.input, options);

// //////////////////////////////////////////////////////////////////////////
class Timer {
  constructor({onTick}) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
  }

   start() {
     if (this.isActive) {
      return;
    }
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const selectDate = fp.selectedDates[0];
      const deltaTime = selectDate - currentTime;
      const time = this.convertMs(deltaTime);
      const timeToSeconds = this.timeOnSeconds(deltaTime)

      this.onTick(time);
      if ( timeToSeconds === 0) {
        clearInterval(this.intervalId);
        this.isActive = false;
        Notiflix.Notify.info('Time is over');
        }

    }, 1000)
  };

timeOnSeconds(time) {
  return Math.floor((time / 1000).toFixed(1));
}

  convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = this.addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
  };

  addLeadingZero(value){
  return String(value).padStart(2, '0');
  };

}

// /////////////////////////////////////////////////////////////////////////////

const timer = new Timer({
  onTick: updateClockFace,
});

refs.btnStart.addEventListener('click', timer.start.bind(timer));

function updateClockFace({days, hours, minutes, seconds}) {
  // refs.timer.textContent = `${days}:${hours}:${minutes}:${seconds}`
  refs.days.textContent = `${days}`
  refs.hours.textContent = `${hours}`
  refs.minutes.textContent = `${minutes}`
  refs.seconds.textContent = `${seconds}`
}


