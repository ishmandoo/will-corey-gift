const set_canvas = () => {
    const canvases = ["hoverCanvas", "permanentCanvas", "selectedCanvas", "hoverCanvas", "permanentCanvas"] // UNCLEAR WHY I NEED MORE
    canvases.forEach(cs => {
        const canvas = document.getElementById(cs);
        const table = document.getElementById("table")
        const rect = table.getBoundingClientRect()
        canvas.width = rect.width;
        canvas.height = rect.height;
        canvas.style.top = `${rect.top + window.scrollY}px`
        canvas.style.left = `${rect.left + window.scrollX}px`
    });
}

const set_temp = () => {
    const canvas = document.getElementById("tempCanvas");
    const table = document.getElementById("table")
    const rect = table.getBoundingClientRect()
    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.top = `${rect.top + window.scrollY}px`
    canvas.style.left = `${rect.left + window.scrollX}px`
}

const copy_canvas = (from, into) => {
    const fromCanvas = document.getElementById(from)
    const intoCanvas = document.getElementById(into)

    ctx = intoCanvas.getContext("2d")
    ctx.drawImage(fromCanvas, 0, 0);
}

const resize = () => {
    copy_canvas("permanentCanvas", "tempCanvas")
    set_canvas()
    copy_canvas("tempCanvas", "permanentCanvas")
    clear_canvas("tempCanvas")
}

const clear_canvas = (canvas_id) => {
    const canvas = document.getElementById(canvas_id);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawTransparentCircleAboveEntry(entryId, canvas_id, color, opacity) {
    const entry = document.getElementById(entryId);
    const canvas = document.getElementById(canvas_id);
    const ctx = canvas.getContext('2d');
    const table = document.getElementById("table")

    // Calculate the position of the entry
    const rect = entry.getBoundingClientRect();
    const tableRect = table.getBoundingClientRect();

    radius = rect.width / 2.75
    const x = rect.left + rect.width / 2 - tableRect.left;
    const y = rect.top - tableRect.top + rect.height / 2; // Position the circle above the entry

    // Set the transparency
    ctx.globalAlpha = opacity;

    // Draw the circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    // Reset the transparency
    ctx.globalAlpha = 1.0;
}

function drawLineBetweenEntries(entry1Id, entry2Id, canvasId, color, opacity) {
    const entry1 = document.getElementById(entry1Id);
    const entry2 = document.getElementById(entry2Id);
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    // Adjust canvas size to match the table
    const table = document.getElementById("table")

    // Calculate positions
    const rect1 = entry1.getBoundingClientRect();
    const rect2 = entry2.getBoundingClientRect();
    const tableRect = table.getBoundingClientRect();

    const x1 = rect1.left + rect1.width / 2 - tableRect.left;
    const y1 = rect1.top + rect1.height / 2 - tableRect.top;
    const x2 = rect2.left + rect2.width / 2 - tableRect.left;
    const y2 = rect2.top + rect2.height / 2 - tableRect.top;
    ctx.globalAlpha = opacity;
    // Draw the line
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = rect1.width / 4
    ctx.stroke();
    ctx.globalAlpha = 1.0;
}

function drawDottedCircleAboveEntry(entryId, canvas_id, color, opacity) {
    const entry = document.getElementById(entryId);
    const canvas = document.getElementById(canvas_id);
    const ctx = canvas.getContext('2d');
    const table = document.getElementById("table")

    // Calculate the position of the entry
    const rect = entry.getBoundingClientRect();
    const tableRect = table.getBoundingClientRect();

    radius = rect.width / 2.75
    const x = rect.left + rect.width / 2 - tableRect.left;
    const y = rect.top - tableRect.top + rect.height / 2; // Position the circle above the entry

    // Set the transparency
    ctx.globalAlpha = opacity;

    // Set the line style for a dotted pattern
    ctx.setLineDash([5, 5]); // Adjust the array for different dash-gap patterns
    ctx.lineWidth = 3; // Set the thickness of the dotted line

    // Draw the circle
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.9, 0, 2 * Math.PI);
    ctx.strokeStyle = color;
    ctx.stroke();

    // Reset the transparency and dash pattern
    ctx.globalAlpha = 1.0;
    ctx.setLineDash([]); // Reset to solid line
}

function sprayConfetti() {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}