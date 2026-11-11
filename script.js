const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

// справа = { id, text, checked }
let todos = []
let nextId = 1

// зберігаємо список у localStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

// дістаємо список з localStorage
function loadTodos() {
  const saved = localStorage.getItem('todos')
  if (saved) {
    todos = JSON.parse(saved)
    // щоб нові id не збігалися зі старими
    nextId = todos.reduce((max, t) => Math.max(max, Number(t.id)), 0) + 1
  } else {
    todos = [
      { id: 1, text: 'Вивчити HTML', checked: true },
      { id: 2, text: 'Вивчити CSS', checked: true },
      { id: 3, text: 'Вивчити JavaScript', checked: false },
    ]
    nextId = 4
  }
}

function newTodo() {
  const text = prompt('Введіть нову справу')
  if (!text || !text.trim()) return

  const todo = {
    id: nextId++,
    text: text.trim(),
    checked: false,
  }
  todos.push(todo)
  console.log(todos)

  saveTodos()
  render(todos)
  updateCounter()
}

function renderTodo(todo) {
  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.checked ? 'checked' : ''} onchange="checkTodo('${todo.id}')" />
      <label for="${todo.id}"><span class="${todo.checked ? 'text-success text-decoration-line-through' : ''}">${todo.text}</span></label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo('${todo.id}')">delete</button>
    </li>
  `
}

function render(todos) {
  list.innerHTML = todos.map(renderTodo).join('')
}

function updateCounter() {
  itemCountSpan.textContent = todos.length
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length
}

function deleteTodo(id) {
  todos = todos.filter(todo => String(todo.id) !== String(id))
  saveTodos()
  render(todos)
  updateCounter()
}

function checkTodo(id) {
  const todo = todos.find(todo => String(todo.id) === String(id))
  if (todo) {
    todo.checked = !todo.checked
  }
  saveTodos()
  render(todos)
  updateCounter()
}

loadTodos()
render(todos)
updateCounter()
