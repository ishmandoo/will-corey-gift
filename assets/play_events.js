var CLICKED = false
var SELECTED = []
var COMPLETED = []
var order_completed = []
var WORDS_DONE = 0
var MARKED_COMPLETED = false

const GRAY = 'rgb(210, 210, 210)'
const YELLOW = 'rgb(255, 234, 0)'
const BLUE = 'rgb(173, 216, 230)'

var DRAGGING = true

const emojis = ["🔴", "🟠", "🟢", "🔵", "🟣", "🟤", "⚫", "⚪"]
const emojiColors = [
    "rgb(255, 127, 127)",    // Red
    "rgb(255, 165, 0)",  // Orange
    "rgb(144, 238, 144)",    // Green
    'rgb(173, 216, 230)',    // Blue
    "rgb(216, 191, 216)",  // Purple
    "rgb(210, 180, 140)",  // Brown
    "rgb(160, 160, 160)",      // Black
    "rgb(230, 230, 230)" // White
];
const star = "⭐"

const get_remaining_words_in_order = (solutions, spangram) => {
    const words = []
    Array.from(Object.keys(solutions)).forEach(word => {
        if (!order_completed.includes(word) && word != spangram) {
            words.push(word)
        }
    })
    words.sort((a, b) => {
        if (a.length === b.length) {
            return a.localeCompare(b);
        } else {
            return a.length - b.length;
        }
    });
    return words
}

const get_words_in_order = (solutions, spangram) => {
    const words = []
    Array.from(Object.keys(solutions)).forEach(word => {
        if (word != spangram) {
            words.push(word)
        }
    })
    words.sort((a, b) => {
        if (a.length === b.length) {
            return a.localeCompare(b);
        } else {
            return a.length - b.length;
        }
    });
    return words
}

const adjacent = (id1, id2) => {
    const i1 = Number(id1.slice(1))
    const i2 = Number(id2.slice(1))
    const dxs = [-1, 0, 1]
    const dys = [-6, 0, 6]

    for (let i = 0; i < dxs.length; i++) {
        const dx = dxs[i];
        for (let j = 0; j < dys.length; j++) {
            const dy = dys[j];
            if (i1 + dx + dy == i2) {
                return true
            }
        }
    }

    return false
}

function render_selected() {
    clear_canvas("selectedCanvas")
    const c_selection = []
    SELECTED.forEach(element_id => {
        drawTransparentCircleAboveEntry(element_id, "selectedCanvas", GRAY, 1)
        c_selection.push(document.getElementById(element_id).textContent)
    })

    for (let i = 0; i < SELECTED.length - 1; i++) {
        drawLineBetweenEntries(SELECTED[i], SELECTED[i + 1], "selectedCanvas", GRAY, 1)
    }

    document.getElementById("selected").textContent = c_selection.join("")
}

function render_selected_permanently(color) {
    SELECTED.forEach(element_id => {
        COMPLETED.push(element_id)
        drawTransparentCircleAboveEntry(element_id, "permanentCanvas", color, 1)
    })

    for (let i = 0; i < SELECTED.length - 1; i++) {
        drawLineBetweenEntries(SELECTED[i], SELECTED[i + 1], "permanentCanvas", color, 1)
    }
}

const redraw_completed_board = (solutions, spangram) => {
    clear_canvas("permanentCanvas")

    const color_switch = document.getElementById("color_switch")
    const words = get_words_in_order(solutions, spangram)
    for (const key in solutions) {
        const cells = solutions[key].split("|").map(cell => 'p' + cell)
        if (color_switch.checked) {
            const i = words.indexOf(key)
            if (i === -1) {
                color = YELLOW
            }
            else {
                color = emojiColors[i % emojiColors.length]
            }
        }
        else {
            if (key === spangram) {
                color = YELLOW
            }
            else {
                color = BLUE
            }
        }

        cells.forEach(element_id => {
            drawTransparentCircleAboveEntry(element_id, "permanentCanvas", color, 1)
        })

        for (let i = 0; i < cells.length - 1; i++) {
            drawLineBetweenEntries(cells[i], cells[i + 1], "permanentCanvas", color, 1)
        }
    }
}

const touchmove = (e, source, atx, aty) => {
    if (COMPLETED.includes(source.id)) {
        return
    }
    if (!CLICKED) {
        clear_canvas("hoverCanvas")
        drawTransparentCircleAboveEntry(source.id, "hoverCanvas", GRAY, 0.2)
    }

    if (!DRAGGING) {
        return
    }

    const rect = source.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.width / 2

    if (CLICKED && Math.abs(atx - cx) > rect.width / 3 || Math.abs(aty - cy) > rect.width / 3) {
        // Diagonal Sensitivity
        return
    }

    if (CLICKED) {
        if (SELECTED.length == 0 || (!SELECTED.includes(source.id) && adjacent(SELECTED[SELECTED.length - 1], source.id))) {
            SELECTED.push(source.id)
        }
        if (SELECTED.length > 1 && SELECTED[SELECTED.length - 2] == source.id) {
            SELECTED.pop()
        }
        render_selected()

    }
    return

}

const mousemove = (e) => {
    const source = e.srcElement
    touchmove(e, source, e.x, e.y)
}

