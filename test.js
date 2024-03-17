const problem = {
    1: '-3x - 5 = 1',
    2: '-8x -1 = -17',
    3: '9x + 3 = -6',
    4: '2x - 1 = 7',
    5: '-5x - 3 = 2',
    6: 'x - 11 = -12',
};
const ans = {
    '-3x - 5 = 1' : '-2',
    '-8x -1 = -17': '2',
    '9x + 3 = -6' : '-1',
    '2x - 1 = 7' : '4',
    '-5x - 3 = 2': '-1',
    'x - 11 = -12': '-1',
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

function add(){
    // 前のイベントリスナーを削除する
    btn.removeEventListener('click', handleButtonClick);
    
    random_num = Math.floor(Math.random() * len.length  + 1);
    problems.innerHTML = `<h1>${problem[random_num]}</h1>`;
    number.textContent = cnt;
    cnt++;
    console.log(cnt);

    document.querySelector('.ans_box').value = '';

    // イベントリスナーを追加する
    btn.addEventListener('click', handleButtonClick);
}

async function handleButtonClick() {
    const text = document.querySelector('.ans_box').value;
    if(ans[problem[random_num]] === text){
        console.log('正解');
        true_audio.play();
        await sleep(500);
        add();
    }else{
        console.log('不正解');
        document.querySelector('.ans_box').value = '';
        wrong_audio.play();
    }
}

btn.addEventListener('click', handleButtonClick);

// 初回の問題表示
add();
