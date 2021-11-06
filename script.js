let todayDate = moment().format('dddd, MMM Do YYYY ')
let currentDayStart = moment().startOf('day');
let start = moment().startOf('hour')

//dom selection
let container = $('.container');

//var creation
let savedEvents = Array(9)

function timeblockCreation() {
    //timeblock creation loop
    for (let i = 9; i < 18; i++) {
        //dom creation and manipulation
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

        //div formatting for past present future
        if (startHour.isAfter(timeblockHour)) {
            divElRow.addClass('past')
            divElText.prop('readonly', true);
        } else if (startHour.isSame(timeblockHour)) {
            divElRow.addClass('present')
        } else {
            divElRow.addClass('future')
        }

        //dom appending
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
    //index is determined by data hour, since the 
    var arrIndexJSON = ($('.container').children()).index($(this).parent())
    //grab value of textarea
    let eventDetail = $(this).parent().children('textarea');
    eventDetail = eventDetail.val();
    savedEvents[arrIndexJSON - 1] = eventDetail;
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    $('.toast').toast('show');
}


//set day
$('#currentDay').text(todayDate);
timeblockCreation();
loadEntries();
container.on("click", '.saveBtn', saveEntry);