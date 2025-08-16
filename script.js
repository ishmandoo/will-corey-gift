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
    document.getElementById('rsvp').style.display = section === 'rsvp' ? '' : 'none';
    document.getElementById('story').style.display = section === 'story' ? '' : 'none';
    document.getElementById('schedule').style.display = section === 'schedule' ? '' : 'none';
    document.getElementById('qa').style.display = section === 'qa' ? '' : 'none';
    document.getElementById('accommodations').style.display = section === 'accommodations' ? '' : 'none';
    document.getElementById('travel').style.display = section === 'travel' ? '' : 'none';
    document.getElementById('cuddlefish_puzzle').style.display = section === 'cuddlefish_puzzle' ? '' : 'none';
    document.getElementById('dance_puzzle').style.display = section === 'dance_puzzle' ? '' : 'none';
    document.getElementById('petsitting_puzzle').style.display = section === 'petsitting_puzzle' ? '' : 'none';
    document.getElementById('poem_puzzle').style.display = section === 'poem_puzzle' ? '' : 'none';
    document.getElementById('notes_puzzle').style.display = section === 'notes_puzzle' ? '' : 'none';
    document.getElementById('threads').style.display = section === 'threads' ? '' : 'none';
    document.getElementById('city_puzzle').style.display = section === 'city_puzzle' ? '' : 'none';

    document.getElementById('nav-home').classList.toggle('active', section === 'home');
    document.getElementById('nav-rsvp').classList.toggle('active', section === 'rsvp');
    document.getElementById('nav-story').classList.toggle('active', section === 'story');
    document.getElementById('nav-schedule').classList.toggle('active', section === 'schedule');
    document.getElementById('nav-qa').classList.toggle('active', section === 'qa');
    document.getElementById('nav-accommodations').classList.toggle('active', section === 'accommodations');
    document.getElementById('nav-travel').classList.toggle('active', section === 'travel');
    document.getElementById('nav-cuddlefish-puzzle').classList.toggle('active', section === 'cuddlefish_puzzle');
    document.getElementById('nav-dance-puzzle').classList.toggle('active', section === 'dance_puzzle');
    document.getElementById('nav-petsitting-puzzle').classList.toggle('active', section === 'petsitting_puzzle');
    document.getElementById('nav-poem-puzzle').classList.toggle('active', section === 'poem_puzzle');
    document.getElementById('nav-threads').classList.toggle('active', section === 'threads');
    document.getElementById('nav-city-puzzle').classList.toggle('active', section === 'city_puzzle');
}

document.getElementById('nav-home').addEventListener('click', function (e) {
    e.preventDefault();
    showSection('home');
});
document.getElementById('nav-rsvp').addEventListener('click', function (e) {
    e.preventDefault();
    showSection('rsvp');
});
document.getElementById('nav-story').addEventListener('click', function (e) {
    e.preventDefault();
    showSection('story');
});
document.getElementById('nav-accommodations').addEventListener('click', function (e) {
    e.preventDefault();
    showSection('accommodations');
});
document.getElementById('nav-schedule').addEventListener('click', function (e) {
    e.preventDefault();
    showSection('schedule');
});
document.getElementById('nav-qa').addEventListener('click', function (e) {
    e.preventDefault();
    showSection('qa');
});
document.getElementById('nav-travel').addEventListener('click', function (e) {
    e.preventDefault();
    showSection('travel');
});
document.getElementById('nav-cuddlefish-puzzle').addEventListener('click', function (e) {
    e.preventDefault();
    showSection('cuddlefish_puzzle');
});
document.getElementById('nav-dance-puzzle').addEventListener('click', function (e) {
    e.preventDefault();
    showSection('dance_puzzle');
});
document.getElementById('nav-petsitting-puzzle').addEventListener('click', function (e) {
    e.preventDefault();
    showSection('petsitting_puzzle');
});
document.getElementById('nav-poem-puzzle').addEventListener('click', function (e) {
    e.preventDefault();
    showSection('poem_puzzle');
});
document.getElementById('nav-notes-puzzle').addEventListener('click', function (e) {
    e.preventDefault();
    showSection('notes_puzzle');
});
document.getElementById('nav-threads').addEventListener('click', function (e) {
    e.preventDefault();
    showSection('threads');
});
document.getElementById('nav-city-puzzle').addEventListener('click', function (e) {
    e.preventDefault();
    showSection('city_puzzle');
});

// About/Help functionality - run after DOM is loaded
const aboutLink = document.getElementById('nav-about');
if (aboutLink) {
    aboutLink.onclick = function (e) {
        e.preventDefault();
        alert('Made with love by Adam, Ben, Bobby, David, Declan, Jess, Liz, Phil, Raffi, and Zoe.');
        return false;
    };
}

const helpLink = document.getElementById('nav-help');
if (helpLink) {
    helpLink.onclick = function (e) {
        e.preventDefault();
        alert('lol');
        return false;
    };
}
