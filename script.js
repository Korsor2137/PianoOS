const startButton = document.getElementById("startButton");
const background = document.getElementById("background");
const welcomeCard = document.getElementById("welcomeCard");
const pianoUI = document.getElementById("pianoUI");
const BumWnętrzeKurwa = document.querySelector(".implosion-core");
const lights = [...document.querySelectorAll(".swiec")];
const impactFlash = document.getElementById("impactFlash");
const starCanvas = document.getElementById("starCanvas");
const impactCanvas = document.getElementById("impactCanvas");
const particleCanvas = document.getElementById("particleCanvas");
const nutki = document.getElementById("nutki");
const pianoArea = document.querySelector(".piano-area");
const piano = document.getElementById("piano");
const pianoKeys = document.getElementById("pianoKeys");
const hideVkeyboard = document.getElementById("hideVkeyboard");
const popup = document.getElementById("tenpopup");
const midiYes = document.getElementById("midiTAK");
const midiNo = document.getElementById("midiNIE");
const popupYesMidi = document.getElementById("popupMidiTak");
const midiStatus = document.getElementById("midiStatus");
const koneksjaChujnia = document.getElementById("connectionIndicator");
const topTekst = document.getElementById("topTekst");
const masterVolume = document.getElementById("masterVolume");
const pianoVolume = document.getElementById("pianoVolume");
const metronomeVolume = document.getElementById("metronomeVolume");
const tempoElementarnaCząstkaNig = document.getElementById("tempo");
const starContext = starCanvas.getContext("2d");
const impactContext = impactCanvas.getContext("2d");
const particleContext = particleCanvas.getContext("2d");
const noteContext = nutki.getContext("2d");

//making consts at start is ai like? damn
//why tf did i even bother to move them here
//eh
//don't care
//tho i prob should stop
let audioContext = null;
let masterGain = null;
let pianoGain = null;
let metronomeGain = null;



let audioInitialized = false;
//*********************************************************** */
// configs
//change '...Duration' setting if things are TAKING TOO LONG


//another undertale/deltarune refernece





const configIntro = 
{
    orbitSize:
        Math.min(
            window.innerWidth,
            window.innerHeight
        ) * 0.36,

    speedStart:
        (Math.PI * 2) / 24,

    finalSpeed:
        Math.PI * 12,

    accelDuration: 1000,
    collapseDuration: 1500

};

const audioStateMoje = 
{
    masterVolume: 1,
    pianoVolume: 0.6,
    metronomeVolume: 0.7
};


//keyboard to piano wowwww


//IMPORTANT NOTE ***************************************
//IF YOU CAN'T PLAY SOME CHORDS, IT'S AN ISSUE WITH YOUR KEYBOARD
//or well, many keyboards
//simply most keyboards use grid based circuits (keyboard matrix), and prevent from pressing some keys at once, for example try typing '8 9 and i' at once, it probably won't work and
//youll either type first 'i' and then the rest or '89' and then 'i'
//so you can't press them at once or there may be delay
//so yeah
//you can change keyboard map to alt, simply write /* */ around this keyboard map and delete them around alt mapping
//gah
//or just play on the lower octave (zxcvbnm,./)

//zaza
//zaza plaza
const keyboardMap = 
{

     q: 57,
    2: 58, 
    w: 59, 
    e: 60,
    4: 61,
    r: 62,
    5: 63,
    t: 64,
    y: 65,
    7: 66,
    u: 67,
    8: 68,
    i: 69,
    9: 70,
    o: 71,
    p: 72,
    "-": 73,
    "[": 74,
    "=": 75,
    "]": 76,

    "'": 56,
    "/": 55,
    ";": 54,
    ".": 53,
    ",": 52,
    k: 51,
    m: 50,
    j: 49,
    n: 48,
    b: 47,
    g: 46,
    v: 45,
    f: 44,
    c: 43,
    d: 42,
    x: 41,
    z: 40


};

const capsKeyboardMap = 
{
    q: 45,  
    2: 46, 
    w: 47, 
    e: 48,
    4: 49,
    r: 50,
    5: 51,
    t: 52,
    y: 53,
    7: 54,
    u: 55,
    8: 56,
    i: 57,
    9: 58,
    o: 59,
    p: 60,
    "-": 61,
    "[": 62,
    "=": 63,
    "]": 64,

    "'": 44,
    "/": 43,
    ";": 42,
    ".": 41,
    ",": 40,
    k: 39,
    m: 38,
    j: 37,
    n: 36,
    b: 35,
    g: 34,
    v: 33,
    f: 32,
    c: 31,
    d: 30,
    x: 29,
    z: 28

};

/* old settings
const keyboardMap = {
    q: 59, //only exists to play still dre loolololololol
    a: 60, //60 = C4, change to your liking
    w: 61,
    s: 62,
    e: 63,
    d: 64,
    f: 65,
    t: 66,
    g: 67,
    y: 68,
    h: 69,
    u: 70,
    j: 71,
    k: 72,
    o: 73,
    l: 74,
    p: 75,
    ";": 76,
    "'": 77

};


const capsKeyboardMap = {

    a: 48, //48 = C3
    w: 49,
    s: 50,
    e: 51,
    d: 52,
    f: 53,
    t: 54,
    g: 55,
    y: 56,
    h: 57,
    u: 58,
    j: 59,
    k: 60,
    o: 61,
    l: 62,
    p: 63,
    ";": 64,
    "'": 65

};




alt keyboard settings:

const keyboardMap = 
{
    q: 57,
    w: 59,
    e: 60,
    r: 62,
    t: 64,
    y: 65,
    u: 67,
    i: 69,
    o: 71,
    p: 72,

    a: 58,
    s: 61,
    d: 63,
    f: 66,
    g: 68,
    h: 70,
    j: 73,
    k: 74,
    l: 75,
    ";": 76,

    z: 40,
    x: 41,
    c: 43,
    v: 45,
    b: 47,
    n: 48,
    m: 50,
    ",": 52,
    ".": 53,
    "/": 55,
    "'": 56
};

const capsKeyboardMap = 
{
    q: 45,
    w: 47,
    e: 48,
    r: 50,
    t: 52,
    y: 53,
    u: 55,
    i: 57,
    o: 59,
    p: 60,

    a: 46,
    s: 49,
    d: 51,
    f: 54,
    g: 56,
    h: 58,
    j: 61,
    k: 62,
    l: 63,
    ";": 64,

    z: 28,
    x: 29,
    c: 31,
    v: 33,
    b: 35,
    n: 36,
    m: 38,
    ",": 40,
    ".": 41,
    "/": 43,
    "'": 44
};
*/





