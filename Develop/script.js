// fxn to build html of time blocks
function buildScheduler(now){
  const schedulerBox = document.querySelector('#schedulerBox');
  let startTime = dayjs().hour(9).minute(0);
  const endTime = dayjs().hour(17).minute(30);

  let obj = localStorage.getItem('eventTextObj');
  let objExists = false;

  if(obj){
    console.log('SAME OBJECT');
    objExists = true;
    eventTextStorage = JSON.parse(obj);
  } else {
    objExists = false;
    console.log('NEW OBJECT');
    eventTextStorage = [];
    //  localStorage.setItem('eventTextObj', JSON.stringify(data));
  }

  var currentHour = now.hour();
  let hourOf = 0;
  while(startTime.isBefore(endTime)){
    
    if(!objExists){
      newTextEntry = {"hour":hourOf, "eventText":""};
      eventTextStorage.push(newTextEntry);
    } else {
      eventEntry = eventTextStorage[hourOf];
    }
    let outerDivClass;

    if(startTime.hour() < currentHour){
      outerDivClass = "past";
    } else if (startTime.hour() > currentHour){
      outerDivClass = "future";
    } else {
      outerDivClass = "present";
    }
    
    const outerDiv = document.createElement('div');

    const innerDiv = document.createElement('div');
    const textarea = document.createElement('textarea');
    const button = document.createElement('button');
    const saveI = document.createElement('i');

    outerDiv.classList.add('row', 'time-block', `${outerDivClass}`);

    innerDiv.classList.add('col-2', 'col-md-1', 'hour', 'text-center', 'py-3');
    innerDiv.innerText = startTime.format('h A');
    outerDiv.appendChild(innerDiv);

    textarea.classList.add('col-8', 'col-md-10', 'description');
    textarea.setAttribute("rows", "2");
    textarea.id = `textarea_hour${hourOf}`;

    let eventText = "";
    if(objExists){
      eventText = eventEntry.eventText;
    }
    console.log(eventText);
    textarea.textContent = eventText;

    outerDiv.appendChild(textarea);

    button.classList.add('btn', 'saveBtn', 'col-2', 'col-md-1');
    button.setAttribute('aria-label', 'save');
    button.id = `hour${hourOf}`
    button.addEventListener("click", saveEvent());

    saveI.classList.add('fas', 'fa-save');
    saveI.setAttribute('aria-hidden', 'true');
    button.appendChild(saveI);
    outerDiv.appendChild(button);
 
    schedulerBox.appendChild(outerDiv);
    startTime = startTime.add(1, 'hour');
    hourOf++;
  }

  if(!objExists){
    localStorage.setItem('eventTextObj', JSON.stringify(eventTextStorage));
  }
  let data = localStorage.getItem('eventTextObj');
  console.log(JSON.parse(data));
}
// fxn to set day
function setDayText(now){
  const dayText = document.querySelector('#currentDay');
  dayText.innerText = now.format('dddd MM/DD/YYYY');
}
// fxn to save textarea entry on save button click
function saveEvent(){
  return function(event){
    let eventTextStorage = localStorage.getItem('eventTextObj');
    eventTextStorage = JSON.parse(eventTextStorage)
    
    let buttonHour = event;
    let buttonHourID = buttonHour.srcElement.id;

    let hourOf = parseInt(buttonHourID.replace('hour', ''), 10);
    console.log(hourOf);



    let textareaID = `#textarea_${buttonHourID}`;
    let textarea = document.querySelector(textareaID);
    let eventEntry = eventTextStorage[hourOf];


    console.log(eventEntry);

    let eventTextValue = textarea.value;
    // console.log(eventTextValue)
    eventEntry.eventText = eventTextValue;

    eventTextStorage[hourOf] = eventEntry;


    // console.log();
    localStorage.setItem('eventTextObj', JSON.stringify(eventTextStorage));


  }
}





// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // const schedulerBox = document.querySelector('#schedulerBox');
  // schedulerBox.addEventListener('click', saveEvent()); 
  setDayText(dayjs());
  buildScheduler(dayjs());

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});


