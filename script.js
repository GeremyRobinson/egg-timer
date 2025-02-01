let timeLeft;
let timerId = null;

function startTimer(seconds) {
  resetTimer();
  timeLeft = seconds;
  timerId = setInterval(() => {
    timeLeft--;
    updateDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerId);
      playSound();
    }
  }, 1000);
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timer').textContent = 
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function resetTimer() {
  clearInterval(timerId);
  timeLeft = 0;
  updateDisplay();
}

function playSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
  oscillator.connect(audioContext.destination);
  oscillator.start();
  setTimeout(() => oscillator.stop(), 500);
}
