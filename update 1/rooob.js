const startButton = document.getElementById("startButton");
const background = document.getElementById("background");
const welcomeCard = document.getElementById("welcomeCard");
const core = document.querySelector(".implosion-core");
const lights = [...document.querySelectorAll(".swiec")];

const popup = document.getElementById("tenpopup");
const midiYes = document.getElementById("midiTAK");
const midiNo = document.getElementById("midiNIE");


const config = {

orbitsize:
    Math.min(window.innerWidth, window.innerHeight) * 0.36,

inispeed:
    (Math.PI * 2) / 24,
finalspeed:
    Math.PI * 12,

accelduration: 3200,
collapseduration: 3300,
impactduration: 650

};

let startmoment = null;

let katorbity = 0;

let orbitSpeed = config.inispeed;

let orbitskala = 1;

let lastTime = performance.now();

let animationEnd = false;


function easeOutCubic(t) {
return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t) {
return t * t * t;
}

function easeInQuint(t) {
return t * t * t * t * t;
}

function clamp(value, min, max) {
return Math.min(Math.max(value, min), max);
}

function updateLights(now) {

const deltaTime =
    Math.min((now - lastTime) / 1000, 0.05);

lastTime = now;


if (startmoment === null) {

    katorbity +=
        config.inispeed * deltaTime;

    updateBlobTransforms();

    return;
}


const elapsed =
    now - startmoment;


if (elapsed <= config.accelduration) {

    const progress =
        clamp(
            elapsed / config.accelduration,
            0,
            1
        );

    const eased =
        easeInCubic(progress);

    orbitSpeed =
        config.inispeed +
        (
            config.finalspeed -
            config.inispeed
        ) * eased;


    orbitskala =
        1 -
        progress * 0.04;

}



else if (
    elapsed <=
    config.accelduration +
    config.collapseduration
) {

    const collapseElapsed =
        elapsed -
        config.accelduration;

    const progress =
        clamp(
            collapseElapsed /
            config.collapseduration,
            0,
            1
        );

    const eased =
        easeInQuint(progress);

    orbitskala =
        0.96 -
        eased * 0.91;



    orbitSpeed =
        config.finalspeed +
        eased * Math.PI * 10;

}

else {

    const impactElapsed =
        elapsed -
        config.accelduration -
        config.collapseduration;

    const progress =
        clamp(
            impactElapsed /
            config.impactduration,
            0,
            1
        );


    const impact =
        Math.sin(
            progress * Math.PI
        );


    orbitskala =
        Math.max(
            0.05,
            0.05 + impact * 0.03
        );


    const coreScale =
        0.35 +
        impact * 3.8;

    const coreOpacity =
        0.9 +
        impact * 0.1;

    const coreBlur =
        8 +
        impact * 25;

    core.style.transform =
        `scale(${coreScale})`;

    core.style.opacity =
        coreOpacity;

    core.style.filter =
        `blur(${coreBlur}px)`;


    lights.forEach((light) => {

        light.style.opacity =
            0.9 + impact * 0.1;

        light.style.filter =
            `blur(${55 + impact * 30}px)`;

    });


    if (
        progress >= 1 &&
        !animationEnd
    ) {

        animationEnd = true;

        finishIntro();
    }

}



katorbity +=
    orbitSpeed * deltaTime;



updateBlobTransforms();


if (
    elapsed >
    config.accelduration
) {

    const collapseElapsed =
        elapsed -
        config.accelduration;

    const progress =
        clamp(
            collapseElapsed /
            config.collapseduration,
            0,
            1
        );

    const eased =
        easeInQuint(progress);


    const coreScale =
        0.35 +
        eased * 1.8;

    const coreOpacity =
        0.12 +
        eased * 0.72;

    const coreBlur =
        7 +
        eased * 18;


    core.style.transform =
        `scale(${coreScale})`;

    core.style.opacity =
        coreOpacity;

    core.style.filter =
        `blur(${coreBlur}px)`;
}



const collapseStart =
    config.accelduration;

const collapseEnd =
    collapseStart +
    config.collapseduration;

if (elapsed > collapseStart) {

    const progress =
        clamp(
            (
                elapsed -
                collapseStart
            ) /
            config.collapseduration,
            0,
            1
        );

    const eased =
        easeInCubic(progress);


    background.style.setProperty(
        "--backgroundbrightness",
        1 - eased * 0.72
    );
}

}


function updateBlobTransforms() {

lights.forEach((light, index) => {



    const angle =
        katorbity +
        (
            index *
            Math.PI *
            2 /
            lights.length
        );


    const radius =
        config.orbitsize *
        orbitskala;


    const collapseAmount =
        1 - orbitskala;

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
});

}


startButton.addEventListener("click", () => {


if (startmoment !== null) {
    return;
}


background.classList.add("started");


startButton.disabled = true;

startButton.textContent =
    "Initializing...";



welcomeCard.style.transform =
    "translateY(-20px) scale(0.96)";

welcomeCard.style.opacity =
    "0";

welcomeCard.style.filter =
    "blur(10px)";



startmoment = performance.now();



setTimeout(() => {

    welcomeCard.style.display =
        "none";

}, 850);

});

/* =========================================================
KONIEC INTRO
========================================================= */

function finishIntro() {

/*
 jakiś właściwy interfejs sie tu walnie
*/

popup.classList.add("active");

popup.setAttribute(
    "aria-hidden",
    "false"
);

}



midiYes.addEventListener("click", async () => {

/*
   dodaj tu coś czarnuchu co będzie się działo po kliknięciu "TAK" na popupie MIDI
*/

console.log("MIDI requested");

popup.classList.remove("active");

popup.setAttribute(
    "aria-hidden",
    "true"
);

});

midiNo.addEventListener("click", () => {

popup.classList.remove("active");

popup.setAttribute(
    "aria-hidden",
    "true"
);

});


function animate(now) {

updateLights(now);

requestAnimationFrame(animate);

}

requestAnimationFrame(animate);