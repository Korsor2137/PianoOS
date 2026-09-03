const startButton =
    document.getElementById("startButton");

const background =
    document.getElementById("background");

const welcomeCard =
    document.getElementById("welcomeCard");

const pianoUI =
    document.getElementById("pianoUI");

const connectionStatus =
    document.getElementById("connectionStatus");

const core =
    document.querySelector(".implosion-core");

const lights =
    [...document.querySelectorAll(".swiec")];

const impactFlash =
    document.getElementById("impactFlash");

const starCanvas =
    document.getElementById("starCanvas");

const starContext =
    starCanvas.getContext("2d");

const impactCanvas =
    document.getElementById("impactCanvas");

const impactContext =
    impactCanvas.getContext("2d");

const particleCanvas =
    document.getElementById("particleCanvas");

const particleContext =
    particleCanvas.getContext("2d");

const noteCanvas =
    document.getElementById("noteCanvas");

const noteContext =
    noteCanvas.getContext("2d");

const pianoArea =
    document.querySelector(".piano-area");

const piano =
    document.getElementById("piano");

const pianoKeys =
    document.getElementById("pianoKeys");

const hideVkeyboard =
    document.getElementById("hideVkeyboard");

const popup =
    document.getElementById("tenpopup");

const midiYes =
    document.getElementById("midiTAK");

const midiNo =
    document.getElementById("midiNIE");

const popupYesMidi =
    document.getElementById("popupMidiTak");

const midiStatus =
    document.getElementById("midiStatus");

const connectionIndicator =
    document.getElementById(
        "connectionIndicator"
    );

let audioContext = null;

let masterGain = null;
let pianoGain = null;
let metronomeGain = null;

let audioInitialized = false;

const audioState = {

    masterVolume: 1.0,

    pianoVolume: 0.8,

    metronomeVolume: 0.7

};

function initializeAudio() {

    if (audioInitialized) {
        return;
    }

    audioContext =
        new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

    masterGain =
        audioContext.createGain();

    pianoGain =
        audioContext.createGain();

    metronomeGain =
        audioContext.createGain();

    pianoGain.connect(
        masterGain
    );

    metronomeGain.connect(
        masterGain
    );

    masterGain.connect(
        audioContext.destination
    );

    masterGain.gain.value =
        audioState.masterVolume;

    pianoGain.gain.value =
        audioState.pianoVolume;

    metronomeGain.gain.value =
        audioState.metronomeVolume;

    audioInitialized = true;
}

const masterVolume =document.getElementById ("masterVolume");

const pianoVolume =document.getElementById ("pianoVolume");

const metronomeVolume = document.getElementById ("metronomeVolume");

masterVolume.addEventListener(
    "input",
    event => {

        const value =
            Number(
                event.target.value
            );

        audioState.masterVolume =
            value;

        if (
            masterGain &&
            audioContext
        ) {

            masterGain.gain.setTargetAtTime(
                value,
                audioContext.currentTime,
                0.015
            );
        }
    }
);

pianoVolume.addEventListener(
    "input",
    event => {

        const value =
            Number(
                event.target.value
            );

        audioState.pianoVolume =
            value;

        if (
            pianoGain &&
            audioContext
        ) {

            pianoGain.gain.setTargetAtTime(
                value,
                audioContext.currentTime,
                0.015
            );
        }
    }
);

metronomeVolume.addEventListener(
    "input",
    event => {

        const value =
            Number(
                event.target.value
            );

        audioState.metronomeVolume =
            value;

        if (
            metronomeGain &&
            audioContext
        ) {

            metronomeGain.gain.setTargetAtTime(
                value,
                audioContext.currentTime,
                0.015
            );
        }
    }
);

const config = {

    orbitsize:
        Math.min(
            window.innerWidth,
            window.innerHeight
        ) * 0.36,

    inispeed:
        (Math.PI * 2) / 24,

    finalspeed:
        Math.PI * 12,

    accelduration:
        1000,

    collapseduration:
        1000,

    impactduration:
        850
};

let startmoment = null;

let katorbity = 0;

let orbitSpeed = config.inispeed;

let orbitskala = 1;

let lastTime = performance.now();

let impactStarted = false;

let introFinished = false;

function easeInCubic(t) {

    return t * t * t;
}

function easeInQuint(t) {

    return (
        t *
        t *
        t *
        t *
        t
    );
}

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

let IntroSound1 = new Audio("assets/introMusic/FirstIntroSound.mp3");
let IntroSound2 = new Audio("assets/introMusic/trueSecondsound.mp3");

