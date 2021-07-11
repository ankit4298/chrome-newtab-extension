

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
async function setBackgroundImage() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const url = `https://picsum.photos/${screenWidth}/${screenHeight}?blur=5`;
    const image = await fetch(url);
    document.querySelector('.container').style = "background-size: cover;background: url(" + image.url + ") center top";
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

    timeDate.innerHTML = `${fullTime.date}/${fullTime.month}/${fullTime.year}`

}

function setTime() {
    const timeText = document.querySelector('.time__text');
    const fullTime = currentTimeAndDate();

    timeText.innerHTML = `${fullTime.hour}: ${fullTime.minutes}: ${fullTime.seconds}`;

}





function setName(fullTime) {


    if (!localStorage.getItem('name') || localStorage.getItem('name') === "") {
        const inputName = document.querySelector('.popup__input').value;
        localStorage.setItem('name', inputName);
        const localStorageName = localStorage.getItem('name');
        document.querySelector('.popup').classList.remove('open');
        document.querySelector('.greeting__name').innerHTML = localStorageName;

        localStorage.setItem('showNamePopup', false);
    } else {
        const localStorageName = localStorage.getItem('name');
        const inputName = document.querySelector('.popup__input').value;
        document.querySelector('.greeting__name').innerHTML = localStorageName === "" ? inputName : localStorageName;
    }
    setGreeting(fullTime);


}



async function getRandomQuote() {

    const response = await fetch('https://api.quotable.io/random?maxLength=200&minLength=100').then(res => res.json());

    const quoteContentDOM = document.querySelector('.quote__content');
    const quoteAuthorDOM = document.querySelector('.quote__author')
    quoteContentDOM.innerHTML = response.content;
    quoteAuthorDOM.innerHTML = `- ${response.author}`;

}




var fullTime = currentTimeAndDate();
setName(fullTime);
document.querySelector('.popup__button').addEventListener('click', setName.bind(this, fullTime));
setGreeting(fullTime);
setBackgroundImage();
getRandomQuote();
setInterval(setTime, 1000);
setInterval(setDate, 1000);






//IIFE to show name popup
(function () {

    if (localStorage.getItem('name') != null) {
        localStorage.setItem('showNamePopup', false);
        document.querySelector('.popup').classList.remove('open');

    }

    if (localStorage.getItem('showNamePopup') == "true" || localStorage.getItem("name") === "") {
        document.querySelector('.popup').classList.add('open');
    }


})();


(function () {
    if (localStorage.length == 0) localStorage.setItem('showNamePopup', true);
})();

// localStorage.clear();