//piano sustain configs


let sustainPedalDown =
    false; //pretty selfesxplainatory


const keyElements = new Map();
const activeNotes = new Map();
const pressedKeyboardKeys = new Set();
const activeVoices = new Map();
const sustainedNotes = new Map();


const NOTE_RELEASE_DURATION = 0.32;
const NOTE_RELEASE_QUIET_POINT = 0.30;
const MINIMUM_NOTE_DURATION = 0.14;


const FIRST_MIDI_NOTE = 21;
const LAST_MIDI_NOTE = 108;


//and ill add more but im too lazy for now



































startButton.addEventListener
(
    "click",
    async () => {

        if (
            startMoment !== null
        ) {
            return;
        }


        initializeAudio();
        await resumeAudio();
        loadPianoSamples();


        introSound1.currentTime =
            0;

        introSound1.play();
        


        background.classList.add(
            "started"
        );


        startButton.disabled =
            true;

        startButton.textContent =
            "Launching..."; //like a rocket

        welcomeCard.style.transform =
            `
            translate(-50%, -50%)
            translateY(-20px)
            scale(0.96)
            `;


        welcomeCard.style.opacity =
            "0";
        welcomeCard.style.filter =
            "blur(10px)";


        startMoment =
            performance.now();
    }
);





















function initializeAudio() 
{

    if 
    (audioInitialized) {
        return;
    }


    const AudioContextClass = window.AudioContext || window.webkitAudioContext;


    if 
    (!AudioContextClass) {
        console.error(
            "error with web audio"
        );
        return;
    }


    audioContext = new AudioContextClass();


    masterGain = audioContext.createGain();
    pianoGain = audioContext.createGain();
    metronomeGain = audioContext.createGain();


        pianoGain.connect(masterGain);
        metronomeGain.connect(masterGain);


    masterGain.connect(audioContext.destination);


    masterGain.gain.value = audioStateMoje.masterVolume;
    pianoGain.gain.value = audioStateMoje.pianoVolume;
    metronomeGain.gain.value = audioStateMoje.metronomeVolume;
    audioInitialized = true;
}


async function resumeAudio() 
{
    if (!audioContext) 
        {
            return;}


    if (
        audioContext.state ===
        "suspended"
    ) {
        try {
            await audioContext.resume();
        } catch (error) {
            console.error(
                "Eror, could not resume audio:",
                error
            );
        }
    }
}


//audio guziks
function updateAudioVolume(
    element,
    stateKey,
    getGainNode
) 

{

    if (!element) {
        return;
    }


    element.addEventListener(
        "input",
        event => {

            const value =
                Number(
                    event.target.value);

            audioStateMoje[stateKey] =
                value;


            const gainNode =
                getGainNode();

            if (
                gainNode &&
                audioContext) 
            
            {

                gainNode.gain.setTargetAtTime(
                    value,
                    audioContext.currentTime, 0.015
                );
            }





            saveAudioSettings();
        }
    );
}


updateAudioVolume(
    masterVolume,
    "masterVolume",
     () => masterGain
);

updateAudioVolume(
    pianoVolume,
    "pianoVolume",
    () => pianoGain
);

updateAudioVolume(
    metronomeVolume,
    "metronomeVolume",
    () => metronomeGain
);


let startMoment = null;
let orbitAngle = 0;

let orbitSpeed =configIntro.speedStart;
let orbitSkala = 1;



let lastTime = performance.now();


let impactStarted = false;
let introFinished = false;

//intro sounds permamently borrowed from some free site i dont remember
const introSound1 =
    new Audio(
        "assets/introMusic/FirstIntroSound.mp3"
    );

const introSound2 =
    new Audio(
        "assets/introMusic/trueSecondsound.mp3"
    );


introSound1.preload = "auto";
introSound2.preload = "auto";



//steal code and just change the parameter
//but really tho its just math
function easeInCubic(t) {
    return 1 - Math.pow(1 - t, 3);


}


function easeInQuint(t) {
    return t * t * t * t * t;
}
//math meth

function clamp(
    value,
    min,
    max
) {
    return Math.min(
        Math.max(value, min),
        max
    );
}

//intro 7 soul blobs

function updateLights(now) {

    if (impactStarted) 
    {
        return;
    }




    //Linder my coach of success

    const deltaTime =
        Math.min(
            (now - lastTime) / 1000,
            0.05
        );



    
    if 
    (
    
        startMoment === null
    ) 
    {

        orbitAngle +=
            configIntro.speedStart * deltaTime;

        updateBlobTransforms();

        lastTime = now;
        return;
    }

    const elapsed = now - startMoment;

    if 
    (
        elapsed <=
        configIntro.accelDuration
    ) 
    
    {

        const progress =clamp
            (
                elapsed /configIntro.accelDuration, 0, 1
            
            );


        const eased =easeInCubic
        (
                progress
            );


        orbitSpeed =configIntro.speedStart +
            (
                configIntro.finalSpeed -
                configIntro.speedStart
            ) * eased;


        orbitSkala =
            1 - progress * 0.04;

    } else {

        const collapseElapsed =elapsed - configIntro.accelDuration;


        const progress =
            clamp
            
            (
                collapseElapsed / configIntro.collapseDuration, 0, 1
            );


        const eased = easeInQuint(progress);


        orbitSkala =
            0.96 - eased * 0.91;
            //random values GO


        orbitSpeed =
            configIntro.finalSpeed +
            eased * Math.PI * 10;


        if (
            progress >= 1
        ) {

            beginImpact();

            lastTime =
                now;

            return;
        }
    }
//starting to think my old comments are kinda random
//some were brought back from older version of the project

    orbitAngle +=
        orbitSpeed *
        deltaTime;


    updateBlobTransforms();


    if (
        elapsed >
        configIntro.accelDuration
    ) {

        const progress =
            clamp(
                (
                    elapsed -
                    configIntro.accelDuration
                ) /
                configIntro.collapseDuration,
                0,
                1
            );


        const eased =
            easeInCubic(
                progress
            );


        background.style.setProperty(
            "--backgroundbrightness",
            String(
                1 -
                eased * 0.72
            )
        );
    }


    lastTime =
        now;
}