function updateLights(now) {

    if (
        impactStarted
    ) {
        return;
    }
    IntroSound1.play();

    const deltaTime =
        Math.min(
            (now - lastTime) / 1000,
            0.05
        );

    if (
        startmoment === null
    ) {

        katorbity +=
            config.inispeed *
            deltaTime;

        updateBlobTransforms();

        lastTime = now;

        return;
    }

    const elapsed =
        now - startmoment;

    if (
        elapsed <=
        config.accelduration
    ) {

        const progress =
            clamp(
                elapsed /
                config.accelduration,
                0,
                1
            );

        const eased =
            easeInCubic(
                progress
            );

        orbitSpeed =
            config.inispeed +
            (
                config.finalspeed -
                config.inispeed
            ) *
            eased;

        orbitskala =
            1 -
            progress * 0.04;
    }

    else {

        const collapseElapsed = elapsed - config.accelduration;

        const progress =
            clamp(
                collapseElapsed /
                config.collapseduration,
                0,
                1
            );

        const eased =
            easeInQuint(
                progress
            );

        orbitskala =
            0.96 -
            eased * 0.91;

        orbitSpeed =
            config.finalspeed +
            eased *
            Math.PI *
            10;

        if (
            progress >= 1
        ) {

            beginImpact();
            IntroSound2.play();
            lastTime = now;

            return;
        }
    }

    katorbity +=
        orbitSpeed *
        deltaTime;

    updateBlobTransforms();

    if (
        elapsed >
        config.accelduration
    ) {

        const progress =
            clamp(
                (
                    elapsed -
                    config.accelduration
                ) /
                config.collapseduration,
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

    lastTime = now;
}

function updateBlobTransforms() {

    lights.forEach(
        (light, index) => {

            const angle =
                katorbity +
                (
                    index *
                    Math.PI *
                    2 /
                    lights.length
                );

            const pianoSamples = {

                C3: {
                    midi: 48,
                    buffer: null
                },

                C4: {
                    midi: 60,
                    buffer: null
                },

                F4: {
                    midi: 65,
                    buffer: null
                },

                C5: {
                    midi: 72,
                    buffer: null
                },

                F5: {
                    midi: 77,
                    buffer: null
                }
            };

            async function loadSharedPianoSamples() {

                initializeAudio();

                for (
                    const [name, sample]
                    of Object.entries(
                        pianoSamples
                    )
                ) {

                    try {

                        const response =
                            await fetch(
                                `assets/piano/${name}.mp3`
                            );

                        if (!response.ok) {
                            continue;
                        }

                        const arrayBuffer =
                            await response.arrayBuffer();

                        sample.buffer =
                            await audioContext.decodeAudioData(
                                arrayBuffer
                            );

                    } catch (error) {

                        console.error(
                            `Could not load ${name}.mp3`,
                            error
                        );
                    }
                }
            }

            

            function playPianoNote(
                midi,
                velocity = 0.8
            ) {

                if (!audioInitialized) {
                    initializeAudio();
                }

                if (audioContext.state === "suspended") {
                    audioContext.resume();
                }

                const sample =
                    getNearestPianoSample(
                        midi
                    );

                if (!sample || !sample.buffer) {
                    console.warn(
                        "Piano sample unavailable:",
                        midi
                    );

                    return;
                }

                const source =
                    audioContext.createBufferSource();

                const gain =
                    audioContext.createGain();

                source.buffer =
                    sample.buffer;

                source.playbackRate.value =
                    Math.pow(
                        2,
                        (midi - sample.midi) / 12
                    );

                gain.gain.value =
                    Math.max(
                        0.05,
                        velocity
                    );

                source.connect(gain);
                gain.connect(pianoGain);
                source.start();
            }

            const radius =
                config.orbitsize *
                orbitskala;

            const collapseAmount =
                1 -
                orbitskala;

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
                0.54 +
                collapseAmount * 0.38;

            light.style.transform =
                `
                rotate(${angle}rad)
                translateX(${radius}px)
                rotate(${-angle}rad)
                scale(${blobScale})
                `;

            light.style.opacity =
                opacity;

            light.style.filter =
                `blur(${blur}px)`;
        }
    );
}

const pianoSampleNotes = [
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

function getPianoSampleStem(
    midi
) {

    const note =
        pianoSampleNotes[midi % 12];

    const naturalNote =
        note.replace(
            "#",
            ""
        );

    const octave =
        Math.floor(midi / 12) - 1;

    let stem;

    if (
        naturalNote === "A" ||
        naturalNote === "B"
    ) {
        if (octave === 0) {
            stem =
                naturalNote.toUpperCase() +
                "_2";
        } else if (octave === 1) {
            stem =
                naturalNote.toUpperCase() +
                "_1";
        } else if (octave === 2) {
            stem = naturalNote.toUpperCase();
        } else if (octave === 3) {
            stem =
                naturalNote.toLowerCase().repeat(2);
        } else {
            stem =
                naturalNote.toLowerCase() +
                (octave - 3);
        }
    } else if (octave === 1) {
        stem =
            naturalNote.toUpperCase() +
            "_1";
    } else if (octave === 2) {
        stem = naturalNote.toUpperCase();
    } else if (octave === 3) {
        stem =
            naturalNote.toLowerCase().repeat(2);
    } else {
        stem =
            naturalNote.toLowerCase() +
            (octave - 3);
    }

    return note.includes("#")
        ? `${stem}s`
        : stem;
}

const sharedPianoSamples =
    Array.from(
        {
            length: 88
        },
        (_, index) => {

            const midi =
                21 + index;

            return {
                midi,
                file:
                    getPianoSampleStem(
                        midi
                    ),
                buffer: null
            };
        }
    );

async function loadTopLevelPianoSamples() {

    for (
        const sample
        of sharedPianoSamples
    ) {

        try {

            const response =
                await fetch(
                    `assets/piano/${sample.file}.mp3`
                );

            if (!response.ok) {
                continue;
            }

            sample.buffer =
                await audioContext.decodeAudioData(
                    await response.arrayBuffer()
                );

        } catch (error) {

            console.error(
                    `Could not load ${sample.file}.mp3`,
                error
            );
        }
    }
}

function getNearestPianoSample(
    midi
) {

    return Object.values(
        sharedPianoSamples
    ).reduce(
        (nearest, sample) => {

            if (!nearest) {
                return sample;
            }

            return Math.abs(
                sample.midi - midi
            ) < Math.abs(
                nearest.midi - midi
            )
                ? sample
                : nearest;
        },
        null
    );
}

function playPianoNote(
    midi,
    velocity = 0.8
) {

    if (!audioInitialized) {
        initializeAudio();
    }

    if (
        audioContext.state ===
        "suspended"
    ) {
        audioContext.resume();
    }

    const sample =
        getNearestPianoSample(
            midi
        );

    if (!sample || !sample.buffer) {
        console.warn(
            "Piano sample unavailable:",
            midi
        );

        return;
    }

    const source =
        audioContext.createBufferSource();

    const gain =
        audioContext.createGain();

    const noteKey =
        `${midi}-${Math.random()}`;

    source.buffer = sample.buffer;

    source.playbackRate.value =
        Math.pow(
            2,
            (midi - sample.midi) / 12
        );

    gain.gain.value =
        Math.max(0.05, velocity);

    source.connect(gain);
    gain.connect(pianoGain);
    source.start();

    return {
        source,
        gain,
        startedAt:
            audioContext.currentTime,
        releaseTimer: null,
        released: false
    };
}

startButton.addEventListener(
    "click",
    () => {

        if (
            startmoment !== null
        ) {
            return;
        }
        initializeAudio();
        loadTopLevelPianoSamples();

        const pianoSamples = {

                C3: {
                    midi: 48,
                    buffer: null
                },

                C4: {
                    midi: 60,
                    buffer: null
                },

                F4: {
                    midi: 65,
                    buffer: null
                },

                C5: {
                    midi: 72,
                    buffer: null
                },

                F5: {
                    midi: 77,
                    buffer: null
                },

            };

    async function loadPianoSamples() {

            initializeAudio();

            for (
                const [name, sample]
                of Object.entries(
                    pianoSamples
                )
            ) {

                const response =
                    await fetch(
                        `assets/piano/${name}.mp3`
                    );

                if (!response.ok) {

                    console.error(
                        `Could not load ${name}.mp3`
                    );

                    continue;
                }

                const arrayBuffer =
                    await response.arrayBuffer();

                sample.buffer =
                    await audioContext.decodeAudioData(
                        arrayBuffer
                    );
            }

            console.log(
                "Piano samples loaded"
            );
        }

        async function loadPianoSamples() {

            initializeAudio();

            for (
                const [name, sample]
                of Object.entries(
                    pianoSamples
                )
            ) {

                const response =
                    await fetch(
                        `assets/piano/${name}.mp3`
                    );

                if (!response.ok) {

                    console.error(
                        `Could not load ${name}.mp3 so try again ig`
                    );

                    continue;
                }

                const arrayBuffer =
                    await response.arrayBuffer();

                sample.buffer =
                    await audioContext.decodeAudioData(
                        arrayBuffer
                    );
            }

            console.log(
                "Piano samples loaded"
            );
        }

            function getNearestPianoSample(
            midi
        ) {

            let nearest = null;

            let smallestDistance =
                Infinity;

            for (
                const sample
                of Object.values(
                    pianoSamples
                )
            ) {

                const distance =
                    Math.abs(
                        sample.midi -
                        midi
                    );

                if (
                    distance <
                    smallestDistance
                ) {

                    smallestDistance =
                        distance;

                    nearest =
                        sample;
                }
            }

            return nearest;
        }

        function playPianoNote(
    midi,
    velocity = 0.8
    ) {

    if (
        !audioInitialized
    ) {
        initializeAudio();
    }

    if (
        audioContext.state ===
        "suspended"
    ) {

        audioContext.resume();
    }

    const sample =
        getNearestPianoSample(
            midi
        );

    if (
        !sample ||
        !sample.buffer
    ) {

        console.warn(
            "Piano sample unavailable:",
            midi
        );

        return;
    }

    const source =
        audioContext.createBufferSource();

    const gain =
        audioContext.createGain();

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
        gain
    };
    }

        if (
        audioContext.state === "suspended" )
        {
            audioContext.resume();}

        background.classList.add(
            "started"
        );

        startButton.disabled =
            true;

        startButton.textContent =
            "Launching...";

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

        startmoment =
            performance.now();
    }
    );

    function beginImpact() {

    if (
        impactStarted
    ) {
        return;
    }

    impactStarted = true;

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

    core.style.transition =
        `
        transform 700ms
        cubic-bezier(
            0.16,
            1,
            0.3,
            1
        ),

        opacity 480ms ease-out,

        filter 480ms ease-out
        `;

    core.style.transform =
        "scale(16)";

    core.style.opacity =
        "0";

    core.style.filter =
        "blur(38px)";

    impactFlash.style.transition =
        "opacity 80ms ease-out";

    impactFlash.style.opacity =
        "1";

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

            core.style.display =
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
        () => {

            finishIntro();

        },
        620
    );

}

function finishIntro() {

    if (
        introFinished
    ) {
        return;
    }

    introFinished = true;

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
                rect.width *
                dpr
            )
        );

    canvas.height =
        Math.max(
            1,
            Math.floor(
                rect.height *
                dpr
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
        starContext
    );

    resizeCanvas(
        impactCanvas,
        impactContext
    );

    resizeCanvas(
        particleCanvas,
        particleContext
    );

    resizeCanvas(
        noteCanvas,
        noteContext
    );
}