const mousedown = (e) => {
    clear_canvas("hoverCanvas")
    if (DRAGGING) {
        resize()
        CLICKED = true
        mousemove(e)
    }
}

const mouseup = (e, solutions, spangram) => {
    if (!DRAGGING) {
        return
    }
    document.getElementById("selected").textContent = ""
    const coords = []
    const letters = []
    SELECTED.forEach(element_id => {
        letters.push(document.getElementById(element_id).textContent)
        coords.push(element_id.slice(1))
    })

    const key = letters.join("")
    const val = coords.join("|")

    if (key in solutions && solutions[key] === val && key !== "" && !order_completed.includes(key)) { // GOOD
        let color = ''
        if (key === spangram) {
            color = YELLOW
            document.getElementById("selected").textContent = "SPANGRAM!!!"
            order_completed.push("S")
        }
        else {
            color = BLUE
            order_completed.push("W")
        }
        order_completed.push(key)
        render_selected_permanently(color)

        WORDS_DONE = WORDS_DONE + 1
    }
    else if (key in solutions && key !== "" && !order_completed.includes(key)) { // Make it correct
        const to_set = []
        solutions[key].split("|").forEach(a => {
            to_set.push("p" + a)
        })
        SELECTED = to_set
        mouseup(e, solutions, spangram) // Re run with a faux selected
        return
    }
    else { // WRONG GUESS
        document.getElementById("selected").textContent = "Not a theme word"
    }

    CLICKED = false
    SELECTED = []
    clear_canvas("selectedCanvas")

    if (COMPLETED.length == 48) {
        document.getElementById("selected").textContent = "You win"
        sprayConfetti()
        reveal_share(solutions, spangram)
        document.getElementById("play-next").hidden = false
        document.getElementById("color-switch-div").hidden = false
        resize()
        if (MARKED_COMPLETED == false) {
            save_completion()
            MARKED_COMPLETED = true
        }
    }
    document.getElementById("currentlyFound").textContent = WORDS_DONE

}

const mouseup_outside = (e, solutions, spangram) => {
    if (CLICKED && DRAGGING) {
        mouseup(e, solutions, spangram)
    }
}

const mouseleave = (e) => {
    clear_canvas("hoverCanvas")
}

const click = (e, solutions, spangram) => {
    source = e.srcElement
    if (COMPLETED.includes(source.id)) {
        return
    }
    if (SELECTED.length == 0 && DRAGGING == true) {
        DRAGGING = false
        SELECTED.push(source.id)
        resize()
        render_selected()
        return
    }
    last_element = SELECTED[SELECTED.length - 1]
    if (source.id == last_element) {
        DRAGGING = true
        mouseup(e, solutions, spangram)
        return
    }
    if (SELECTED.length > 1 && source.id == SELECTED[SELECTED.length - 2]) {
        SELECTED.pop()
        resize()
        render_selected()

        return
    }
    if (SELECTED.includes(source.id)) {
        return
    }
    if (adjacent(source.id, last_element)) {
        SELECTED.push(source.id)
        resize()
        render_selected()

        return
    }
}

const reveal_next_hint = (e, solutions, spangram) => {
    const words = get_remaining_words_in_order(solutions, spangram)
    const to_reveal = solutions[words[0]].split("|").map((e) => { return "p" + e })
    to_reveal.forEach((e) => {
        drawDottedCircleAboveEntry(e, "permanentCanvas", BLUE, 1)
    })
    if (!(order_completed[order_completed.length - 1] === "H")) {
        order_completed.push("H")
    }
}

const save_completion = () => {
    fetch("/mark_completed", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': document.getElementsByName("csrfmiddlewaretoken")[0].value
        },
        body: JSON.stringify({
            'url': document.getElementById("url").innerHTML
        })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err });
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

const is_mobile_device = () => {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

const reveal_share = (solutions, spangram) => {
    const shareButton = document.getElementById('share-button');
    shareButton.hidden = false
    document.getElementById('hint-button').hidden = true
    shareButton.addEventListener('click', async () => {
        const theme = document.getElementById('theme').innerText;
        const BC = "🔵"
        const YC = "🟡"
        const HC = "💡"

        const to_append = []
        const color_mode = document.getElementById("color_switch").checked
        const words = get_words_in_order(solutions, spangram)
        order_completed.forEach((w) => {
            if (color_mode) {
                i = words.indexOf(w)
                if (i !== -1) {
                    to_append.push(emojis[i % emojis.length])
                }
                if (w === spangram) {
                    to_append.push(star)
                }
            }
            else {
                if (w === "S") {
                    to_append.push(YC)
                }
                if (w === "W") {
                    to_append.push(BC)
                }
            }
            if (w === "H") {
                to_append.push(HC)
            }
        })
        const textToShare = theme + ": \n" + to_append.join("");
        console.log(textToShare)
        if (navigator.share && is_mobile_device()) {
            try {
                await navigator.share({
                    text: textToShare
                });
            } catch (error) {
                console.error('Error sharing text:', error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(textToShare);
                document.getElementById("selected").textContent = "Text Copied to Clipboard"
            } catch (error) {
                console.error('Error copying text to clipboard:', error);
            }
        }
    });
}