function updateBlobTransforms() {
    lights.forEach( 
        (light, index) => {

            const angle =
                orbitAngle +
                (
                    index *
                    Math.PI *
                    4 /
                    lights.length
                );


            const radius = configIntro.orbitSize * orbitSkala;


            const collapseAmount =
                1 -
                orbitSkala;


            const blobScale =
                1 +
                Math.pow(
                    collapseAmount,
                    2
                ) * 2.8;


            const blur =
                24 +
                Math.pow(
                    collapseAmount,
                    2
                ) * 48;

            const opacity =
                0.54 + collapseAmount * 0.38;


            light.style.transform =
                `
                rotate(${angle}rad)
                translateX(${radius}px)
                rotate(${-angle}rad)
                scale(${blobScale})`;

            light.style.opacity =
                opacity;

            light.style.filter =
                `blur(${blur}px)`;
        }
    );
}


function beginImpact() { //pssst, mostly ai gen part
    if (impactStarted) {
        return;
    }


    impactStarted =
        true;


    introSound1.pause();


    lights.forEach(
        light => {

            light.style.transition =
                `
                opacity 240ms ease,
                filter 240ms ease
                `;

            light.style.opacity =
                "0";

            light.style.filter =
                "blur(70px)";
        }
    );


    BumWnętrzeKurwa.style.transition =
        `transform 700ms
         cubic-bezier(
            0.16,
            1,
            0.3,
            1),
        opacity 480ms ease-out,
        filter 480ms ease-out`;


    BumWnętrzeKurwa.style.transform =
        "scale(16)";


    BumWnętrzeKurwa.style.opacity =
        "0";


    BumWnętrzeKurwa.style.filter =
        "blur(38px)";


    impactFlash.style.transition =
        "opacity 80ms ease-out";


    impactFlash.style.opacity =
        "1";


    introSound2.currentTime =
        0;

    introSound2.play().catch(
        () => {}
    );


    setTimeout(
        () => {

            impactFlash.style.transition =
                "opacity 650ms ease-out";

            impactFlash.style.opacity =
                "0";

        },

        80
    );


    createCoreExplosion();


    setTimeout(
        () => {

            BumWnętrzeKurwa.style.display =
                "none";

        },

        800

    );


    setTimeout(
        () => {

            background.classList.add(
                "post-impact"
            );

        },

        520

    );


    setTimeout(
        finishIntro,

        620

    );
}


function finishIntro() {

    if (introFinished) {
        return;
    }

    introFinished =
        true;


    pianoUI.classList.add(
        "visible"
    );

    setTimeout(
        () => {

            popup.classList.add(
                "active"
            );

            popup.setAttribute(
                "aria-hidden",
                "false"
            );

        },

        900
    );
}







function updateSampleLoader(
    loaded,
    total
) {

    const loader =
        document.getElementById(
            "pianoSampleLoader"
        );

    const percent =
        Math.round(
            loaded /
            total *
            100
        );

    const percentElement =
        document.getElementById(
            "sampleLoaderPercent"
        );

    const bar =
        document.getElementById(
            "sampleLoaderBar"
        );


    if (
        !loader ||
        !percentElement ||
        !bar
    ) {
        return;
    }


    percentElement.textContent =
        `${percent}%`;

    bar.style.width =
        `${percent}%`;


    if (
        percent >= 100
    ) {

        loader.classList.add(
            "complete"
        );

        loader.setAttribute(
            "aria-hidden",
            "true"
        );
    }
}


const sampleNoteNames = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"
];


function getSampleFilename(
    midi
) {
//aii for tedious tasksss
    const note =
        sampleNoteNames[
            midi % 12
        ];


    const naturalNote =
        note.replace(
            "#",
            ""
        );


    const octave =
        Math.floor(
            midi / 12
        ) - 1;


    let stem;

    if (
        naturalNote === "A" ||
        naturalNote === "B"
    ) {

        if (octave === 0) {

            stem =
                naturalNote.toUpperCase() +
                "_2";

        } else if (
            octave === 1
        ) {

            stem =
                naturalNote.toUpperCase() +
                "_1";

        } else if (
            octave === 2
        ) {

            stem =
                naturalNote.toUpperCase();

        } else if (
            octave === 3
        ) {

            stem =
                naturalNote
                    .toLowerCase()
                    .repeat(2);

        } else {

            stem =
                naturalNote.toLowerCase() +
                (octave - 3);
        }

    } else if (
        octave === 1
    ) {

        stem =
            naturalNote.toUpperCase() +
            "_1";

    } else if (
        octave === 2
    ) {

        stem =
            naturalNote.toUpperCase();

    } else if (
        octave === 3
    ) {

        stem =
            naturalNote
                .toLowerCase()
                .repeat(2);

    } else {

        stem =
            naturalNote.toLowerCase() +
            (octave - 3);
    }


    return note.includes("#")
        ? `${stem}s`
        : stem;
}


const pianoSamples =
    Array.from(
        {
            length: 88
        },
        (_, index) => {

            const midi =
                FIRST_MIDI_NOTE +
                index;


            return {
                midi,
                file:
                    getSampleFilename(
                        midi
                    ),
                buffer: null
            };
        }
    );


let sampleLoadPromise =
    null;


