const toDoForm = document.querySelector('.toDoForm');
const toDoInput = toDoForm.querySelector('input');
const remainToDoArea = document.querySelector('.remainToDo');
const finishToDoArea = document.querySelector('.finishToDo');
const remainToDoList = document.querySelector('.remainToDoList');
const finishToDoList = document.querySelector('.finishToDoList');
let remainIdNumbers = 1;
let finishIdNumbers = 1;

const REMAINTODOS_LS = 'remainToDos';
const FINISHTODOS_LS = 'finishToDos';

let remainToDos = [];
let finishToDos = [];

function remainShow() {
  remainToDoArea.classList.add('showing');
  finishToDoArea.classList.remove('showing');
}
function finishShow() {
  remainToDoArea.classList.remove('showing');
  finishToDoArea.classList.add('showing');
}

function succesToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  remainToDoList.appendChild(li);
  finishToDos.push(remainToDoList);
  localStorage.setItem(FINISHTODOS_LS, JSON.stringify(finishToDos));
}

function reaminDeleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  remainToDoList.removeChild(li);
  const cleanToDos = remainToDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  remainToDos = cleanToDos;
  saveRemainToDos();
}

function finishDeleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishToDoList.removeChild(li);
  const cleanToDos = finishToDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finishToDos = cleanToDos;
  saveFinishToDos();
}

function saveRemainToDos() {
  localStorage.setItem(REMAINTODOS_LS, JSON.stringify(remainToDos));
}

function saveFinishToDos() {
  localStorage.setItem(FINISHTODOS_LS, JSON.stringify(finishToDos));
}

function paintToDo(text) {
  const li = document.createElement('li');
  const sucBtn = document.createElement('button');
  const delBtn = document.createElement('button');
  const span = document.createElement('span');
  const newId = remainIdNumbers;
  remainIdNumbers += 1;
  span.innerText = text;
  sucBtn.innerText = '✔';
  delBtn.innerText = '❌';
  sucBtn.addEventListener('click', succesToDo);
  delBtn.addEventListener('click', reaminDeleteToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(sucBtn);
  li.id = newId;
  remainToDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  remainToDos.push(toDoObj);
  saveRemainToDos();
}

function finishToDo(text) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const span = document.createElement('span');
  const newId = finishIdNumbers;
  finishIdNumbers += 1;
  span.innerText = text;
  delBtn.innerText = '🧺';
  delBtn.addEventListener('click', finishDeleteToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  finishToDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  finishToDos.push(toDoObj);
  saveFinishToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  if (currentValue === '') {
    alert('할 일을 작성해주세요.');
  } else {
    paintToDo(currentValue);
  }
  toDoInput.value = '';
}

function loadToDos() {
  const remainToDos = localStorage.getItem(REMAINTODOS_LS);
  const finishToDos = localStorage.getItem(FINISHTODOS_LS);
  if (remainToDos !== null) {
    // 남은 일정 데이터 확인
    const parsedToDos = JSON.parse(remainToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
  if (finishToDos !== null) {
    // 완료 일정 데이터 확인
    const parsedToDos = JSON.parse(finishToDos);
    parsedToDos.forEach(function (toDo) {
      finishToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();
