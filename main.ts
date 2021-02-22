/* level guide:
0: 3 beat break, 2 types, 4 to pass, 120 bpm
1: 2 beat break, 2 types, 8 to pass, 3 freebies, 120 bpm
2: 2 beat break, 3 types, 8 to pass, 3 freebies, 120 bpm
3: 1 beat break, 3 types, 12 to pass, 4 freebies , 180 bpm
4: 1 beat break, 3 types, 2 freebies, 240 bpm
*/

input.onButtonPressed(Button.A, function () {
    if (ready) {
        aPressed = true
    }
})
input.onButtonPressed(Button.B, function () {
    if (ready) {
        bPressed = true
    }
})
let type = 0
let aPressed = false
let bPressed = false
let ready = false
// 0 is major, 1 is minor, 2 is neither (mix of augmented and diminished chords)
let major = [[262, 330, 392], [294, 370, 440], [208, 262, 311], [349, 440, 523], [392, 494, 587], [233, 294, 349]]
let minor = [[262, 311, 392], [294, 349, 440], [208, 247, 311], [349, 415, 523], [392, 466, 587], [233, 277, 349]]
let neither = [[262, 311, 370], [262, 330, 415], [330, 392, 466], [330, 415, 523], [233, 277, 330], [233, 294, 370]]
const typesPerLevel = [2, 2, 3, 3, 3];
const bpmPerLevel = [120, 120, 120, 180, 240];
const playChord = () => {
    type = Math.floor(Math.random() * typesPerLevel[level]);
    const selectedType = type === 0 ? major : type === 1 ? minor : neither;
    const selected = Math.floor(Math.random() * selectedType.length)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . #
        # . . . #
        `)
    music.playTone(selectedType[selected][0], music.beat(BeatFraction.Whole))
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . # .
        # . . # .
        `)
    music.playTone(selectedType[selected][1], music.beat(BeatFraction.Whole))
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . # . .
        # . # . .
        `)
    ready = true;
    music.playTone(selectedType[selected][2], music.beat(BeatFraction.Whole))
}
const fail = () => {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . # . . .
        # # . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        # . . . .
        # . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # . . . .
        `)
    showAnswer();
    basic.showIcon(IconNames.Sad)
    showAnswer();
    basic.showIcon(IconNames.Sad)
    showAnswer();
    basic.showIcon(IconNames.Sad)
}

const showAnswer = () => {
    if (type === 0) {
        basic.showLeds(`
            # . . . #
            # # . # #
            # . # . #
            # . . . #
            # . . . #
            `)
    } else if (type === 1) {
        basic.showLeds(`
            . . . . .
            . . . . .
            # . . . #
            # # . # #
            # . # . #
            `)
    } else {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
    }
}
const correct = () => {
    basic.showLeds(`
        . . . . .
        . . . . .
        # . . . .
        . # . . .
        . # . . .
        `)
    basic.showLeds(`
        . . . . .
        # . . . .
        . . . . .
        # . . . .
        # . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        # . . . .
        . . . . .
        `)
}

const lvlUp = () => {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . # . .
        . # # # .
        `)
    basic.showLeds(`
        . . . . .
        . . # . .
        . # # # .
        . . # . .
        . . # . .
        `)
    basic.showLeds(`
        . # # # .
        . . # . .
        . . # . .
        . . . . .
        . . . . .
        `)
basic.showLeds(`
        . . # . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
const lvlDown = () => {
    basic.showLeds(`
        . # # # .
        . . # . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . # . .
        . . # . .
        . # # # .
        . . # . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . # . .
        . # # # .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . # . .
        `)
}

const reset = () => {
    ready = false;
    aPressed = false;
    bPressed = false;
}
let correctCount = 0, incorrectCount = 0, level = 0; // levels from 0 to 4 (5 levels)
const blinkCounterTimes = [3, 2, 2, 1, 1]
const correctThreshold = [4, 8, 8, 12, 0]
const incorrectThreshold = [0, 3, 3, 4, 2]
const run = () => {
    reset();
    playChord();
    // do nothing, wait for press
    let blinkCounter = 0;
    while(!aPressed && !bPressed && blinkCounter < blinkCounterTimes[level]) {
        basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # . . . .
        `)
        basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . # . .
        # . # . .
        `)
        blinkCounter++;
    }
    if (aPressed && type === 0 || bPressed && type === 1 || blinkCounter === blinkCounterTimes[level] && type === 2) {
        correct();
        correctCount++;
        if (correctCount > correctThreshold[level] && level < 4) {
            if (correctCount % 5 == 0) { // free incorrect every 5 turns
                incorrectCount--;
            }
            music.setTempo(bpmPerLevel[level]);
            correctCount = 0;
            incorrectCount = 0;
            level++;
            lvlUp();
        }
        run();
    } else {
        fail();
        incorrectCount++;
        if (incorrectCount > incorrectThreshold[level] && level > 0) {
            music.setTempo(bpmPerLevel[level]);
            incorrectCount = 0;
            correctCount = 0;
            level--;
            lvlDown();
        }
        run();
    }
}
run();