async function loadPianoSamples() {

    if (sampleLoadPromise) {
        return sampleLoadPromise;
    }


    initializeAudio();


    sampleLoadPromise =
        (async () => 
            
            {

            let loaded = 0;

            const total =
                pianoSamples.length;


            const workerCount =
                Math.min(
                    8,
                    total
                );


            let nextIndex =
                0;


            async function worker() {

                while (true) {

                    const index =
                        nextIndex++;


                    if (
                        index >= total
                    ) 
                    {
                        return;
                    }


                    const sample =
                        pianoSamples[index];


                    try {

                        const response =
                            await fetch
                            (
                                `./assets/piano/${sample.file}.mp3`
                            );


                        if 
                        (
                            !response.ok
                        ) 
                        {

                            throw new Error(
                                `HTTP ${response.status}`
                            );
                        }


                        const arrayBuffer =
                            await response.arrayBuffer();


                        sample.buffer =
                            await audioContext.decodeAudioData(
                                arrayBuffer
                            );

                    } catch 

                    (
                        error
                    ) 
                    
                    {

                        console.error(
                            `Could not load ${sample.file}.mp3`,
                            error
                        );

                    } finally {

                        loaded++;

                        updateSampleLoader(
                            loaded,
                            total
                            
                        );
                    }
                }
            }


            await Promise.all(
                Array.from(
                    {
                        length:
                            workerCount
                    },
                    () => worker()
                )
            );


            console.log(
                "Piano samples readyyyyyy."
            );
        })();


    return sampleLoadPromise;
}


function getNearestPianoSample(
    midi
) {

    let nearest =
        null;

    let nearestDistance =
        Infinity;


    for (
        const sample
        of pianoSamples
    ) {

        if (
            !sample.buffer
        ) {
            continue;
        }


        const distance =
            Math.abs(
                sample.midi -
                midi
            );


        if (
            distance <
            nearestDistance
        ) {

            nearest =
                sample;

            nearestDistance =
                distance;
        }
    }

    return nearest;
}

function playPianoNote(
    midi,
    velocity = 0.8
) {

    if (!audioInitialized) {
        initializeAudio();
    }

    if (
        !audioContext ||
        !pianoGain
    ) {
        return null;
    }

    resumeAudio();

    
    const sample = getNearestPianoSample(midi);
        if( 
            !sample || !sample.buffer
        ) { return null;}

        
    const source = audioContext.createBufferSource();
    const gain = audioContext.createGain();




    source.buffer =
        sample.buffer;


    source.playbackRate.value =
        Math.pow(
            2,
            (
                midi -
                sample.midi
            ) / 12
        );


    gain.gain.value =
        Math.max(
            0.05,
            velocity
        );


    source.connect(
        gain
    );


    gain.connect(
        pianoGain
    );


    source.start();


    return {
        source,
        gain,
        startedAt: audioContext.currentTime,
        released: false,
        releaseTimer: null
        
    };
}







const noteNames = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"
];


const blackPitchClasses =
    new Set([
        1,
        3,
        6,
        8,
        10
    ]);


function getNoteName(
    midi
) {

    const octave =
        Math.floor(
            midi / 12
        ) - 1;


    return (
        noteNames[
            midi % 12
        ] +
        octave
    );
}



function createKey(
    midi,
    type
) {

    const key =
        document.createElement(
            "div"
        );


    key.className =
        `key ${type}`;


    key.dataset.midi =
        String(midi);


    key.dataset.note =
        getNoteName(midi);


    const pitchClass =
        midi % 12;


    const isWhite =
        type === "white";


    const label =
        document.createElement(
            "span"
        );


    label.className =
        "key-label";


    if (isWhite) {

        if (
            pitchClass === 0
        ) {

            label.textContent =
                getNoteName(midi);

        } else {

            label.textContent =
                noteNames[
                    pitchClass
                ];
        }

    } else {

        label.textContent =
            "";
    }


    key.appendChild(
        label
    );


    key.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();


            key.setPointerCapture(
                event.pointerId
            );


            noteOn(
                midi,
                0.85,
                "pointer"
            );
        }
    );


    key.addEventListener(
        "pointerup",
        event => {

            event.preventDefault();


            noteOff(
                midi,
                "pointer"
            );
        }
    );


    key.addEventListener(
        "pointercancel",
        () => {

            noteOff(
                midi,
                "pointer"
            );
        }
    );


    key.addEventListener(
        "pointerleave",
        event => {

            if (
                event.buttons === 0
            ) {

                noteOff(
                    midi,
                    "pointer"
                );
            }
        }
    );


    return key;
}




//remade it myself while listening to The angry birds extinction theory lol 


function createPiano() {

    while (pianoKeys.firstChild) {
    pianoKeys.removeChild(pianoKeys.firstChild);
}
    keyElements.clear();
    const whiteKeys = [];


    for (
        let midi = FIRST_MIDI_NOTE;

            midi <= LAST_MIDI_NOTE;

        midi++
    ) {

        const pitchClass =
            midi % 12;


        if (
            !blackPitchClasses.has(
                pitchClass
            )
        ) {

            whiteKeys.push(
                midi
            );
        }
    }


    const whiteWidth =
        100 /
        whiteKeys.length;


    whiteKeys.forEach(
        (
            midi,
            index
        ) => {

            const key =
                createKey(
                    midi,
                    "white"
                );


                key.style.left =
                    `${index * whiteWidth}%`;

                key.style.width =
                    `${whiteWidth}%`;

            pianoKeys.appendChild(
                key
            );


            keyElements.set(
                midi,
                key
            );
        }
    );


    let whiteIndex =
        0;


    const blackWidth =
        whiteWidth * 0.62;


    for (
        let midi =
            FIRST_MIDI_NOTE;

        midi <=
        LAST_MIDI_NOTE;

        midi++
    ) {

        const pitchClass =
            midi % 12;


        if (
            blackPitchClasses.has(
                pitchClass
            )
        ) {

            const key =
                createKey(
                    midi,
                    "black"
                );


            key.style.width =
                `${blackWidth}%`;


            key.style.left = `calc(${whiteIndex * whiteWidth}% - ${blackWidth / 2}%)`;
            
            pianoKeys.appendChild(
                key
            );
            keyElements.set(
                midi,
                key
            );

        } else {

            whiteIndex++;
        }
    }
}












function noteOn(
    midi,
    velocity = 0.8,
    source = "unknown"
) {

    const key =
        keyElements.get(
            midi
        );


    if (!key) 
        {
        return;
    }


    const noteKey =
        `${source}-${midi}`;


    releaseNoteVoice
    (
        noteKey,
        true
    );


    activeNotes.set
    (
        noteKey,
        midi
    );


    sustainedNotes.delete
    (
        noteKey
    );


    key.classList.add
    (
        "active"
    );


    key.style.setProperty
    (
        "--velocity",
        String(velocity)
    );


    const voice =
        playPianoNote(
            midi,
            velocity
        );


    if (voice) 
        {

        activeVoices.set(
            noteKey,
            voice
        );
    }





    createFallingNote(
        midi,
        velocity
    );
    //will make it sometime ig
    // only if this finally gets verified
    //maybe i should add some lore to the comments
    //adventurer, defeat the demon king type shi
}



