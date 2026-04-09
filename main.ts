/**
 * 5s student, please put sensor in the board and not the ground!
 * 
 * Open in GitHub for better solution
 */
let gapDistance = 0
basic.clearScreen()
// 1. Setup Phase: Turn on the screen and reset the bridge
OLED.init(128, 64)
OLED.writeStringNewLine("System Ready...")
robotbit.GeekServo(robotbit.Servos.S1, 0)
// 2. The Main Loop
basic.forever(function () {
    // Read the sonar sensor on Pin 1
    gapDistance = Environment.sonarbit_distance(Environment.Distance_Unit.Distance_Unit_cm, DigitalPin.P1)
    if (gapDistance > 0 && gapDistance < 10) {
        // SAFE: Train is close.
        OLED.clear()
        OLED.writeStringNewLine("Train Docked!")
        OLED.writeStringNewLine("Gap is Safe.")
        basic.showIcon(IconNames.Yes)
    } else if (gapDistance >= 10 && gapDistance < 40) {
        // DANGER: Gap is too wide!
        OLED.clear()
        OLED.writeStringNewLine("WARNING!")
        OLED.writeStringNewLine("Mind the Gap.")
        OLED.writeStringNewLine("Deploying Bridge...")
        basic.showIcon(IconNames.No)
        robotbit.GeekServo(robotbit.Servos.S1, -45)
        // Play warning note
        music.playTone(262, music.beat(BeatFraction.Whole))
        robotbit.GeekServo(robotbit.Servos.S1, -90)
    } else {
        // EMPTY: No train at the station
        OLED.clear()
        OLED.writeStringNewLine("Track Empty")
        basic.clearScreen()
    }
    // Wait half a second before checking again so the screen doesn't flicker
    basic.pause(500)
})
