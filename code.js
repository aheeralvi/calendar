// create an array to store the names of the months
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var currentMonth = 0;
var numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
var events = new Array(100);
var currentEvent = 0;

//function that acts onclick when right button is clicked. Changes to next month
function nextmonth() {
    currentMonth++;
    if (currentMonth == 12) {
        currentMonth = 0;
    }
    document.getElementById('month').innerText = months[currentMonth];
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

function showRow() {
    document.getElementsByClassName('lastrow')[0].style.display = 'table-row';
    document.getElementById('add').style.display = 'inline-block';
    document.getElementById('cancel').style.display = 'inline-block';
    document.getElementById('addEvent').style.display = 'none';
    return;
}

function clearForms() {
    document.getElementById('name').value = '';
    document.getElementById('date').value = '';
    document.getElementById('start').value = '';
    document.getElementById('end').value = '';
    document.getElementById('location').value = '';
    document.getElementById('notes').value = '';
    return;
}

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
    clearForms();
    document.getElementsByClassName('lastrow')[0].style.display = 'none';
    var newEvent = new Event(name, date, start, end, type, location, notes);
    addToTable(newEvent);
    colorGrid();
    return;
}

function clickCancel() {
    clearForms();
    document.getElementById('addEvent').style.display = 'inline-block';
    document.getElementById('add').style.display = 'none';
    document.getElementById('cancel').style.display = 'none';
    document.getElementsByClassName('lastrow')[0].style.display = 'none';
    return;
}

function addToTable(newEvent) {
    if (newEvent.name == '' && newEvent.start == '' && newEvent.date == '') {
        return;
    }
    events[currentEvent] = newEvent;
    currentEvent++;
    var table = document.getElementsByClassName('list')[0]
    var newRow = document.createElement('tr');
    newRow.className = 'content';
    newRow.style.display = 'table-row';
    var prop = document.createElement('td');
    prop.innerText = newEvent.name;
    newRow.appendChild(prop)
    prop = document.createElement('td');
    prop.innerText = newEvent.date;
    newRow.appendChild(prop)
    prop = document.createElement('td');
    prop.innerText = newEvent.start;
    newRow.appendChild(prop)
    prop = document.createElement('td');
    prop.innerText = newEvent.end;
    newRow.appendChild(prop)
    prop = document.createElement('td');
    prop.innerText = newEvent.type;
    newRow.appendChild(prop)
    prop = document.createElement('td');

    newRow.appendChild(prop)
    prop = document.createElement('td');
    prop.innerText = newEvent.notes;
    newRow.appendChild(prop);
    table.appendChild(newRow);
    /*if (currentEvent == 1) {
        table.appendChild(newRow)
    } else {
        var counter = 0;
        while (events[counter].compareTo(newEvent) == -1) {
            counter++;
        }
        table.insertBefore(newRow, table.childNodes[counter + 2]);
    }*/

    return;
}

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
    this.compareTo = function(event) {
        var month1 = this.date.substring(0, this.date.indexOf('/'));
        var month2 = event.date.substring(0, event.date.indexOf('/'));
        var day1 = this.date.substring(this.date.indexOf('/') + 1);
        var day2 = event.date.substring(this.date.indexOf('/') + 1);
        alert(day1 + " " + day2);
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
}