// timer program accurate to the speed variable in ms
let on = false;
let paused = false;
const speed = 50;

let timer = 0;
let index = 0;
let pixel = 0;

let timerFrom = 39;
let timerTo = 79;
let indexFrom = 0;
let indexTo = 9;
let colorIndex = 0;
let loopColorIndex = 0;

// start of the function
function run_loop() {
    // check if paused
    if (!paused) {
        // rainbow loop for ms timer
        if (index >= indexFrom && index <= indexTo) {
            light.setPixelColor(index, loopColor())
            if (index == indexTo) {
                loopColorIndex++
                index = -1
            }
        }

        // color loop for loop counter "the loop amount indicator"
        if (timer >= timerFrom && timer <= timerTo) {
            light.setPixelColor(pixel, switchColor())
            if (timer == timerTo) {
                timerFrom = timerFrom + 40
                timerTo = timerTo + 40
                music.playTone(Note.C, BeatFraction.Half)
                colorIndex++
            }
        }

        // increment indexing variables
        timer++;
        index++;
    }

}

// switch statement for changing the color of the loop amount indicator
function switchColor() {
    switch (colorIndex) {
        case (0):
            return Colors.Purple;
            break;
        case (1):
            return Colors.Pink;
            break;
        case (2):
            return Colors.Indigo;
            break;
        case (3):
            return Colors.Orange;
            break;
        case (4):
            return Colors.Violet;
            break;
        case (5):
            return Colors.White;
            break;
        default:
            pixel++
            light.setPixelColor(pixel - 1, Colors.Red)
            colorIndex = 0
            return Colors.Red;
            break;
    }
}

// switch statement for changing the color of the rainbow loop to indicate ms
function loopColor() {
    switch (loopColorIndex) {
        case (0):
            return Colors.Blue;
            break;
        case (1):
            return Colors.Green;
            break;
        case (2):
            return Colors.Yellow;
            break;
        case (3):
            return Colors.Red;
            break;
        default:
            loopColorIndex = 0
            return Colors.Blue;
            break;
    }
}

//start function 
function startInterval() {

    on = true;

    timer = 0;
    index = 0;
    pixel = 0;

    let break_loop = false

    // create the interval foor the loop function
    let led_loop = setInterval(function () {
        if (!on) {
            break_loop = true
        }
        if (!break_loop) {
            run_loop()
        } else {
            clearInterval(led_loop)
        }

    }, speed);

}

// starting input
input.buttonA.onEvent(ButtonEvent.Click, function () {
    if (on) {
        on = false
    } else {
        startInterval()
    }
})

// pausing input
input.buttonB.onEvent(ButtonEvent.Click, function () {
    if (paused) {
        paused = false
    } else {
        paused = true
    }
})

// different style timer
input.buttonsAB.onEvent(ButtonEvent.Click, function () {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j <= i; j++) {
            light.setPixelColor(j, loopColor())
            pause(100)
        }
        for (let j = i; j >= 0; j--) {
            light.setPixelColor(j, Colors.Black)
            pause(100)
        }
        // switch led color and restart the loop
        if (i == 9) {
            i = 0
            loopColorIndex++
        }
    }
})
