const lookupRPS = ['r', 'p', 's'];

const rps = {
  r: {
    beats: 's',
    imgUrl: 'images/rock.png'
  },
  p: {
    beats: 'r',
    imgUrl: 'images/paper.png'
  },
  s: {
    beats: 'p',
    imgUrl: 'images/scissors.png'
  }
};

const beepAudio = new Audio('http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3');
const goAudio = new Audio('http://soundbible.com/mp3/shooting_star-Mike_Koenig-1132888100.mp3');

let scores, results, winner;

const pScoreEl = document.querySelector('#player h2');
const cScoreEl = document.querySelector('#computer h2');
const tScoreEl = document.querySelector('#middle h2');

const pResultEl = document.querySelector('#player div div');
const cResultEl = document.querySelector('#computer div div');

const countdownEl = document.querySelector('#middle div');

document.querySelector('button').addEventListener('click', playHand);

initialize();

function initialize() {
  scores = {
    p: 0,
    c: 0,
    t: 0
  };
  results = {
    p: 'r',
    c: 'r'
  };
  winner = null;
  render();
}

function playHand() {
  doCountdown(go);
}

function doCountdown(cb) {
  let count = 3;
  beepAudio.play();
  countdownEl.textContent = count;
  countdownEl.style.border = '4px solid black';
  let timerId = setInterval(function() {
    count--;
    if (count) {
      beepAudio.play();
      countdownEl.textContent = count;
    } else {
      clearInterval(timerId);
      goAudio.play();
      countdownEl.textContent = '';
      countdownEl.style.border = '4px solid white';
      cb();
    }
  }, 1000);
}

function go() {
  results.p = lookupRPS[getRandomIdx()];
  results.c = lookupRPS[getRandomIdx()];
  winner = getWinner();
  scores[winner]++;
  render();
}

function getWinner() {
  return results.p === results.c ?
    't'
  :
    rps[results.p].beats === results.c ? 'p' : 'c';
}

function render() {
  pScoreEl.textContent = scores.p;
  cScoreEl.textContent = scores.c;
  tScoreEl.textContent = scores.t;
  pResultEl.style.backgroundImage = `url(${rps[results.p].imgUrl})`;
  cResultEl.style.backgroundImage = `url(${rps[results.c].imgUrl})`;
  pResultEl.parentElement.style.border = winner === 'p' ? '10px solid darkgrey' : '10px solid white';
  cResultEl.parentElement.style.border = winner === 'c' ? '10px solid darkgrey' : '10px solid white';
}

function getRandomIdx() {
  return Math.floor(Math.random() * 3);
}