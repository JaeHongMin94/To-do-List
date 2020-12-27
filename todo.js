const toDoForm = document.querySelector('.toDoForm');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.toDoList');
let idNumbers = 1;

const TODOS_LS = 'toDos';

let toDos = [];

function succesToDo(event) {}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement('li');
  const sucBtn = document.createElement('button');
  const delBtn = document.createElement('button');
  const span = document.createElement('span');
  const newId = idNumbers;
  idNumbers += 1;
  span.innerText = text;
  sucBtn.innerText = '✔';
  delBtn.innerText = '❌';
  sucBtn.addEventListener('click', succesToDo);
  delBtn.addEventListener('click', deleteToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(sucBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = '';
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  } else {
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();
