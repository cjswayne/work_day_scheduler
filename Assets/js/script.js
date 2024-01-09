// Function to build the time blocks for the scheduler
function buildScheduler(now) {

  // Select the schedulerBox element and set start and end times
  const schedulerBox = document.querySelector('#schedulerBox');
  let startTime = dayjs().hour(9).minute(0); // Start at 9:00 AM
  const endTime = dayjs().hour(17).minute(30); // End at 5:30 PM

  // Attempt to retrieve stored events from localStorage
  let obj = localStorage.getItem('eventTextObj');
  let objExists = false;

  // If stored events exist, parse and use them; otherwise, start fresh
  if (obj) {
    objExists = true;
    eventTextStorage = JSON.parse(obj);
  } else {
    objExists = false;
    eventTextStorage = [];
  }

  var currentHour = now.hour(); // Get current hour for styling
  let hourOf = 0; // Counter for hours

  // Loop to create a time block for each hour in the range
  while (startTime.isBefore(endTime)) {

    let outerDivClass;
    let eventText = "";
    
    // Add new blank events if no existing events found
    if (!objExists) {
      newTextEntry = { "hour": hourOf, "eventText": "" };
      eventTextStorage.push(newTextEntry);
    } else {
      eventEntry = eventTextStorage[hourOf];
    }

    // Create elements for the time block: divs, textarea, button
    const outerDiv = document.createElement('div');
    const innerDiv = document.createElement('div');
    const textarea = document.createElement('textarea');
    const button = document.createElement('button');
    const saveI = document.createElement('i');

    // Style the time block based on whether it's in the past, present, or future
    outerDiv.classList.add('row', 'time-block', `${(startTime.hour() < currentHour) ? 'past' : (startTime.hour() > currentHour) ? 'future' : 'present'}`);

    // Setting up the hour label
    innerDiv.classList.add('col-2', 'col-md-1', 'hour', 'text-center', 'py-3');
    innerDiv.innerText = startTime.format('h A');
    outerDiv.appendChild(innerDiv);

    // Setup for the textarea where event details can be entered
    textarea.classList.add('col-8', 'col-md-10', 'description');
    textarea.setAttribute("rows", "2");
    textarea.id = `textarea_hour${hourOf}`;

    // Populate textarea with event text if it exists
    if (objExists) {
      eventText = eventEntry.eventText;
    }
    textarea.textContent = eventText;
    outerDiv.appendChild(textarea);

    // Setup for the save button
    button.classList.add('btn', 'saveBtn', 'col-2', 'col-md-1');
    button.setAttribute('aria-label', 'save');
    button.id = `hour${hourOf}`
    button.addEventListener("click", saveEvent());

    // Adding icon to the save button
    saveI.classList.add('fas', 'fa-save');
    saveI.setAttribute('aria-hidden', 'true');
    button.appendChild(saveI);
    outerDiv.appendChild(button);
    schedulerBox.appendChild(outerDiv);

    // Increment time and hour counter
    startTime = startTime.add(1, 'hour');
    hourOf++;
  }

  // Save the new or updated event data to localStorage
  if (!objExists) {
    localStorage.setItem('eventTextObj', JSON.stringify(eventTextStorage));
  }
}

// Function to set the current day text on the scheduler
function setDayText(now) {
  const dayText = document.querySelector('#currentDay');
  dayText.innerText = now.format('dddd MM/DD/YYYY');
}

// Function to save an event when the save button is clicked
function saveEvent() {
  return function (event) {
    let eventTextStorage = localStorage.getItem('eventTextObj');
    eventTextStorage = JSON.parse(eventTextStorage)

    // Identify which hour's save button was clicked
    let buttonHour = event;
    let buttonHourID = buttonHour.srcElement.id;
    let hourOf = parseInt(buttonHourID.replace('hour', ''), 10);

    // Fetch and update the event text from the corresponding textarea
    let textareaID = `#textarea_${buttonHourID}`;
    let textarea = document.querySelector(textareaID);
    let eventEntry = eventTextStorage[hourOf];

    let eventTextValue = textarea.value;
    eventEntry.eventText = eventTextValue;
    eventTextStorage[hourOf] = eventEntry;

    // Save the updated event data back to localStorage
    localStorage.setItem('eventTextObj', JSON.stringify(eventTextStorage));

    // Show a brief success message
    displaySuccess()
  }
}

// Function to display a success message after saving an event
function displaySuccess() {
  const successBox = document.querySelector('#successBox')
  successBox.classList.remove('hidden')
  successBox.classList.add('unhidden')

  // Hide the success message after a short delay
  setTimeout(function () {
    successBox.classList.remove('unhidden')
    successBox.classList.add('hidden')
  }, 500);
}

// Initial setup: Set the current day and build the scheduler on page load
$(function () {
  setDayText(dayjs());
  buildScheduler(dayjs());
});
