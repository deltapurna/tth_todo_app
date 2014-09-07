// Problem: User interaction doesn't provide desired results.
// Solution: Add interactivity so the user can manage daily tasks.

var taskInput = document.getElementById('new-task'); // new-task
var addButton = document.getElementsByTagName('button')[0]; // first button
var incompleteTasksHolder = document.getElementById('incomplete-tasks'); // incomplete-tasks
var completedTasksHolder = document.getElementById('completed-tasks'); // completed-tasks

var createNewTask = function(taskName) {
  // Create a new list item with taskName
  var task = document.createElement('li');

  // task children nodes
  var checkboxInput = document.createElement('input'); // checkbox
  checkboxInput.type = 'checkbox';

  var label = document.createElement('label');
  label.innerText = taskName;

  var textInput = document.createElement('input'); // text
  textInput.type = 'text';

  var editButton = document.createElement('button');
  editButton.className = 'edit';
  editButton.innerText = 'Edit';

  var deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  deleteButton.innerText = 'Delete';

  // Each elements needs attributes

  // Each elements needs appended
  task.appendChild(checkboxInput);
  task.appendChild(label);
  task.appendChild(textInput);
  task.appendChild(editButton);
  task.appendChild(deleteButton);

  return task;
}
// Add a new task
var addTask = function() {
  if (taskInput.value.trim() == '') {
    alert('Task name is compulsory');
    return;
  }
  console.log('Add task...');
  // Create a new list item with the text from #new-task:
  var task = createNewTask(taskInput.value);

  // Append to incomplete task
  incompleteTasksHolder.appendChild(task);

  // Bind to event handler
  bindTaskEvents(task, taskCompleted);

  taskInput.value = '';
};

// Edit an existing task
var editTask = function() {
  console.log('Edit task...');

  var task = this.parentNode;
  var textInput = task.querySelector('input[type=text]');
  var label = task.querySelector('label');

  var isEditMode = task.classList.contains('editMode');

  if (isEditMode) {
    // Switch from .editMode
    this.innerText = 'Edit';
    label.innerText = textInput.value;
  } else {
    // Switch to .editMode
    this.innerText = 'Save';
    textInput.value = label.innerText;
  }
  task.classList.toggle('editMode');
};

// Delete an existing task
var deleteTask = function() {
  console.log('Delete task...');
  var task = this.parentNode;
  var taskList = task.parentNode;
  // Remove the parent list item from the ul
  taskList.removeChild(task);
};

// Mark a task as complete
var taskCompleted = function() {
  console.log('Task complete...');
  // Append the task list item to the #completed-tasks
  var task = this.parentNode;
  completedTasksHolder.appendChild(task);

  // bind the incomplete task handler
  bindTaskEvents(task, taskIncomplete);
};

// Mark a task as incomplete
var taskIncomplete = function() {
  console.log('Task incomplete...');
  // Append the task list item to the #incomplete-tasks
  var task = this.parentNode;
  incompleteTasksHolder.appendChild(task);

  // bind the completed task handler
  bindTaskEvents(task, taskCompleted);
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log('Bind task event...');
    // select it's children
  var checkboxInput = taskListItem.querySelector('input[type=checkbox]');
  var editButton = taskListItem.querySelector('button.edit');
  var deleteButton = taskListItem.querySelector('button.delete');
    // bind editTask to edit button
  editButton.addEventListener('click', editTask);
    // bind deleteTask to delete button
  deleteButton.addEventListener('click', deleteTask);
    // bind checkBoxEventHandler to checkbox
  checkboxInput.onchange = checkBoxEventHandler;
};

var ajaxRequest = function(method, url, params){
  console.log('make ajax request');
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState === 4){
      console.log(httpRequest.status);
      if(httpRequest.status === 200) {
        response = JSON.parse(httpRequest.responseText);
        console.log(response);
        renderTasks(response);
      } else {
        console.log(httpRequest.status);
      }
    }
  };
  httpRequest.open(method, url, true);
  httpRequest.send(params);
}

var renderTasks = function(response) {
  console.log('Processing...');
  for (var i = 0; i < response.length; i++) {
    var taskObj = response[i];
    var taskName = taskObj.name;
    var isCompleted = taskObj.completed_at !== null;
    var task = createNewTask(taskName);
    if(isCompleted){
      completedTasksHolder.appendChild(task);
      bindTaskEvents(task, taskIncomplete);
    } else {
      incompleteTasksHolder.appendChild(task);
      bindTaskEvents(task, taskCompleted);
    }
  }
}

// Set click handler to addTask function
addButton.addEventListener('click', addTask);

ajaxRequest('GET', 'http://localhost:3000/tasks', null);
ajaxRequest('GET', 'http://localhost:3000/tasks?completed=true');
// Cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  // for each list item
    // bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

// Cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  // for each list item
    // bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
