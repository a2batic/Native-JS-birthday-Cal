
"use strict";

/* Function to run on document loading*/
function refreshView() {
    /* Initial mock data */
    var bdays = [
        {
            name: 'Ayrion Lannister',
            birthday: '11/02/2019'
        },
        {
            name: 'Byrion Lannister',
            birthday: '12/02/2019'
        },
        {
            name: 'Cyrion Lannister',
            birthday: '12/02/2019'
        },
        {
            name: 'Dyrion Lannister',
            birthday: '03/02/2019'
        }
    ];

    /* Using Localstorage to store, update and fetch data */
    localStorage.setItem('bDaysFinal', JSON.stringify(bdays, undefined, 2));
    var bdList = document.getElementById('jsonList');
    bdList.innerHTML = localStorage.getItem('bDaysFinal');
    fillTheBox();
}

/* Function to fill calenders */
function fillTheBox() {
    var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    var birthdays = JSON.parse(localStorage.getItem('bDaysFinal'));
    days.forEach((day) => {
        document.getElementById(day).innerHTML = '';
    });
    for (var i = 0; i < birthdays.length; i++) {
        var date = new Date(birthdays[i].birthday);
        var year = document.getElementById('yearInput').value;
        if (year) {
            date.setFullYear(year);
        }
        var day = date.getDay();
        var name = birthdays[i].name;
        var initials = name.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        var dayDOM = document.getElementById(days[day]);
        dayDOM.innerHTML += '<div class="day__person col" style="background-color:' +
            getColor() +
            '">' +
            initials +
            '</div>';
    }
}

/* Function to generate random colors*/
function getColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.getElementById('birthdayJsonForm').addEventListener('submit', saveJSON);

/* Function when update button is clicked*/
function saveJSON(e) {
    e.preventDefault();
    var newData = document.getElementById('jsonList').value;
    localStorage.setItem('bDaysFinal', newData);
    fillTheBox();
    e.stopPropagation();
    return false;
}
