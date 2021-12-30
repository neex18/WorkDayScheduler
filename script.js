// moment.js tools
let todayDate = moment().format('dddd, MMM Do YYYY ')
let currentDayStart = moment().startOf('day');
let startHour = moment().startOf('hour')

let container = $('.container');
let savedEvents = Array(9)

function timeblockCreation() {
    for (let i = 9; i < 18; i++) {
        var timeblockHour = moment().startOf('day').hour(i)
        var hourFormat = moment(timeblockHour).format('h:mm a')
        var divElRow = $('<div>');
        var divElHour = $('<div>')
        var divElText = $('<textarea>');
        var divElSave = $('<div>');
        divElRow.addClass("row time-block");
        divElRow.attr('data-hour', i);
        divElHour.addClass('col-2 hour')
        divElHour.text(hourFormat);
        divElText.addClass('col-9 description')
        divElSave.addClass('col-1 saveBtn');

        if (startHour.isAfter(timeblockHour)) {
            divElRow.addClass('past')
            divElText.prop('readonly', true);
        } else if (startHour.isSame(timeblockHour)) {
            divElRow.addClass('present')
        } else {
            divElRow.addClass('future')
        }

        container.append(divElRow);
        divElRow.append(divElHour);
        divElRow.append(divElText);
        divElRow.append(divElSave);
        divElSave.append("<img class='img-fluid ' src='assets/img/saveIcon.png' alt='Png File Svg - Save Icon In Png Clipart@pikpng.com'></p>");
    }
}

function loadEntries() {
    var storedEvents = JSON.parse(localStorage.getItem('savedEvents'));
    if (storedEvents !== null) {
        savedEvents = storedEvents;
        for (let i = 0; i < savedEvents.length; i++) {
            container.children('.row').eq(i).children('textarea').text(savedEvents[i]);
        }
    }
}

function saveEntry() {
    var arrIndexJSON = ($('.container').children()).index($(this).parent())
    let eventDetail = $(this).parent().children('textarea');
    eventDetail = eventDetail.val();
    savedEvents[arrIndexJSON - 1] = eventDetail;
    // make savedEvents a string
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    $('.toast').toast('show');
}

// Initialize day
$('#currentDay').text(todayDate);
timeblockCreation();
loadEntries();
container.on("click", '.saveBtn', saveEntry);