function releaseNoteVoice(
    noteKey,
    force = false
) {

    const voice =
        activeVoices.get(
            noteKey
        );


    if (
        !voice ||
        voice.released
    ) {
        return;
    }


    if (
        voice.releaseTimer
    ) {

        clearTimeout(
            voice.releaseTimer
        );

        voice.releaseTimer =
            null;
    }


    if (
        !audioContext
    ) {
        return;
    }


    const elapsed =
        audioContext.currentTime -
        voice.startedAt;


    if (
        !force &&
        elapsed <
            MINIMUM_NOTE_DURATION
    ) {

        voice.releaseTimer =
            setTimeout(
                () => {

                    releaseNoteVoice(
                        noteKey
                    );

                },
                (
                    MINIMUM_NOTE_DURATION -
                    elapsed
                ) * 1000
            );


        return;
    }


    voice.released =
        true;


    const now =
        audioContext.currentTime;


    voice.gain.gain
        .cancelScheduledValues(
            now
        );


    const currentGain =
        Math.max(
            0.0001,
            voice.gain.gain.value
        );


    voice.gain.gain
        .setValueAtTime(
            currentGain,
            now
        );


    voice.gain.gain
        .exponentialRampToValueAtTime(
            0.025,
            now +
                NOTE_RELEASE_QUIET_POINT
        );


    voice.gain.gain
        .exponentialRampToValueAtTime(
            0.0001,
            now +
                NOTE_RELEASE_DURATION
        );


    voice.source.stop(
        now +
        NOTE_RELEASE_DURATION +
        0.02
    );


    activeVoices.delete(
        noteKey
    );
}


function noteOff(
    midi,
    source = "unknown"
) {

    const noteKey =
        `${source}-${midi}`;

    const key =
        keyElements.get(
            midi
        );

    activeNotes.delete(
        noteKey
    );

    if (
        sustainPedalDown
    ) {

        sustainedNotes.set(
            noteKey,
            midi
        );

        if (key) {
            key.classList.remove(
                "active"
            );
        }

        return;
    }

    releaseNoteVoice(
        noteKey
    );

    let stillHeld =
        false;

    for (
        const activeMidi
        of activeNotes.values()
    ) {

        if (
            activeMidi === midi
        ) {

            stillHeld =
                true;

            break;
        }
    }

    if (
        stillHeld
    ) {
        return;
    }

    if (!key) {
        return;
    }

    key.classList.remove(
        "active"
    );
}



function releaseSustainedNotes() {

    sustainedNotes.forEach(
        (
            midi,
            noteKey
        ) => {

            releaseNoteVoice(
                noteKey
            );


            const key =
                keyElements.get(
                    midi
                );
            

            const stillHeld =
                [...activeNotes.values()]
                    .some(
                        activeMidi =>
                            activeMidi === midi
                    );


            if (
                key &&
                !stillHeld 
            
            )
            {

                key.classList.remove(
                    "active"
                );
            }
            
        }
    );


    sustainedNotes.clear();
}




function getKeyboardMidi(
    event
) {

    const key =
        event.key.toLowerCase();


    const map =
        event.getModifierState(
            "CapsLock"
        )
            ? capsKeyboardMap
            : keyboardMap;


    return map[key];
}


window.addEventListener
(
    "keydown",
    event => 
    {
        const editing =
            event.target instanceof HTMLTextAreaElement ||
            event.target instanceof HTMLInputElement ||
            event.target.isContentEditable;

        if 
        (
            event.code === "Space"
        )
        {
            sustainPedalDown = true;
            if (!editing)
            {
                event.preventDefault();
            }

            return;
        }

        const midi =
            getKeyboardMidi(
                event
            );

        if 
        (
            midi === undefined
        )
        {
            return;
        }
        if 
        (
            pressedKeyboardKeys.has
            (
                event.code
            )
        )
        {
            return;
        }
        pressedKeyboardKeys.add(event.code);
        noteOn(midi, 0.82, "keyboard");

        if (!editing)
        {
            event.preventDefault();
        }
    }
);

window.addEventListener
(
    "keyup",
    event => 
    {
        const editing =
            event.target instanceof HTMLTextAreaElement ||
            event.target instanceof HTMLInputElement ||
            event.target.isContentEditable;

        if 
        (
            event.code === "Space"
        )
        {
            sustainPedalDown = false;
            releaseSustainedNotes();

            if (!editing)
            {
                event.preventDefault();
            }
            return;
        }
        const midi = getKeyboardMidi(event);

        if 
        (
            midi === undefined
        )
        {
            return;
        }
        pressedKeyboardKeys.delete(event.code);

        noteOff(midi, "keyboard");
        if (!editing)
        {
            event.preventDefault();
        }
    }
);

//gwiazdki są fajne w sumie
//może falling notesy bedą też tak błyszczeć

const stars =
    [];


function resizeCanvas(
    canvas,
    context
) {

    const rect =
        canvas.getBoundingClientRect();


    const dpr =
        Math.min(
            window.devicePixelRatio ||
            1,
            2
        );


    canvas.width =
        Math.max(
            1,
            Math.floor(
                rect.width * dpr
            )
        );


    canvas.height =
        Math.max(
            1,
            Math.floor(
                rect.height * dpr
            )
        );


    context.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );
}


function resizeAllCanvases() {

    resizeCanvas(
        starCanvas,
        starContext,
        nutki, //useless, delete or add them someday
        noteContext, 
        impactCanvas, 
        impactContext,
        particleCanvas, //same
        particleContext 

    );



}


function createStars() {

    stars.length =
        0;


    const width =
        starCanvas.clientWidth;


    const height =
        starCanvas.clientHeight;


    const amount =
        Math.floor(
            (
                width *
                height
            ) /
            18000
        );


    for (
        let i = 0;
        i < amount;
        i++
    ) {
    
        stars.push({

            x:
                Math.random() *
                width,
            y:
                Math.random() *
                height,
            size:
                0.45 +
                Math.random() * 1.35,
            alpha:
                0.12 +
                Math.random() * 0.55,
            phase:
                Math.random() *
                Math.PI *
                2,
            speed:
                0.25 +
                Math.random() * 0.5
        });
    }
}


