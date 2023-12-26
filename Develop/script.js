
function buildScheduler(){
  const schedulerBox = document.querySelector('#schedulerBox');
  let startTime = dayjs().hour(9).minute(0);
  const endTime = dayjs().hour(17).minute(30);
  var now = dayjs();
  var currentHour = now.hour();
  console.log(currentHour);
  while(startTime.isBefore(endTime)){
    // console.log(startTime.getHours());
    console.log(startTime);
    let hourOf = startTime.format('h')
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
    outerDiv.id = `hour-${hourOf}`;

    innerDiv.classList.add('col-2', 'col-md-1', 'hour', 'text-center', 'py-3');
    innerDiv.innerText = startTime.format('h A');
    outerDiv.appendChild(innerDiv);


    textarea.classList.add('col-8', 'col-md-10', 'description');
    textarea.setAttribute("rows", "3");
    outerDiv.appendChild(textarea);

    button.classList.add('btn', 'saveBtn', 'col-2', 'col-md-1');
    button.setAttribute('aria-label', 'save');

    saveI.classList.add('fas', 'fa-save');
    saveI.setAttribute('aria-hidden', 'true');
    button.appendChild(saveI);
    outerDiv.appendChild(button);

 
    schedulerBox.appendChild(outerDiv);
    // console.log(startTime.format('h A'));
    startTime = startTime.add(1, 'hour');

  }
  console.log(startTime);
}





// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  buildScheduler()
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