const stars = [];

function createStars() {

    stars.length = 0;

    const width =
        starCanvas.clientWidth;

    const height =
        starCanvas.clientHeight;

    const amount =
        Math.floor(
            (
                width *
                height
            ) / 18000
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

const impactParticles = [];

function createCoreExplosion() {

    const width =
        impactCanvas.clientWidth;

    const height =
        impactCanvas.clientHeight;

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

            x:
                centerX,

            y:
                centerY,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life,

            maxLife:
                life,

            size:
                0.8 +
                Math.random() * 3.8
        });
    }
}

function updateImpactParticles(
    deltaTime
) {

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

        const p =
            impactParticles[i];

        p.x +=
            p.vx *
            deltaTime;

        p.y +=
            p.vy *
            deltaTime;

        p.vx *=
            Math.pow(
                0.988,
                deltaTime * 60
            );

        p.vy *=
            Math.pow(
                0.988,
                deltaTime * 60
            );

        p.life -=
            deltaTime;

        if (
            p.life <= 0
        ) {

            impactParticles.splice(
                i,
                1
            );

            continue;
        }

        const alpha =
            p.life /
            p.maxLife;

        impactContext.beginPath();

        impactContext.arc(
            p.x,
            p.y,
            p.size,
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

const pianoParticles = [];

function createKeyParticles(
    key,
    velocity
) {

    const keyRect =
        key.getBoundingClientRect();

    const canvasRect =
        particleCanvas.getBoundingClientRect();

    const originX =
        keyRect.left +
        keyRect.width / 2 -
        canvasRect.left;

    const originY =
        keyRect.top -
        canvasRect.top;

    const amount =
        Math.floor(
            4 +
            velocity * 7
        );

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const angle =
            -Math.PI / 2 +
            (
                Math.random() - 0.5
            ) * 1.6;

        const speed =
            30 +
            Math.random() * 100;

        const life =
            0.25 +
            Math.random() * 0.4;

        pianoParticles.push({

            x:
                originX,

            y:
                originY,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life,

            maxLife:
                life,

            size:
                1 +
                Math.random() * 3
        });
    }
}

function updatePianoParticles(
    deltaTime
) {

    const width =
        particleCanvas.clientWidth;

    const height =
        particleCanvas.clientHeight;

    particleContext.clearRect(
        0,
        0,
        width,
        height
    );

    for (
        let i =
            pianoParticles.length - 1;
        i >= 0;
        i--
    ) {

        const p =
            pianoParticles[i];

        p.x +=
            p.vx *
            deltaTime;

        p.y +=
            p.vy *
            deltaTime;

        p.vy +=
            55 *
            deltaTime;

        p.life -=
            deltaTime;

        if (
            p.life <= 0
        ) {

            pianoParticles.splice(
                i,
                1
            );

            continue;
        }

        const alpha =
            p.life /
            p.maxLife;

        particleContext.beginPath();

        particleContext.fillStyle =
            `
            rgba(
                220,
                190,
                255,
                ${alpha}
            )
            `;

        particleContext.shadowBlur =
            10;

        particleContext.shadowColor =
            `
            rgba(
                170,
                100,
                255,
                ${alpha}
            )
            `;

        particleContext.fill();
    }
}

const fallingNotes = [];

function updateFallingNotes(
    deltaTime
) {

    noteContext.clearRect(
        0,
        0,
        noteCanvas.clientWidth,
        noteCanvas.clientHeight
    );

    for (
        let i =
            fallingNotes.length - 1;
        i >= 0;
        i--
    ) {

        const note =
            fallingNotes[i];

        note.age +=
            deltaTime;

        note.life -=
            deltaTime;

        if (
            note.life <= 0
        ) {

            fallingNotes.splice(
                i,
                1
            );
        }
    }
}

const FIRST_MIDI_NOTE = 21;
const LAST_MIDI_NOTE = 108;
const activeNotes = new Map();
const activeVoices = new Map();
const minimumNoteDuration = 0.14;
const noteReleaseDuration = 0.32;
const noteReleaseQuietPoint = 0.30;

const sustainedNotes =
    new Map();

let sustainPedalDown =
    false;

const keyElements =
    new Map();

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

function getNoteName(midi) {

    const octave =
        Math.floor(
            midi / 12
        ) - 1;

    const note =
        noteNames[
            midi % 12
        ];

    return `${note}${octave}`;
}

function createPiano() {

    pianoKeys.innerHTML = "";

    keyElements.clear();

    const whiteCount = 52;

    const whiteWidth =
        100 / whiteCount;

    let whiteIndex = 0;

    for (
        let midi =
            FIRST_MIDI_NOTE;
        midi <= LAST_MIDI_NOTE;
        midi++
    ) {

        const pitchClass =
            midi % 12;

        if (
            blackPitchClasses.has(
                pitchClass
            )
        ) {
            continue;
        }

        const key =
            createKey(
                midi,
                "white"
            );

        key.style.left =
            `${whiteIndex * whiteWidth}%`;

        key.style.width =
            `${whiteWidth}%`;

        pianoKeys.appendChild(
            key
        );

        keyElements.set(
            midi,
            key
        );

        whiteIndex++;
    }

    whiteIndex = 0;

    const blackWidth = whiteWidth * 0.62;

    for (
        let midi =
            FIRST_MIDI_NOTE;
        midi <= LAST_MIDI_NOTE;
        midi++
    ) {

        const pitchClass = midi % 12;

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

            key.style.left =
                `
                calc(
                    ${whiteIndex * whiteWidth}%
                    - ${blackWidth / 2}%
                )
                `;

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

    if (!key) {
        return;
    }

    const noteKey =
        `${source}-${midi}`;

    releaseNoteVoice(
        noteKey,
        true
    );

    sustainedNotes.delete(
        noteKey
    );

    activeNotes.set(
        noteKey,
        midi
    );

    key.classList.add(
        "active"
    );

    key.style.setProperty(
        "--velocity",
        String(velocity)
    );

    const voice =
        playPianoNote(
        midi,
        velocity
    );

    if (voice) {
        activeVoices.set(
            noteKey,
            voice
        );
    }
}

function releaseNoteVoice(
    noteKey,
    force = false
) {

    const voice =
        activeVoices.get(
            noteKey
        );

    if (!voice || voice.released) {
        return;
    }

    if (
        voice.releaseTimer
    ) {
        window.clearTimeout(
            voice.releaseTimer
        );

        voice.releaseTimer =
            null;
    }

    const elapsed =
        audioContext.currentTime -
        voice.startedAt;

    if (
        !force &&
        elapsed < minimumNoteDuration
    ) {
        voice.releaseTimer =
            window.setTimeout(
                () => {
                    releaseNoteVoice(
                        noteKey
                    );
                },
                (
                    minimumNoteDuration -
                    elapsed
                ) *
                1000
            );

        return;
    }

    voice.released = true;

    const now =
        audioContext.currentTime;

    voice.gain.gain.cancelScheduledValues(
        now
    );

    voice.gain.gain.setValueAtTime(
        Math.max(
            0.0001,
            voice.gain.gain.value
        ),
        now
    );

    voice.gain.gain.exponentialRampToValueAtTime(
        0.025,
        now + noteReleaseQuietPoint
    );

    voice.gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + noteReleaseDuration
    );

    voice.source.stop(
        now + noteReleaseDuration + 0.01
    );

    activeVoices.delete(
        noteKey
    );
}

function releaseSustainedNotes() {

    sustainedNotes.forEach(
        (midi, noteKey) => {
            releaseNoteVoice(
                noteKey
            );

            const key =
                keyElements.get(
                    midi
                );

            const stillHeld =
                [...activeNotes.values()].some(
                    activeMidi =>
                        activeMidi === midi
                );

            if (key && !stillHeld) {
                key.classList.remove(
                    "active"
                );
            }
        }
    );

    sustainedNotes.clear();
}

function createKey(
    midi,
    color
) {

    const key =
        document.createElement(
            "div"
        );

    key.className =
        `key ${color}`;

    key.dataset.midi =
        String(midi);

    key.dataset.note =
        getNoteName(midi);

    const label =
        document.createElement(
            "span"
        );

    label.className =
        "key-label";

    label.textContent =
        getNoteName(midi);

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

    return key;
}

function noteOff(
    midi,
    source = "unknown"
) {

    const noteKey =
        `${source}-${midi}`;

    activeNotes.delete(
        noteKey
    );

    if (
        sustainPedalDown &&
        source === "midi"
    ) {
        sustainedNotes.set(
            noteKey,
            midi
        );

        return;
    }

    releaseNoteVoice(
        noteKey
    );

    let stillHeld = false;

    for (
        const activeMidi
        of activeNotes.values()
    ) {

        if (
            activeMidi === midi
        ) {

            stillHeld = true;

            break;
        }
    }

    if (
        stillHeld
    ) {
        return;
    }

    const key =
        keyElements.get(
            midi
        );

    if (
        !key
    ) {
        return;
    }

    key.classList.remove(
        "active"
    );
}

const keyboardMap = {

    a: 60,
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

    a: 48,
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

function getKeyboardMidi(event) {

    const key =
        event.key.toLowerCase();

    const map =
        event.getModifierState("CapsLock")
            ? capsKeyboardMap
            : keyboardMap;

    return map[key];
}

window.addEventListener(
    "keydown",
    event => {

        if (
            event.repeat
        ) {
            return;
        }

        const midi =
            getKeyboardMidi(event);

        if (
            midi === undefined
        ) {
            return;
        }

        noteOn(
            midi,
            0.82,
            "keyboard"
        );
    }
);

window.addEventListener(
    "keyup",
    event => {

        const midi =
            getKeyboardMidi(event);

        if (
            midi === undefined
        ) {
            return;
        }

        noteOff(
            midi,
            "keyboard"
        );
    }
);

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

let midiAccess = null;

let midiToastTimer = null;

function showMidiToast(
    message
) {

    popupYesMidi.querySelector("p")
        .textContent = message;

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

        try {

            midiAccess =
                await navigator.requestMIDIAccess();

            console.log(
                "MIDI access so generously granted:",
            );
            midiStatus.textContent =
                "Piano ready yay";

            connectMIDI(
                midiAccess
            );
            showMidiToast(
                "Wise choice"

            );

        } catch (
            error
        ) {

            console.error(
                "MIDI access error:",
                error
            );

            midiStatus.textContent =
                "no MIDI piano , skill issue";

            connectionIndicator.classList.remove(
                "connected"
            );

            showMidiToast(
                "MIDI access unavailable, big L"
            );
        }
    }
);

midiNo.addEventListener(
    "click",
    () => {

        popup.classList.remove(
            "active"
        );
        midiStatus.textContent =
            "Piano will never be ready :(";
        popup.setAttribute(
            "aria-hidden",
            "true"
        );

        showMidiToast("MIDI access not granted, why");
    }
);

function connectMIDI(
    access
) {

    let connected =
        false;

    for (
        const input
        of access.inputs.values()
    ) {

        connected = true;

        input.onmidimessage =
            handleMIDIMessage;
    }

    if (
        connected
    ) {

        midiStatus.textContent =
            "MIDI connected";

        midiStatus.classList.add(
            "connected"
        );

        connectionIndicator.classList.add(
            "connected"
        );

    } else {

        midiStatus.textContent =
            "No MIDI device";

        connectionIndicator.classList.remove(
            "connected"
        );
    }

    access.onstatechange =
        () => {

            connectMIDI(
                access
            );
        };
}

function handleMIDIMessage(
    event
) {

    const [
        status,
        note,
        velocity
    ] = event.data;

    const command =
        status & 0xf0;

    if (
        command === 0xb0 &&
        note === 64
    ) {
        const pedalDown =
            velocity >= 64;

        if (
            pedalDown !== sustainPedalDown
        ) {
            sustainPedalDown =
                pedalDown;

            if (!pedalDown) {
                releaseSustainedNotes();
            }
        }

        return;
    }

    if (
        command === 0x90 &&
        velocity > 0
    ) {

        noteOn(
            note,
            velocity / 127,
            "midi"
        );

        return;
    }

    if (
        command === 0x80 ||
        (
            command === 0x90 &&
            velocity === 0
        )
    ) {

        noteOff(
            note,
            "midi"
        );
    }
}

window.addEventListener(
    "resize",
    () => {

        resizeAllCanvases();

        createStars();
    }
);

createPiano();

resizeAllCanvases();

createStars();

function animate(
    now
) {

    const deltaTime =
        Math.min(
            (now - lastTime) / 1000,
            0.05
        );

    updateLights(
        now
    );

    updateStars(
        deltaTime
    );

    updateImpactParticles(
        deltaTime
    );

    updatePianoParticles(
        deltaTime
    );

    updateFallingNotes(
        deltaTime
    );

    requestAnimationFrame(
        animate
    );
}

requestAnimationFrame(
    animate
);

const appWindows = [
    ...document.querySelectorAll(".appWin")
];

function openAppWindow(
    appId
) {

    const windowElement =
        document.getElementById(
            appId
        );

    if (
        !windowElement
    ) {
        return;
    }

    focusAppWindow(
        windowElement
    );

    requestAnimationFrame(
        () => {

            windowElement.classList.add(
                "active"
            );
        }
    );
}

function closeAppWindow(
    windowElement,
    resetPosition = false
) {

    if (
        resetPosition
    ) {
        let locationReset = false;

        const resetLocation = () => {

            if (
                locationReset ||
                windowElement.classList.contains(
                    "active"
                )
            ) {
                return;
            }

            locationReset = true;

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
        };

        windowElement.addEventListener(
            "transitionend",
            event => {

                if (
                    event.propertyName ===
                    "opacity"
                ) {
                    resetLocation();
                }
            },
            {
                once: true
            }
        );

        window.setTimeout(
            resetLocation,
            280
        );
    }

    windowElement.classList.remove(
        "active"
    );
}

function focusAppWindow(
    windowElement
) {

    appWindows.forEach(
        app => {
            app.style.zIndex = "80";
        }
    );

    windowElement.style.zIndex =
        "90";
}

appWindows.forEach(
    windowElement => {

        const titlebar =
            windowElement.querySelector(
                ".appWinTitlebar"
            );

        let dragging = false;

        let offsetX = 0;

        let offsetY = 0;

        titlebar.addEventListener(
            "pointerdown",
            event => {

                if (
                    event.target.closest(
                        "button"
                    )
                ) {
                    return;
                }

                dragging = true;

                const rect =
                    windowElement.getBoundingClientRect();

                windowElement.classList.add(
                    "dragging"
                );

                windowElement.style.left =
                    `${rect.left}px`;

                windowElement.style.top =
                    `${rect.top}px`;

                windowElement.style.transform =
                    "translate(0, 0) scale(1)";

                offsetX =
                    event.clientX -
                    rect.left;

                offsetY =
                    event.clientY -
                    rect.top;

                titlebar.setPointerCapture(
                    event.pointerId
                );

                focusAppWindow(
                    windowElement
                );
            }
        );

        titlebar.addEventListener(
            "pointermove",
            event => {

                if (
                    !dragging
                ) {
                    return;
                }

                const newLeft =
                    event.clientX -
                    offsetX;

                const newTop =
                    event.clientY -
                    offsetY;

                windowElement.style.left =
                    `${newLeft}px`;

                windowElement.style.top =
                    `${newTop}px`;

                windowElement.style.transform =
                    "translate(0, 0) scale(1)";
            }
        );

        titlebar.addEventListener(
            "pointerup",
            () => {

                dragging = false;

                windowElement.classList.remove(
                    "dragging"
                );
            }
        );

        titlebar.addEventListener(
            "pointercancel",
            () => {

                dragging = false;

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

        if (
            closeButton
        ) {
            closeButton.addEventListener(
                "click",
                () => {

                    closeAppWindow(
                        windowElement,
                        true
                    );
                }
            );
        }
    }
);

appWindows.forEach(
    windowElement => {

        const minimizeButton =
            windowElement.querySelector(
                ".appWinButtonMinimize"
            );

        if (
            minimizeButton
        ) {
            minimizeButton.addEventListener(
                "click",
                () => {

                    closeAppWindow(
                        windowElement
                    );
                }
            );
        }
    }
);

const pianoState = {

    bpm: 120,

    metronomeRunning:
        false

};

const metronomeBpm =
    document.getElementById(
        "metronomeBPM"
    );

const metronomeSlider =
    document.getElementById(
        "metronomeSlider"
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

const topTempo =
    document.getElementById(
        "tempo"
    );

let metronomeTimer = null;

function playMetronomeClick() {

    if (
        !audioContext ||
        !metronomeGain
    ) {
        return;
    }

    if (
        audioContext.state ===
        "suspended"
    ) {
        audioContext.resume();
    }

    const now =
        audioContext.currentTime;

    const oscillator =
        audioContext.createOscillator();

    const clickGain =
        audioContext.createGain();

    oscillator.type =
        "sine";

    oscillator.frequency.setValueAtTime(
        920,
        now
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        520,
        now + 0.045
    );

    clickGain.gain.setValueAtTime(
        0.0001,
        now
    );

    clickGain.gain.exponentialRampToValueAtTime(
        0.32,
        now + 0.004
    );

    clickGain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + 0.055
    );

    oscillator.connect(
        clickGain
    );

    clickGain.connect(
        metronomeGain
    );

    oscillator.start(
        now
    );

    oscillator.stop(
        now + 0.06
    );
}

function stopMetronome() {

    if (
        metronomeTimer !== null
    ) {
        window.clearInterval(
            metronomeTimer
        );

        metronomeTimer = null;
    }

    pianoState.metronomeRunning =
        false;

    metronomeStart.textContent =
        "Start";
}

function startMetronome() {

    initializeAudio();

    if (
        audioContext.state ===
        "suspended"
    ) {
        audioContext.resume();
    }

    stopMetronome();

    pianoState.metronomeRunning =
        true;

    metronomeStart.textContent =
        "Stop";

    playMetronomeClick();

    metronomeTimer =
        window.setInterval(
            playMetronomeClick,
            60000 /
            pianoState.bpm
        );
}

function updateBPM(
    value
) {

    pianoState.bpm =
        Math.min(
            360,
            Math.max(
                30,
                Number(value)
            )
        );

    metronomeBpm.textContent =
        pianoState.bpm;

    metronomeSlider.value =
        pianoState.bpm;

    if (
        topTempo
    ) {

        topTempo.textContent =
            `${pianoState.bpm} BPM`;
    }

    if (
        pianoState.metronomeRunning
    ) {
        startMetronome();
    }
}

metronomeSlider.addEventListener(
    "input",
    event => {

        updateBPM(
            event.target.value
        );
    }
);

metronomeMinus.addEventListener(
    "click",
    () => {

        updateBPM(
            pianoState.bpm - 1
        );
    }
);

metronomePlus.addEventListener(
    "click",
    () => {

        updateBPM(
            pianoState.bpm + 1
        );
    }
);

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

openNotepadButton.addEventListener(
    "click",
    () => {

        openAppWindow(
            "NotepadWin"
        );
    }
);

openMetronomeButton.addEventListener(
    "click",
    () => {

        openAppWindow(
            "MetronomeWin"
        );
    }
);

openSettingsButton.addEventListener(
    "click",
    () => {

        openAppWindow(
            "SettingsWin"
        );
    }
);

const savedAudioSettings =
    JSON.parse(
        localStorage.getItem(
            "pianoOS.audioSettings"
        ) || "null"
    );

if (
    savedAudioSettings
) {

    audioState.masterVolume =
        savedAudioSettings.masterVolume;

    audioState.pianoVolume =
        savedAudioSettings.pianoVolume;

    audioState.metronomeVolume =
        savedAudioSettings.metronomeVolume;

    masterVolume.value =
        audioState.masterVolume;

    pianoVolume.value =
        audioState.pianoVolume;

    metronomeVolume.value =
        audioState.metronomeVolume;
}

function saveAudioSettings() {

    localStorage.setItem(
        "pianoOS.audioSettings",

        JSON.stringify(
            audioState
        )
    );
}
saveAudioSettings();