function updateStars(
    deltaTime
) {

    const width =
        starCanvas.clientWidth;

    const height =
        starCanvas.clientHeight;

    starContext.clearRect(
        0,
        0,
        width,
        height
    );


    stars.forEach(
        star => {

            star.phase +=
                deltaTime *
                star.speed;


            const flicker =
                (
                    Math.sin(
                        star.phase
                    ) + 1
                ) / 2;


            const alpha =
                0.10 +
                flicker * 0.62;


            starContext.beginPath();


            starContext.arc(
                star.x,
                star.y,
                star.size,
                0,
                Math.PI * 2
            );


            starContext.fillStyle =
                `
                rgba(
                    255,
                    255,
                    255,
                    ${alpha}
                )
                `;


            starContext.shadowBlur =
                5;


            starContext.shadowColor =
                `
                rgba(
                    255,
                    255,
                    255,
                    ${alpha}
                )
                `;


            starContext.fill();
        }
    );
}


//particlesy szmegesy do wywalenia niektóresy
const impactParticles =
    [];


function createCoreExplosion() {


    const width = impactCanvas.clientWidth;
    const height = impactCanvas.clientHeight;

    const centerX =
        width / 2;


    const centerY =
        height / 2;


    const amount =
        window.innerWidth < 700
            ? 90
            : 170;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            80 +
            Math.random() *
            680;


        const life =
            0.45 +
            Math.random() *
            1.15;


        impactParticles.push({

            x: centerX,
            y: centerY,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life,
            maxLife: life,

            size:
                0.8 +
                Math.random() * 3.8
        });
    }
}


function updateImpactParticles (deltaTime) 

{

    const width =
        impactCanvas.clientWidth;


    const height =
        impactCanvas.clientHeight;


    impactContext.clearRect(
        0,
        0,
        width,
        height
    );


    for (
        let i =
            impactParticles.length - 1;

        i >= 0;

        i--
    ) {

        const particle =
            impactParticles[i];


        particle.x +=
            particle.vx *
            deltaTime;


        particle.y +=
            particle.vy *
            deltaTime;

        particle.vx *=
            Math.pow
            (
                0.988,
                deltaTime * 60
            );


        particle.vy *=
            Math.pow
            (
                0.988,
                deltaTime * 60
            );


        particle.life -=
            deltaTime;


        if 
        (
            particle.life <= 0
        ) 
        
        {

            impactParticles.splice
            (
                i,
                1
            );

            continue;
        }


        const alpha =
            particle.life /
            particle.maxLife;


        impactContext.beginPath();


        impactContext.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );


        impactContext.fillStyle =
            `
            rgba(
                230,
                210,
                255,
                ${alpha}
            )
            `;


        impactContext.shadowBlur =
            12;


        impactContext.shadowColor =
            `
            rgba(
                170,
                100,
                255,
                ${alpha}
            )
            `;


        impactContext.fill();
    }
}


let midiAccess =
    null;

let midiToastTimer =
    null;


function showMidiToast(
    message
) {

    const paragraph =
        popupYesMidi.querySelector(
            "p"
        );


    if (paragraph) {
        paragraph.textContent =
            message;
    }


    popupYesMidi.classList.add(
        "visible"
    );


    popupYesMidi.setAttribute(
        "aria-hidden",
        "false"
    );


    clearTimeout(
        midiToastTimer
    );


    midiToastTimer =
        setTimeout(
            () => {

                popupYesMidi.classList.remove(
                    "visible"
                );


                popupYesMidi.setAttribute(
                    "aria-hidden",
                    "true"
                );

            },
            2200
        );
}


function setMidiStatus(
    message,
    connected
) {

    if (!midiStatus) 
    {
        return;
    }


    midiStatus.textContent =
        message;


    midiStatus.classList.toggle
    (
        "connected",
        connected
    );


    if (koneksjaChujnia) 
    {

        koneksjaChujnia.classList.toggle(
            "connected",
            connected
        );
    }
}

async function requestMIDI() {

    if (
        !navigator.requestMIDIAccess
    ) {

        setMidiStatus(
            "MIDI unavailable, L",
            false
        );


        showMidiToast(
            "Whatever happened, something's wrong"
        );


        return;
    }


    try {

        midiAccess =
            await navigator.requestMIDIAccess();


        connectMIDI(
            midiAccess
        );


        showMidiToast(
            "MIDI ready boi, go on"
        );

    } catch (
        error
    ) {

        console.error(
            "MIDI access error lol",
            error
        );


        setMidiStatus(
            "MIDI access denied, sadge",
            false
        );


        showMidiToast(
            "MIDI access unavailable, skill issue"
        );
    }
}


function connectMIDI(
    access
) 

{

    let connected =
        false;


    for (
        const input
        of access.inputs.values()
    ) {

        connected =
            true;


        input.onmidimessage =
            handleMIDIMessage;
    }


    if (connected) {

        setMidiStatus(
            "MIDI connected, get playin'",
            true
        );

    } else {

        setMidiStatus(
            "No MIDI device", //insert megamind meme
            false
        );
    }


    access.onstatechange =
        () => {

            connectMIDI(
                access
            );
        };
}


function handleMIDIMessage (event) 

{

    const data =
        event.data;





    if 
    (
        !data ||
        data.length < 3
    ) 

    {
        return;
    }

    const [
        status,
        note,
        velocity
        ] = data;


    const command =
        status & 0xf0;




    if 
    (
        command === 0xb0 &&
        note === 64
    ) 
    {

        const pedalDown =
            velocity >= 64;




        if 
        (
            pedalDown !==
            sustainPedalDown
        ) 
        {

            sustainPedalDown =
                pedalDown;


            if 
            (
                !pedalDown
            )
            {

                releaseSustainedNotes();
            }
        }


        return;
    }





    if 
    (
        command === 0x90 &&
        velocity > 0
    ) 
    {

        noteOn(
            note,
            velocity / 127,
            "midi"
        );


        return;
    }





    if 
    (
        command === 0x80 ||
        (
            command === 0x90 &&
            velocity === 0
        )
    ) 
    {

        noteOff(
            note, "midi"
        );
    }
}


