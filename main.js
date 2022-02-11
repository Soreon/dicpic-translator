const frEl = document.getElementById('fr-text');
const dpEl = document.getElementById('dp-text');

const voyels = 'aeiouyAEIOUY';
const sufixes = ['in', 'er', 'él'];

let writing = false;

function frToDp() {
  if (writing) return;
  writing = true;
  const frContent = frEl.value;
  const frArray = frContent.split(/[^/'0-9a-zA-Z\u00C0-\u017F]+/);

  dpEl.value = '';
  frArray.forEach(frWord => {
    if (frWord.length === 0) return;
    if (frWord.length === 1) {
      dpEl.value += frWord;
      return;
    }

    const [firstLetter, ...rest] = frWord;
    if (voyels.includes(firstLetter.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
      dpEl.value += `t${frWord}`;
    } else {
      dpEl.value += `t${rest.join('')}${firstLetter}`;
    }

    dpEl.value += sufixes[Math.floor(Math.random() * sufixes.length)];
    dpEl.value += ' ';
  });
  writing = false;
}

function dpToFr() {
  if (writing) return;
  writing = true;
  const dpContent = dpEl.value;
  const dpArray = dpContent.split(/[^/'0-9a-zA-Z\u00C0-\u017F]+/);

  frEl.value = '';
  dpArray.forEach(dpWord => {
    if (dpWord.length === 0) return;
    if (dpWord.length < 4) {
      frEl.value += dpWord;
      return;
    }

    const [, ...noFirst] = dpWord;
    const noLast = noFirst.slice(0, -2);
    const lastLetter = noLast[noLast.length - 1];

    if (!voyels.includes(lastLetter.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
      frEl.value += `${lastLetter}${noLast.join('').slice(0, -1)}`;
    } else {
      frEl.value += `${noLast.join('')}`;
    }

    frEl.value += ' ';
  });
  writing = false;
}

frEl.addEventListener('input', frToDp);
dpEl.addEventListener('input', dpToFr);
