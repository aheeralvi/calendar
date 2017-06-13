// create an array to store the names of the months
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var currentMonth = 0;

//function that acts onclick when right calendar button is clicked
function nextmonth() {
    currentMonth++;
    if (currentMonth == 12) {
        currentMonth = 0;
    }
    document.getElementById('month').innerText = months[currentMonth];
}

function prevmonth() {
    currentMonth--;
    if (currentMonth == -1) {
        currentMonth = 11;
    }
    document.getElementById('month').innerText = months[currentMonth];
}