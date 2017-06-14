// create an array to store the names of the months
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var currentMonth = 0;
var numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

//function that acts onclick when right button is clicked. Changes to next month
function nextmonth() {
    currentMonth++;
    if (currentMonth == 12) {
        currentMonth = 0;
    }
    document.getElementById('month').innerText = months[currentMonth];
    checkDays()
}

//function that acts onclick when left button is clicked. Changes to previous month
function prevmonth() {
    currentMonth--;
    if (currentMonth == -1) {
        currentMonth = 11;
    }
    document.getElementById('month').innerText = months[currentMonth];
    checkDays();
}

//the following function determines how many days should be included in the table
function checkDays() {
    if (numDays[currentMonth] == 31) {
        document.getElementById('lastrow').style.display = 'table-row';
        document.getElementById('31').style.display = 'table-cell';
    } else if (numDays[currentMonth] == 30) {
        document.getElementById('31').style.display = 'none';
    } else if (numDays[currentMonth] == 28) {
        document.getElementById('lastrow').style.display = 'none';
    }
}

function showRow() {
    document.getElementsByClassName('addevent')[0].style.display = 'table-row';
    document.getElementById('add').style.display = 'inline-block';
    document.getElementById('addEvent').style.display = 'none';
}

function clearForms() {
    document.getElementById('name').value = '';
    document.getElementById('date').value = '';
    document.getElementById('start').value = '';
    document.getElementById('end').value = '';
    document.getElementById('location').value = '';
    document.getElementById('notes').value = '';

}

function clickAdd() {
    document.getElementById('addEvent').style.display = 'inline-block';
    document.getElementById('add').style.display = 'none';
    var name = document.getElementById('name').value;
    var date = document.getElementById('date').value;
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var type = document.getElementById('type').value;
    var location = document.getElementById('location').value;
    var notes = document.getElementById('notes').value;
    clearForms();
    document.getElementsByClassName('addevent')[0].style.display = 'none';
    var newEvent = new Event(name, date, start, end, type, location, notes);
    addToTable(newEvent);
}
//store events as Event objects
function Event(name, date, start, end, type, location, notes) {
    this.name = title;
    this.date = date;
    this.start = start;
    this.end = end;
    this.type = type;
    this.location = location;
    this.notes = notes;
}