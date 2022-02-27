let questionsAnswers = {
    0: {
        question: "Bir meyve adı.",
        answer: "elma",
        visited: false
    },
    1: {
        question: "Bir ulaşım aracı.",
        answer: "motosiklet",
        visited: false
    },
    2: {
        question: "Öğrencinin çok sık kullandığı araç-gereç.",
        answer: "kalem",
        visited: false
    },
    3: {
        question: "Dedektif aleti.",
        answer: "büyüteç",
        visited: false
    }
};

const gelenSoru = document.getElementById("question");
const startButton = document.getElementById("start");
const again = document.getElementById("again");
const getKey = document.getElementById("key");
const send = document.getElementById("send");
var size = Object.keys(questionsAnswers).length;
var countOfSize;
let getQuest, getAnsw;

function start() {
    startButton.style.display = "none";
    send.style.display = "block";
    countOfSize = 0;
    destroyPartOfBody();
    chooseQuestion();
}

function chooseQuestion() {
    let a = Math.floor(Math.random() * size);

    if (questionsAnswers[a].visited == true && countOfSize < size) {
        chooseQuestion();
    } else if (countOfSize >= size) {
        gameOver();
    } else {
        countOfSize++;
        countLetter = 0;
        getQuest = questionsAnswers[a].question;
        getAnsw = questionsAnswers[a].answer;
        gelenSoru.innerHTML = getQuest;
        questionsAnswers[a].visited = true;
        ansLength(getAnsw.length);
    }
}

function ansLength(lgth) {
    var line = "";

    for (let index = 0; index < lgth; index++) {
        line += ` <div class="line" id="${index}">` + "<p></p> </div>";
    }

    let answer_area = document.getElementById("answer-area");
    answer_area.insertAdjacentHTML("Beforeend", line);
}

function destroyLines(lgth) {
    for (let index = 0; index < lgth; index++) {
        document.getElementById(index).remove();
    }
}

function addAns(getKey) {
    var i = -1, arr = [];

    while ((i = getAnsw.indexOf(getKey, i + 1)) !== -1) {
        arr.push(i);
        countLetter++;
    }

    for (let index = 0; index < arr.length; index++) {
        const lines = document.getElementById(arr[index]);
        lines.innerHTML = getAnsw.charAt(arr[index]);
    }
}

function destroyPartOfBody() {
    counter = 0;
    for (let index = 0; index < partOfBody.length; index++) {
        document.getElementById(partOfBody[index]).style = "none";
    }
}

function createPartOfBody() {
    var partBody = document.getElementById(partOfBody[counter]);
    partBody.style.display = "block";
}

function againPlay() {
    startButton.style.display = "block";
    getKey.value = null;
    getKey.disabled = false;
    again.style.display = "none";
    gelenSoru.innerHTML = null;
    destroyLines(getAnsw.length);
}

function gameOver() {
    send.style.display = "none";
    getKey.value = "Oyun Bitti.";
    getKey.disabled = true;
    again.style.display = "block";
}

var counter = 0, countLetter = 0, partOfBody = ["rightfoot", "rightleg", "leftfoot", "leftleg", "torso", "rightarm", "leftarm", "head"];
function isThere() {
    var letter = getKey.value.charAt(0).toLowerCase();
    if (letter !== "") {
        var e = getAnsw.includes(letter);

        if (countLetter >= getAnsw.length - 1) {
            destroyLines(getAnsw.length);
            getKey.value = null;
            chooseQuestion();
        } else if (e) {
            addAns(letter);
        } else {
            createPartOfBody();
            counter++;
        }
        console.log(countLetter);
        if (counter >= partOfBody.length) {
            gameOver();
        }

        document.getElementById("key").value = null;
    }
}
