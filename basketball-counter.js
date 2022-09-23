let distance = 0
let score = 0
let loopCounter = 0
let inView = false
let colorIndex = 0
let index = -1
let colorArray: number[] = [Colors.Green, Colors.Blue, Colors.Orange, Colors.Red]
let paused = false

loops.forever(function () {
    if (paused === false) {
        pins.A3.digitalWrite(false)
        control.waitMicros(2)
        pins.A3.digitalWrite(true)
        control.waitMicros(10)
        pins.A3.digitalWrite(false)

        // convert mesurment into cm
        distance = pins.A2.pulseIn(PulseValue.High) / 58

        // log the distance in cm 
        console.log(`distance in cm: ${Math.round(distance)} loopCounter: ${loopCounter} score: ${score}`)

        if (distance < 20) {
            if (inView === false) {
                score++
                index++
            }
            inView = true
        } else {
            inView = false
        }

        if (index > 9) {
            index = 0
            colorIndex++
        }

        light.setPixelColor(index, colorArray[colorIndex])

        pins.A3.digitalWrite(false)
        loopCounter++
        pause(50)
    }
})


input.buttonA.onEvent(ButtonEvent.Click, function () {
    score = 0
    index = -1
    colorIndex = 0
    inView = false
    distance = 0
    loopCounter = 0
    paused = false
    light.clear()
})

input.buttonB.onEvent(ButtonEvent.Click, function () {
    if (paused) {
        paused = false
    } else {
        paused = true
    }
})