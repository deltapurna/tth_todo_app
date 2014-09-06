// Problem: User interaction doesn't provide desired results.
// Solution: Add interactivity so the user can manage daily tasks.

var taskInput = document.getElementById('new-task'); // new-task
var addButton = document.getElementsByTagName('button')[0]; // first button
var incompleteTasksHolder = document.getElementById('incomplete-tasks'); // incomplete-tasks
var completedTasksHolder = document.getElementById('completed-tasks'); // completed-tasks

// Add a new task
var addTask = function() {
  console.log('Add task...');
  // When the button is pressed
  // Create a new list item with the text from #new-task:
    // input ( checkbox )
    // label
    // input ( text )
    // button.edit
    // button.delete
    // Each elements, needs attributes and appended
};

// Edit an existing task
var editTask = function() {
  console.log('Edit task...');
  // When the edit button is pressed
    // if the class of the parent is .editMode
      // Switch from .editMode
      // label text become the input's value
    // else
      // Switch to .editMode
      // input value become the label's text

    // Toggle .editMode
};

// Delete an existing task
var deleteTask = function() {
  console.log('Delete task...');
  // When the delete button is pressed
    // Remove the parent list item from the ul
};

// Mark a task as complete
var taskCompleted = function() {
  console.log('Task complete...');
  // When the checkbox is checked
    // Append the task list item to the #completed-tasks
};

// Mark a task as incomplete
var taskIncomplete = function() {
  console.log('Task incomplete...');
  // When the checkbox is unchecked
    // Append the task list item to the #incomplete-tasks
};

// Set click handler to addTask function
addButton.onclick = addTask;
