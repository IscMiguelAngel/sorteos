if (_LOTTERY_.registeredCompetitors === false && _LOTTERY_.registeredAwards === false && _LOTTERY_.lottery === false)
    window.location.href = "/"

if (_LOTTERY_.registeredCompetitors === true && _LOTTERY_.registeredAwards === false && _LOTTERY_.lottery === false)
    window.location.href = "/awards.html"

if (_LOTTERY_.registeredCompetitors === true && _LOTTERY_.registeredAwards === true && _LOTTERY_.lottery === true)
    window.location.href = "/finished.html"

let wheelSpinning = false
let theWheel = null
let wheelPower = 0
let audio = new Audio('src/audio/tick.mp3')
let audioConfetti = new Audio('src/audio/confetti.mp3')
let $_winner = {}, $_award = {}
let competitors = []
let step = 1

const _WINNERS_ = _LOTTERY_.winners
const _AWARDS_ = _LOTTERY_.awards
const _COMPETITORS_ = _LOTTERY_.competitors

const wheelContainer = document.querySelector(".wheel-container")
const randomContainer = document.querySelector(".random-container")
const winnerContainer = document.querySelector(".winner-container")

const btnStart = document.getElementById("btn-start")

const fillCompetitors = async () => {
    competitors = _LOTTERY_.competitors
}

const fillRoulette = async () => {
    const colors = ["#ff6961", "#77dd77", "#fdfd96", "#84b6f4", "#fdcae1", "#f9d99a", "#95fab9", "#bc98f3", "#f47e8e", "#ffbfb0", "#fdcae1", "#c0a0c3"]
    const data = _LOTTERY_.awards.map((award, index) => {
        return {
            "fillStyle": colors[Math.floor(Math.random() * colors.length)],
            "text": award.value,
            "id": award.token
        }
    })

    theWheel = new Winwheel({
        'outerRadius': 299,        // Set outer radius so wheel fits inside the background.
        'innerRadius': 10,         // Make wheel hollow so segments don't go all way to center.
        'textFontSize': 18,         // Set default font size for the segments.
        'textOrientation': 'horizontal', // Make text vertial so goes down from the outside of wheel.
        'textAlignment': 'outer',    // Align text to outside of wheel.
        'numSegments': data.length,         // Specify number of segments.
        'segments': data.sort(() => Math.random() - 0.5),            // Define segments including colour and text.
        // [                               // font size and test colour overridden on backrupt segments.
        //    {'fillStyle' : '#000000', 'text' : 'BANKRUPT', 'textFontSize' : 16, 'textFillStyle' : '#ffffff'},
        // ],
        'animation':           // Specify the animation to use.
        {
            'type': 'spinToStop',
            'duration': 10,    // Duration in seconds.
            'spins': 10,     // Default number of complete spins.
            'callbackFinished': alertPrize,
            'callbackSound': playSound,   // Function to call when the tick sound is to be triggered.
            'soundTrigger': 'pin'        // Specify pins are to trigger the sound, the other option is 'segment'.
        },
        'pins':				// Turn pins on.
        {
            'number': data.length,
            'fillStyle': 'red',
            'outerRadius': 4,
        }
    })
}

function playSound()
{
    audio.pause()
    audio.currentTime = 0
    audio.play()
}

function powerSelected(powerLevel)
{
    if (wheelSpinning == false) {
        wheelPower = powerLevel
    }
}

function startRoulette(element)
{
    element.disabled = true
    if(step === 1)
    {
        if (wheelSpinning == false) {
            if (wheelPower == 1) {
                theWheel.animation.spins = 3
            } else if (wheelPower == 2) {
                theWheel.animation.spins = 6
            } else if (wheelPower == 3) {
                theWheel.animation.spins = 10
            }
    
            theWheel.startAnimation()
    
            wheelSpinning = true
        }
    } else if(step === 2) {
        
        resetWheel()
    }
}

function resetWheel()
{
    theWheel.stopAnimation(false)
    theWheel.rotationAngle = 0
    theWheel.draw()

    wheelSpinning = false
}

function alertPrize(indicatedSegment)
{
    $_award = {
        id: indicatedSegment.id,
        text: indicatedSegment.text
    }

    step = 2

    setTimeout(() => {
        wheelContainer.classList.add("hidden")
        randomContainer.classList.remove("hidden")
        startCounting()
    }, 2000)
}

function startCounting() {
    const loadingElement = document.querySelector(".loading")
    const loadingBackElement = document.querySelector(".loading_back")
    const countingElement = document.getElementById("counting")
    const winnerElement = document.querySelector(".winner")

    loadingElement.classList.add("start")
    loadingBackElement.classList.add("start")

    let number = 10
    const interval = setInterval(() => {
        number--
        countingElement.innerHTML = number

        let interval2 = setInterval(() => {
            playSound()
            if(number > 0) {
                $_winner = randomCompetitor()
                winnerElement.innerHTML = $_winner.value
            } else
                clearInterval(interval2)
        }, 100)
        
        if(number < 1) {
            clearInterval(interval)
            loadingElement.classList.remove("start")
            loadingBackElement.classList.remove("start")
            showWinner()
        }
    }, 1000)
}

function randomCompetitor () {
    return competitors[Math.floor(Math.random() * competitors.length)]
}

function showWinner() {
    const winnerElement = document.getElementById("winner-name")
    const awardElement = document.getElementById("winner-award")
    
    winnerElement.innerHTML = $_winner.value
    awardElement.innerHTML = $_award.text

    randomContainer.classList.add("hidden")
    winnerContainer.classList.remove("hidden")
    
    showConfetti()
}

function showConfetti() {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    playSoundConfetti(0);

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 350 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

function playSoundConfetti() {
    audioConfetti.pause();
    audioConfetti.currentTime = 0;
    audioConfetti.play(); 
}

function confirmWinner(end = false) {
    _WINNERS_.push({
        competitor: $_winner,
        award: {
            token: $_award.id,
            value: $_award.text
        }
    })

    _AWARDS_.filter(award => {
        if(award.token === $_award.id)
            _AWARDS_.splice(_AWARDS_.indexOf(award), 1)
    })

    _COMPETITORS_.filter(competitor => {
        if(competitor.token === $_winner.token)
            _COMPETITORS_.splice(_COMPETITORS_.indexOf(competitor), 1)
    })

    localStorage.setItem("lottery", JSON.stringify({
        ..._LOTTERY_,
        awards: _AWARDS_,
        competitors: _COMPETITORS_,
        winners: _WINNERS_
    }))

    if(!end)
        setTimeout(() => {
            window.location.reload()
        }, 2000)
}

function endLottery() {
    confirmWinner(true)

    localStorage.setItem("lottery", JSON.stringify({
        ..._LOTTERY_,
        lottery: true
    }))

    window.location.href = "/finished.html"
}

fillRoulette()
fillCompetitors()