if (midiYes) 
{

    midiYes.addEventListener(
        "click",
        async () => {

            popup.classList.remove(
                "active"
            );


            popup.setAttribute(
                "aria-hidden",
                "true"
            );


            await requestMIDI();
        }
    );
}


if (midiNo) 
{

    midiNo.addEventListener(
        "click",
        () => {

            popup.classList.remove(
                "active"
            );


            popup.setAttribute(
                "aria-hidden",
                "true"
            );


            setMidiStatus(
                "No MIDI for you",
                false
            );


            showMidiToast(
                "MIDI access not granted"
            );
        }
    );
}

// bind to a keyboard key in the future
if (hideVkeyboard) 
{

    hideVkeyboard.addEventListener(
        "click",
        () => {

            const hidden =
                pianoArea.classList.toggle(
                    "keyboard-hidden"
                );


            hideVkeyboard.classList.toggle(
                "hidden-state",
                hidden
            );


            hideVkeyboard.setAttribute(
                "aria-pressed",
                String(hidden)
            );


            hideVkeyboard.textContent =
                hidden
                    ? "▲"
                    : "▼";
        }
    );
}
































const appWindows =
    [
        ...document.querySelectorAll(
            ".appWin"
        )
    ];


function openAppWindow  (appId) 
{

    const windowElement =
        document.getElementById(
            appId
        );


    if (!windowElement) 
        {
        return;
        }


    focusAppWindow
    (
        windowElement
    );


    window.requestAnimationFrame(
        () => {

            windowElement.classList.add(
                "active"
            );
        }
    );
}


function closeAppWindow
(
    windowElement,
    resetPosition = false
) 

{

    if (!windowElement) 
        {
        return;
        }


    windowElement.classList.remove(
        "active"
    );


    if 
    (
        resetPosition
    ) 
    {

        setTimeout(
            () => {

                windowElement.classList.remove(
                    "dragging"
                );


                windowElement.style.removeProperty(
                    "left"
                );


                windowElement.style.removeProperty(
                    "top"
                );


                windowElement.style.removeProperty(
                    "transform"
                );

            },
            280
        );
    }
}


function focusAppWindow (windowElement) 

{

    appWindows.forEach(
        app => {

            app.style.zIndex =
                "80";
        }
    );


    windowElement.style.zIndex =
        "90";
}


//drag race reference? 
//cuz u know, dragging windows?
//eh


appWindows.forEach

(
    windowElement => 
        {

        const titlebar =
            windowElement.querySelector(
                ".appWinTitlebar"
            );


        if (!titlebar) 
            {
            return;
            }


        let dragging = false;
        let offsetX = 0;
        let offsetY = 0;


        titlebar.addEventListener
        (
            "pointerdown",
            event => {

                if 
                (
                    event.target.closest(
                        "button"
                    )
                ) 
                {
                    return;
                }


                dragging = true;


                const rect =
                    windowElement.getBoundingClientRect();


                windowElement.style.left = `${rect.left}px`;
                windowElement.style.top = `${rect.top}px`;

                windowElement.style.transform = "translate(0, 0) scale(1)";

                windowElement.classList.add ( "dragging");


                offsetX =
                    event.clientX -
                    rect.left;

                offsetY =
                    event.clientY -
                    rect.top;


                titlebar.setPointerCapture (event.pointerId);

                focusAppWindow ( windowElement);
            }
        );


        titlebar.addEventListener(
            "pointermove",
            event => {

                if (!dragging) 
                    {
                    return;
                    }


                const newLeft =
                    event.clientX -
                    offsetX;


                const newTop =
                    event.clientY -
                    offsetY;


                windowElement.style.left = `${newLeft}px`;

                windowElement.style.top = `${newTop}px`;
            }
        );


        titlebar.addEventListener
        (
            "pointerup",
            () => {

                dragging =
                    false;


                windowElement.classList.remove
                (
                    "dragging"
                );
            }
        );


        titlebar.addEventListener
        (
            "pointercancel",
            () => {

                dragging =
                    false;


                windowElement.classList.remove(
                    "dragging"
                );
            }
        );
    }
);



appWindows.forEach(
    windowElement => {

        const closeButton =
            windowElement.querySelector(
                ".appWinButtonClose"
            );


        if (!closeButton) 
            {
            return;
            }


        closeButton.addEventListener
        (
            "click",
            () => {

                closeAppWindow
                (
                    windowElement,
                    true
                );
            }
        );
    }
);


appWindows.forEach 
(
    windowElement => 
        
    {

        const minimizeButton =
            windowElement.querySelector(
                ".appWinButtonMinimize"
            );


        if (!minimizeButton) {
            return;
        }


        minimizeButton.addEventListener(
            "click",
            () => {

                closeAppWindow(
                    windowElement
                );
            }
        );
    }
);




const openNotepadButton =
    document.getElementById(
        "openNotepad"
    );


const openMetronomeButton =
    document.getElementById(
        "openMetronome"
    );

const openSettingsButton =
    document.getElementById(
        "openSettings"
    );


if (openNotepadButton) {

    openNotepadButton.addEventListener(
        "click",
        () => {

            openAppWindow(
                "NotepadWin"
            );
        }
    );
}


if (openMetronomeButton) {

    openMetronomeButton.addEventListener(
        "click",
        () => {

            openAppWindow(
                "MetronomeWin"
            );
        }
    );
}


if (openSettingsButton) {

    openSettingsButton.addEventListener(
        "click",
        () => {

            openAppWindow(
                "SettingsWin"
            );
        }
    );
}



//add a ? button chłopcze






const pianoState = {
    bpm: 120,
    metronomeRunning: false

};

//control really likes c and v
const metronomeBpm =
    document.getElementById(
        "metronomeBPM"
    );


const metronomeSlider =
    document.getElementById(
        "metronome-ślizgacz-kurwijsyn-jr"
    );


const metronomeMinus =
    document.getElementById(
        "metronomeMinus"
    );


const metronomePlus =
    document.getElementById(
        "metronomePlus"
    );


