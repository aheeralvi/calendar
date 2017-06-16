// create an array to store the names of the months
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var currentMonth = 0;
var numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
var events = new Array(100);
var currentEvent = 0;

function dateMouseOver() {
    var allDates = document.getElementsByClassName('date');
    for (var c in allDates) {
        c.onmouseover = 'specify()';
        c.onmouseout = 'generalize()';
        c.id = c.innerText;
    }
    document.getElementsByClassName('date31').onmouseover = 'specify()';
    document.getElementsByClassName('date31').onmouseout = 'generalize()';
    document.getElementsByClassName('date31').id = '31';
}
//function that acts onclick when right button is clicked. Changes to next month
function nextmonth() {
    currentMonth++;
    if (currentMonth == 12) {
        currentMonth = 0;
    }
    document.getElementById('month').innerText = months[currentMonth];
    //check the number of days in that month
    //color the days based on what events are happening that month
    checkDays()
    colorGrid()
    return;
}

//function that acts onclick when left button is clicked. Changes to previous month
function prevmonth() {
    currentMonth--;
    if (currentMonth == -1) {
        currentMonth = 11;
    }
    document.getElementById('month').innerText = months[currentMonth];
    //check the number of days in that month
    //color the days based on what events are happening that month
    checkDays();
    colorGrid();
    return;
}

//the following function determines how many days should be included in the table
function checkDays() {
    if (numDays[currentMonth] == 31) {
        document.getElementById('lastrow').style.display = 'table-row';
        document.getElementsByClassName('date31')[0].style.display = 'table-cell';
    } else if (numDays[currentMonth] == 30) {
        document.getElementsByClassName('date31')[0].style.display = 'none';
    } else if (numDays[currentMonth] == 28) {
        document.getElementById('lastrow').style.display = 'none';
    }
    return;
}

//shows the forms for adding events, and the appropriate buttons
function showRow() {
    document.getElementsByClassName('lastrow')[0].style.display = 'table-row';
    document.getElementById('add').style.display = 'inline-block';
    document.getElementById('cancel').style.display = 'inline-block';
    document.getElementById('addEvent').style.display = 'none';
    return;
}

//clears all forms of information
function clearForms() {
    document.getElementById('name').value = '';
    document.getElementById('date').value = '';
    document.getElementById('start').value = '';
    document.getElementById('end').value = '';
    document.getElementById('location').value = '';
    document.getElementById('notes').value = '';
    return;
}

//acts when the add button is clicked. Stores info in event objects
function clickAdd() {
    document.getElementById('addEvent').style.display = 'inline-block';
    document.getElementById('add').style.display = 'none';
    document.getElementById('cancel').style.display = 'none';
    var name = document.getElementById('name').value;
    var date = document.getElementById('date').value;
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var type = document.getElementById('type').value;
    var location = document.getElementById('location').value;
    var notes = document.getElementById('notes').value;
    //refresh all the forms
    clearForms();
    document.getElementsByClassName('lastrow')[0].style.display = 'none';
    var newEvent = new Event(name, date, start, end, type, location, notes);
    //add event to the table
    //color the grid based on what events are occurring that month
    addToTable(newEvent);
    colorGrid();
    return;
}

//acts when the cancel button is clicked
function clickCancel() {
    clearForms();
    document.getElementById('addEvent').style.display = 'inline-block';
    document.getElementById('add').style.display = 'none';
    document.getElementById('cancel').style.display = 'none';
    document.getElementsByClassName('lastrow')[0].style.display = 'none';
    return;
}

//adds an event into the table
function addToTable(newEvent) {
    if (newEvent.name == '' && newEvent.start == '' && newEvent.date == '') {
        return;
    }
    var table = document.getElementsByClassName('list')[0]
    currentEvent++;
    events[currentEvent] = newEvent;
    events.sort(compare);
    var variable = document.getElementsByClassName('content');
    for (var i = 0; i < variable.length; i++) {
        variable[i].style.display = 'none'
    }
    for (var i = 0; i < events.length; i++) {
        var newRow = document.createElement('tr');
        newRow.className = 'content' + " " + currentEvent;
        newRow.style.display = 'table-row';
        var prop = document.createElement('td');
        prop.innerText = events[i].name;
        newRow.appendChild(prop)
        prop = document.createElement('td');
        prop.innerText = events[i].date;
        newRow.appendChild(prop)
        prop = document.createElement('td');
        prop.innerText = events[i].start;
        newRow.appendChild(prop)
        prop = document.createElement('td');
        prop.innerText = events[i].end;
        newRow.appendChild(prop)
        prop = document.createElement('td');
        prop.innerText = events[i].type;
        newRow.appendChild(prop)
        prop = document.createElement('td');
        newRow.appendChild(prop)
        prop.innerText = events[i].location;
        prop = document.createElement('td');
        prop.innerText = events[i].notes;
        newRow.appendChild(prop);
        table.appendChild(newRow);
        if (currentEvent - 1 == i) {
            break;
        }
    }
    alert("hi");

}

//colors the grid based on what events are occurring in the dates
function colorGrid() {
    for (var i = 0; i < 30; i++) {
        document.getElementsByClassName('date')[i].id = '';
    }
    document.getElementsByClassName('date31')[0].id = '';
    for (var i = 0; i < events.length; i++) {
        var temporary = events[i].date.substring(0, events[i].date.indexOf('/'));
        if (temporary == currentMonth + 1) {
            var date = events[i].date.substring(events[i].date.indexOf('/') + 1);
            if (events[i].type == 'Important') {
                document.getElementsByClassName('date')[date - 1].id += 'red';

            } else if (events[i].type == 'Home') {
                document.getElementsByClassName('date')[date - 1].id += 'green';
            } else {
                document.getElementsByClassName('date')[date - 1].id += 'blue'
            }
        }
    }
}

//store events as Event objects
function Event(name, date, start, end, type, location, notes) {
    this.name = name;
    this.date = date;
    this.start = start;
    this.end = end;
    this.type = type;
    this.location = location;
    this.notes = notes;

}

/*function specify(date) {
        var elementsToHide = document.getElementsByClassName('content ' + currentEvent);
    for (var element in elementsToHide) {
        if (element.childNodes[1].innerText == '')
    }
}*/

/*function generalize(date) {
    var elementsToShow = document.getElementsByClassName('content ' + currentEvent);
    for (var element in elementsToShow) {
        element.style.display = 'table-row';
    }
}*/

var compare = function(event1, event2) {
    var month1 = event1.date.substring(0, event1.date.indexOf('/'));
    var month2 = event2.date.substring(0, event2.date.indexOf('/'));
    var day1 = event1.date.substring(event1.date.indexOf('/') + 1);
    var day2 = event2.date.substring(event2.date.indexOf('/') + 1);
    if (month1 > month2) {
        return 1;
    } else if (month1 == month2) {
        if (day1 > day2) {
            return 1;
        } else if (day1 == day2) {
            return 0;
        }
        return -1;
    }
    return -1;
}