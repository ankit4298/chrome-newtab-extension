

//Get current time and date
function currentTimeAndDate() {
    const currentTime = new Date(Date.now());

    const fullTime = {
        year: currentTime.getFullYear(),
        month: currentTime.getMonth() > 9 ? currentTime.getMonth() : '0' + currentTime.getMonth(),
        date: currentTime.getDate() > 9 ? currentTime.getDate() : '0' + currentTime.getDate(),
        hour: currentTime.getHours() > 9 ? currentTime.getHours() : '0' + currentTime.getHours(),
        minutes: currentTime.getMinutes() > 9 ? currentTime.getMinutes() : '0' + currentTime.getMinutes(),
        seconds: currentTime.getSeconds() > 9 ? currentTime.getSeconds() : '0' + currentTime.getSeconds()
    }

    return fullTime;
}

//Fetch image from lorem picsum and set it as background
//Todo: Set color as per background
function setBackgroundImage() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    // const url = `https://picsum.photos/${screenWidth}/${screenHeight}?blur=5`;
    const url = `https://picsum.photos/${screenWidth}/${screenHeight}`; // removed blur
    const image = fetch(url);
    image.then(e => {
        document.querySelector('.container').style = "background-size: cover;background: url(" + e.url + ") center top";
    }).catch(ex => {
        alert('Something went wrong fetching background image!!!');
        console.log(ex);
    })
}



//Greeting functions
function setGreeting(fullTime) {
    const greetingText = document.querySelector('.greeting__text');
    if (fullTime.hour >= 0 && fullTime.hour < 12) greetingText.innerHTML = `Good Morning, `
    else if (fullTime.hour >= 12 && fullTime.hour < 16) greetingText.innerHTML = `Good Afternoon, `
    else greetingText.innerHTML = `Good Evening, `
}



// Date and time functions
function setDate() {
    const timeDate = document.querySelector('.time__date');
    const fullTime = currentTimeAndDate();

    let _date = `${fullTime.date}/${fullTime.month}/${fullTime.year}`
    timeDate.innerHTML = _date

    if (localStorage.getItem('savedDate') == null) {
        localStorage.setItem('savedDate', _date);
    }

}

function setTime() {
    const timeText = document.querySelector('.time__text');
    const fullTime = currentTimeAndDate();

    timeText.innerHTML = `${fullTime.hour}: ${fullTime.minutes}`;
}





function setName() {

    if (!localStorage.getItem('name') || localStorage.getItem('name') === "") {
        const inputName = document.querySelector('.popup__input').value;
        localStorage.setItem('name', inputName);
        const localStorageName = localStorage.getItem('name');
        document.querySelector('.popup').classList.remove('open');
        document.querySelector('.greeting__name').innerHTML = localStorageName;

        // first time load values
        localStorage.setItem('setting_lastVisited', true);
        localStorage.setItem('setting_visitedCount', true);
        localStorage.setItem('setting_quotes', true);
        localStorage.setItem('setting_timeSize', 9);

        localStorage.setItem('showNamePopup', false);
    } else {
        const localStorageName = localStorage.getItem('name');
        const inputName = document.querySelector('.popup__input').value;
        document.querySelector('.greeting__name').innerHTML = localStorageName === "" ? inputName : localStorageName;
    }

}


function getRandomQuote() {

    const response = fetch('https://api.quotable.io/random?maxLength=200&minLength=100').then(res => res.json());

    response.then(e => {
        const quoteContentDOM = document.querySelector('.quote__content');
        const quoteAuthorDOM = document.querySelector('.quote__author')
        quoteContentDOM.innerHTML = e.content;
        quoteAuthorDOM.innerHTML = `- ${e.author}`;
    }).catch(ex => {
        alert('Something went wrong fetching quote!!!');
        console.log(ex);
    })

}


function getDate() {
    const fullTime = currentTimeAndDate();
    const currDate = `${fullTime.date}/${fullTime.month}/${fullTime.year}`
    return currDate;
}