const metronomeStart =
    document.getElementById(
        "metronomeStartStop"
    );


let metronomeTimer = null;

function playMetronomeClick() 

{

    if 
    (
        !audioContext ||
        !metronomeGain
    ) 
    
    {
        return;
    }


    resumeAudio();


    const now = audioContext.currentTime;


    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();


    oscillator.type = "sine";

//wooo changeable values!!!
//if you dont like it, just set the frequency to whatever and delete gains
//toy with it however you want
//ima setting this to a realistic values
    oscillator.frequency.setValueAtTime(
        1600,            
        now
    );


    oscillator.frequency.exponentialRampToValueAtTime
    (
        120,
        now + 0.004
    );  
    gain.gain.setValueAtTime(1, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.025);

    oscillator.connect
    (
        gain
    );
    gain.connect
    (
        metronomeGain
    );

    oscillator.start
    (
        now
    );

    oscillator.stop
    (
        now + 0.03
    );
}


function stopMetronome() 
{

    if
    (
        metronomeTimer !== null
    )
     {

        clearInterval
        (
            metronomeTimer);


        metronomeTimer = null;
    }
    pianoState.metronomeRunning =
        false;

        if (metronomeStart) {

            metronomeStart.textContent = "Start";
        }
}


function startMetronome() 
{

    initializeAudio();
    resumeAudio();
    stopMetronome();

    pianoState.metronomeRunning =
        true;


    if (metronomeStart) {

        metronomeStart.textContent = "Stop";
    }


    playMetronomeClick();


    metronomeTimer =
        setInterval(
            playMetronomeClick,
            60000 /
            pianoState.bpm
        );
}


function updateBPM
    (
        value
    ) 

    {

    const bpm =
        Math.round(
            Number(value)
        );


    pianoState.bpm =
        clamp(
            bpm,
            30,
            360
        );


    if (metronomeBpm) 
    {
        metronomeBpm.textContent = pianoState.bpm;
    }


    if (metronomeSlider) 
    {
        metronomeSlider.value = pianoState.bpm;
    }


    if (tempoElementarnaCząstkaNig)
    {
        tempoElementarnaCząstkaNig.textContent = `${pianoState.bpm} BPM`;
    }


    if 
    (
        pianoState.metronomeRunning
    ) 
    {
        startMetronome();
    }
}


if (metronomeSlider) 
    {

    metronomeSlider.addEventListener(
        "input",
        event => {

            updateBPM(
                event.target.value
            );
        }
    );
}


if (metronomeMinus) {

    metronomeMinus.addEventListener(
        "click",
        () => {

            updateBPM(
                pianoState.bpm - 1
            );
        }
    );
}


if (metronomePlus) {

    metronomePlus.addEventListener(
        "click",
        () => {

            updateBPM(
                pianoState.bpm + 1
            );
        }
    );
}


if (metronomeStart) {

    metronomeStart.addEventListener(
        "click",
        () => {

            if (
                pianoState.metronomeRunning
            ) {

                stopMetronome();

                return;
            }


            startMetronome();
        }
    );
}






//you should put your clothes in storage instead of just rhrowing them on your bed lol
//what did i mean -me but a few days later

//probably no one even reads the code nor the comments
//like probably people just mash random buttons, look if main features are at the very least working and shove it to random ass ai detector
//speedrunning stardust milking

function saveAudioSettings() {

    localStorage.setItem(
        "pianoOS.audioSettings",
        JSON.stringify(
            audioStateMoje
        )
    );
}


function loadAudioSettings() { // used ai to copy paste because im lazy ass
    // also supposedly making *if (number.isFinite(* should make a good failsafe although how in the world would it break
    //well, the tutorial guy is always right

    //because not left


    //badabum


    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    "pianoOS.audioSettings"
                ) || "null"
            );


        if (!saved) {
            return;
        }


        if 
        (
            Number.isFinite
            (
                saved.masterVolume
            )
        ) 
        {
            audioStateMoje.masterVolume =
                saved.masterVolume;
        }


        if (
            Number.isFinite
            (
                saved.pianoVolume
            )
        ) 
        {
            audioStateMoje.pianoVolume =
                saved.pianoVolume;
        }


        if (
            Number.isFinite (
                saved.metronomeVolume
            )
        ) 
        {
            audioStateMoje.metronomeVolume =
                saved.metronomeVolume;
        }


        if (masterVolume) 
        {
            masterVolume.value = audioStateMoje.masterVolume;
        }


        if (pianoVolume) 
        {
            pianoVolume.value = audioStateMoje.pianoVolume;
        }


        if (metronomeVolume) 
            {

            metronomeVolume.value = audioStateMoje.metronomeVolume;
        }












    } catch (
        error
    ) {

        console.warn(
            "blablablalaba could not load settings",
            error
        );
    }
}



window.addEventListener

(
    "resize",
    () => {

        resizeAllCanvases();

        createStars();
    }
);



loadAudioSettings();
createPiano();
resizeAllCanvases();
createStars();


setMidiStatus

(
    "MIDI not miding",
    false
);


//walnąć jakiś gif podczas errorów i ez

function animate (now) 
{

    const deltaTime =
        Math.min(
            (now - lastTime) / 1000,
            0.05 //******************         yo listen! you can change particle animation speed here

        );


    updateLights(
        now
    );


    updateStars
    (
        deltaTime
    );

    updateImpactParticles(
        deltaTime
    );

    requestAnimationFrame(
        animate
    );
}





requestAnimationFrame(
    animate
);









topTekst.addEventListener(
    "click",
    () => {

    const currentText =
        topTekst.textContent.trim();

    const newText =
        window.prompt(
            "Go on, name it", currentText

            );

                if 
                (
                    newText === null
                ) 
                {
                    return;
                }

        const trimmedText =
            newText.trim();

        if (!trimmedText)
             {
            return;
        }

        topTekst.textContent =
            trimmedText;

        localStorage.setItem(
            "pianoOS.workspaceName",
            trimmedText
        );
    }
);

const savedWorkspaceName =
    localStorage.getItem
    (
        "pianoOS.workspaceName"
    );

if 
(
    savedWorkspaceName
) 
{
    topTekst.textContent =
        savedWorkspaceName;
}



// if you read this, comment or say it in review, i'll at least know that someone reads that