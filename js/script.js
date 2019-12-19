
// const x = 0;
const c = 1;
const arrField = [
  [c, c, c, c, c],
  [c, c, c, c, c],
  [c, c, c, c, c],
];

const field = document.querySelector('.field');
const cancel = document.querySelector('.btn-danger');
const destroy = document.querySelector('.btn-warning');
const nowFree = document.querySelector('.numberF');
const numberP = document.querySelector('.numberP');
const warningFull = document.querySelector('.warningFull');

function color(val) {
  if (val === c) {
    val = 'free';
  } else {
    val = 'noFree';
  }
  return val;
}

/* v - получаем актуальный NodeList с занятыми / свободными местами
 * нужно посчитать количество свободных мест
 * подсчет процентов
*/
function calcFree(v) {
  let one = '';
  for (let i = 0; i < v.length; i += 1) {
    if (v[i].classList.contains('free')) {
      one += 1;
    }
  }
  const percent = +v.length * 20 / 100;
  // console.log(parseInt(percent) + ' Procent');
  if (percent >= one.length) {
    warningFull.innerHTML = 'Рекомендуем не парковаться';
  } else {
    warningFull.innerHTML = '';
  }
  nowFree.innerHTML = one.length;
  // console.log(one.length + ' Dlina');
}

/*
*  v - 1 (занят) или 0 (свободен)
*  s - идентификатор парковочного места (див)
*  c - NodeList
*  f - number from NodeList (остаток свободных мест)
*/
function changeStatus(v, s, c, f) {
  console.log(f);
  if (v === 1) {
    cancel.classList.remove('disabled');
    destroy.classList.remove('disabled');
    numberP.innerHTML = `<b> ${f}</b>`;
    cancel.onclick = () => {
      numberP.innerHTML = '<b></b>';
      cancel.classList.add('disabled');
      destroy.classList.add('disabled');
    }
    destroy.onclick = () => {
      numberP.innerHTML = '<b></b>';
      s.classList.remove('noFree');
      s.classList.add('free');
      cancel.classList.add('disabled');
      destroy.classList.add('disabled');
      calcFree(c);
    }
  } else {
    numberP.innerHTML = '<b></b>';
    cancel.classList.add('disabled');
    destroy.classList.add('disabled');
    s.classList.add('noFree');
    s.classList.remove('free');
  }
}

function draw() {
  let append = '';
  for (let i = 0; i < arrField.length; i += 1) {
    field.style.gridTemplateColumns = `repeat(${arrField[i].length}, 1fr)`;
    for (let j = 0, len = arrField[i].length; j < len; j += 1) {
      const colorV = `${color(arrField[i][j])}`;
      append = `${append}<div id="btns" class="btns ${colorV}"></div>`;
      field.style.gridTemplateRows = `repeat(${arrField[i][j].length}, 1fr)`;
    }
  }
  field.innerHTML = append;
}

draw();

const bEvents = document.querySelectorAll('#btns');
let status = '';
let identDiv = '';

/* no-loop-func Err */
for (let i = 0, lent = bEvents.length; i < lent; i += 1) {
  nowFree.innerHTML = bEvents.length;
  bEvents[i].innerHTML = `<span class="letter">${[i]}</span>`;
  bEvents[i].addEventListener('click', () => {
    let select = 1;
    if (bEvents[i].classList.contains('free')) {
        select = 0;
    }
    status = select;
    identDiv = bEvents[i];
    changeStatus(status, identDiv, bEvents, [i]);
    calcFree(bEvents);
  });
}