function isNewDay() {
    const _date = localStorage.getItem('savedDate');
    const fullTime = currentTimeAndDate();
    const currDate = `${fullTime.date}/${fullTime.month}/${fullTime.year}`

    if (_date != currDate) {
        return 1
    }

    return 0;

}


function recordLastVisited() {
    const fullTime = currentTimeAndDate();
    const _lastVisited = `${fullTime.date}/${fullTime.month}/${fullTime.year} ${fullTime.hour}:${fullTime.minutes}:${fullTime.seconds}`
    return _lastVisited;
}

function changeBackgroundQuote() {
    setBackgroundImage();
    getRandomQuote();
    opacityTweaker(true);
}

function opacityTweaker(val=false) {

    if(val){
        let el = document.getElementsByClassName('telemetry');
        el[0].style.opacity = '100%';

        document.getElementById('divQuote').style.opacity = '100%';
    }

    setTimeout(() => {
        let el = document.getElementsByClassName('telemetry');
        el[0].style.opacity = '10%';

        document.getElementById('divQuote').style.opacity = '10%';
        return;
    }, 5000)
}


function onStartup(fullTime) {
    // run once
    setName();
    setGreeting(fullTime);
    setTime();
    setDate();

    document.querySelector('.popup__button').addEventListener('click', setName.bind(this, fullTime));

    // fetch 3rd party
    setBackgroundImage();
    getRandomQuote();

    // decrease the opacity after 5sec
    opacityTweaker();

    return localStorage.getItem('setting_bgCarousel') != null ? localStorage.getItem('setting_bgCarousel') == "true" : true ? false : false;
}


var fullTime = currentTimeAndDate();
const IsBackgroundCarouselEnabled = onStartup(fullTime);

// run continuously
setInterval(setTime, 1000);
setInterval(setDate, 1000);

if (IsBackgroundCarouselEnabled) {
    setInterval(setBackgroundImage, 60 * 1000); // carousel image every 1 min
}



//IIFE to show name popup
(function () {

    if (localStorage.getItem('name') != null) {
        localStorage.setItem('showNamePopup', false);
        document.querySelector('.popup').classList.remove('open');

        const _isNewDay = isNewDay();
        if (_isNewDay == 1) {
            localStorage.setItem('savedDate', getDate());
            localStorage.setItem('visitedCount', 0);
        }

        if (localStorage.getItem('visitedCount') == null) {
            localStorage.setItem('visitedCount', 0)
        }

        let _visitedCount = parseInt(localStorage.getItem('visitedCount'));
        _visitedCount != null && _visitedCount != 'NaN' ? localStorage.setItem('visitedCount', _visitedCount + 1) : localStorage.setItem('visitedCount', '0');
        document.querySelector('#telemetry__visitedCount').innerHTML = localStorage.getItem('visitedCount');

        const _lastVisited = recordLastVisited();
        document.querySelector('#telemetry__lastVisited').innerHTML = localStorage.getItem('lastVisited');
        // update new last visited date
        localStorage.setItem('lastVisited', _lastVisited);

    }

    if (localStorage.getItem('showNamePopup') == "true" || localStorage.getItem("name") === "") {
        document.querySelector('.popup').classList.add('open');
    }


})();

(function () {

    if (localStorage.getItem('setting_lastVisited') != "true") {
        document.getElementById('divtelemetry__lastVisited').style.display = 'none'
    }

    if (localStorage.getItem('setting_visitedCount') != "true") {
        document.getElementById('divtelemetry__visitedCount').style.display = 'none'
    }

    if (localStorage.getItem('setting_quotes') != "true") {
        document.getElementById('divQuote').style.display = 'none'
    }

    if (localStorage.getItem('setting_timeSize') != null) {
        document.getElementById('timetext').style.fontSize = localStorage.getItem("setting_timeSize") + "em";
    }

})();


(function () {
    if (localStorage.length == 0) localStorage.setItem('showNamePopup', true);
})();

document.getElementById('reset_image').addEventListener('click', changeBackgroundQuote);