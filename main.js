let on = false;
let speed = 10;

let timer = 0;
let index = 0;
let pixel = 0;

let timerFrom = 39;
let timerTo = 79;
let indexFrom = 0;
let indexTo = 9;
let colorIndex = 0;
let loopColorIndex = 0;


let led_loop: number;
let loaded = false;
let ran = false



function run_loop() {

    if (index >= indexFrom && index <= indexTo) {
        light.setPixelColor(index, loopColor())
        if (index == indexTo) {
            loopColorIndex++
            index = -1
        }
    }


    if (timer >= timerFrom && timer <= timerTo) {
        light.setPixelColor(pixel, switchColor())
        if (timer == timerTo) {
            timerFrom = timerFrom + 40
            timerTo = timerTo + 40
            colorIndex++
        }
    }

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

    timer++;
    index++;
}

function startInterval() {
    on = true;

    timer = 0;
    index = 0;
    pixel = 0;

    led_loop = setInterval(function () {
        run_loop()
    }, speed);
}

input.buttonA.onEvent(ButtonEvent.Click, function () {
    if (on) {
        clearInterval(led_loop)
        on = false;
    } else {
        startInterval()
    }
})


loops.forever(function () {
    let force = pins.A2.analogRead();
    console.log(force)
    if (!on && force > 800) {
        loaded = true
    }
    else if (on && loaded && force > 200) {
        clearInterval(led_loop)
        ran = false
        loaded = false

    }
    if (loaded && force < 50 && !ran) {
        ran = true
        startInterval()
    }
})