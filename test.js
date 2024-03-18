const problem = {
    1: '-3x - 5 = 1',
    2: '-8x -1 = -17',
    3: '9x + 3 = -6',
    4: '2x - 1 = 7',
    5: '-5x - 3 = 2',
    6: 'x - 11 = -12',
    7: 'x² - 4x + 4 = 0',
    8: 'x² + 6x + 9 = 0',
    9: 'x² + 10x + 25 = 0',
    10: 'x³ - 9x² + 27x - 27 = 0',
    11: 'log₉ x = log₃ (x - 2)',
    12: 'log₃ (x + 2) = 2',
    13: 'log₃ x + log₃(x - 1) = 12',
};
const ans = {
    '-3x - 5 = 1' : '-2',
    '-8x -1 = -17': '2',
    '9x + 3 = -6' : '-1',
    '2x - 1 = 7' : '4',
    '-5x - 3 = 2': '-1',
    'x - 11 = -12': '-1',
    'x² - 4x + 4 = 0': '2',
    'x² + 6x + 9 = 0': '-3',
    'x² + 10x + 25 = 0': '-5',
    'x³ - 9x² + 27x - 27 = 0': '3',
    'log₉ x = log₃ (x - 2)': '4',
    'log₃ (x + 2) = 2': '7',
    'log₃ x + log₃(x - 1) = 12': '4',
}

const problems = document.querySelector('.problems');
const btn = document.querySelector('.ans_button');
const number = document.querySelector('.number');
const true_audio = new Audio('./music/correct1.mp3');
const wrong_audio = new Audio('./music/Quiz-Wrong_Buzzer02-1.mp3');
const sleep = waitTime => new Promise( resolve => setTimeout(resolve, waitTime) );
let cnt = 1;

let len = Object.keys(problem);
let random_num = Math.floor(Math.random() * len.length  + 1);
let ans_flag = false;

function add(){
    // 前のイベントリスナーを削除する
    btn.removeEventListener('click', handleButtonClick);
    
    random_num = Math.floor(Math.random() * len.length  + 1);
    problems.innerHTML = `<h1>${problem[random_num]}</h1>`;
    number.textContent = cnt;
    cnt++;
    ans_flag = false;

    document.querySelector('.ans_box').value = '';

    // イベントリスナーを追加する
    btn.addEventListener('click', handleButtonClick);
}

async function handleButtonClick() {
    const text = document.querySelector('.ans_box').value;
    if(ans[problem[random_num]] === text){
        console.log('正解');
        true_audio.play();
        ans_flag = true;
        await sleep(500);
        startTimer();
        add();
    }else{
        console.log('不正解');
        document.querySelector('.ans_box').value = '';
        wrong_audio.play();
    }
}

function startTimer() {
    let now_time = 0;
    const intervalId = setInterval(() => {
        now_time++;
        console.log(now_time);
        if(now_time >= 10){
            console.log('Time Over');
            clearInterval(intervalId);
        }
        if(ans_flag){
            console.log('test');
            clearInterval(intervalId);
        }
    }, 1000);
}

function startGame(){
    btn.addEventListener('click', handleButtonClick);
    // 初回の問題表示
    add();
    startTimer();
}

function gameOver(){
    console.log('game over');
}

startGame();
