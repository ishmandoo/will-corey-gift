// Set the date we're counting down to
const countDownDate = new Date("Aug 31, 2025 15:37:25").getTime();

// Update the count down every 1 second
const x = setInterval(function () {

    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="countdown"
    document.getElementById("countdown").innerHTML = days + " DAYS " + hours + " HRS " + minutes + " MINS";

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
    }
}, 1000);

function showSection(section) {
    document.getElementById('home').style.display = section === 'home' ? '' : 'none';
    document.getElementById('story').style.display = section === 'story' ? '' : 'none';
    document.getElementById('schedule').style.display = section === 'schedule' ? '' : 'none';
    document.getElementById('qa').style.display = section === 'qa' ? '' : 'none';

    document.getElementById('nav-home').classList.toggle('active', section === 'home');
    document.getElementById('nav-story').classList.toggle('active', section === 'story');
    document.getElementById('nav-schedule').classList.toggle('active', section === 'schedule');
    document.getElementById('nav-qa').classList.toggle('active', section === 'qa');
}

document.getElementById('nav-home').addEventListener('click', function (e) {
    e.preventDefault();
    showSection('home');
});
document.getElementById('nav-story').addEventListener('click', function (e) {
    e.preventDefault();
    showSection('story');
});
document.getElementById('nav-schedule').addEventListener('click', function (e) {
    e.preventDefault();
    showSection('schedule');
});
document.getElementById('nav-qa').addEventListener('click', function (e) {
    e.preventDefault();
    showSection('qa');
}); 