let Wwidth = 500;
let Wheight = 500;
let N = 50;
let step = 5;
let board = [];
let startT, delay = 0;
let next = [];

let margin = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
};

window.onload = function () {
    $(".step-control span")
        .text($(".step-control input").val());
    $(".cellular-control span")
        .text($(".cellular-control input").val());
}

function updateValue() {
    $(".step-control span")
        .text($(".step-control input").val());
    $(".cellular-control span")
        .text($(".cellular-control input").val());
    N = parseInt($("#number").val());
    step = parseInt($("#step").val());
    margin = GetMargin(Wwidth, Wheight, N, step);
}

function GetMargin(width, height, N, step) {
    let figureSize = N * step;
    let spaceX = width - figureSize;
    let spaceY = height - figureSize;
    return {
        left: spaceX / 2,
        right: spaceX / 2,
        top: spaceY / 2,
        bottom: spaceY / 2
    }
}

function setup() {
    let canvas;
    if (N * step > Math.max(Wwidth, Wheight)) {
        canvas = createCanvas(N * step, N * step);
        canvas.parent("display");
    } else {
        canvas = createCanvas(Wwidth, Wheight);
        canvas.parent("display");
        //Center
        margin = GetMargin(Wwidth, Wheight, N, step);
    }

    //Init
    for (let x = 0; x < N; x++) {
        let cur = [];
        for (let y = 0; y < N; y++) {
            cur.push(parseInt(1000 * Math.random()) % 2);
        }
        board.push(cur);
    }

    for (let x = 0; x < N; x++) {
        let cur = [];
        for (let y = 0; y < N; y++) {
            cur.push(0);
        }
        next.push(cur);
    }
    //Reset timer
    startT = millis();
}

function updateTime() {
    if (millis() > startT + delay) {
        startT = millis();
        return true;
    }
    return false;
}

function getNeighbour(board, x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            count += board[x + i][y + j];
        }
    }
    count -= board[x][y];
    return count;
}

function rules(board, x, y, neighbours) {
    if ((board[x][y] === 1) && (neighbours < 2))
        return 0;
    else if ((board[x][y] === 1) && (neighbours > 3))
        return 0;
    else if ((board[x][y] === 0) && (neighbours === 3))
        return 1;
    else
        return board[x][y];
}

$("#redraw").click(redraw);

function draw() {
    background(0);
    //Update Rules

    // if (updateTime()) {
    for (let x = 1; x < board.length - 1; x++) {
        for (let y = 1; y < board[0].length - 1; y++) {
            let neighbours = getNeighbour(board, x, y);
            next[x][y] = rules(board, x, y, neighbours);
        }
    }
    board = next;
    // } //timer

    //Draw cells
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[0].length; y++) {
            if (board[x][y] === 1) {
                fill(255);
            } else {
                fill(0);
            }
            rect(margin.left + x * step,
                margin.top + y * step,
                step,
                step);
        }
    }
}

function redraw() {
    board = [];
    for (let x = 0; x < N; x++) {
        let cur = [];
        for (let y = 0; y < N; y++) {
            cur.push(parseInt(1000 * Math.random()) % 2);
        }
        board.push(cur);
    }
    next = [];
    for (let x = 0; x < N; x++) {
        let cur = [];
        for (let y = 0; y < N; y++) {
            cur.push(0);
        }
        next.push(cur);
    }

    //update margin
    margin = GetMargin(Wwidth, Wheight, N, step);
}