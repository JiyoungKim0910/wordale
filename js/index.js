const answer = "APPLE";
let index = 0;
let attempts = 0;
let timer;
const appStart = () => {
    const displayGameover = () => {
        const div = document.createElement("div");
        div.innerText = "Game Over";
        div.style = "display:flex; justify-content:center; align-items:center;position:absolute; top:40vh; left:38vw;background-color:white;width:200px;height:100px;";
        document.body.appendChild(div);
    }
    const gameover = () => {
        window.removeEventListener("keydown", handleKeydown);
        displayGameover();
        clearInterval(timer);
    }
    const nextLine = () => {
        // 강의에선 attempts 가 6일때 gameover를 호출하는데 
        // 그러면 마지막 라인에서 enter를 눌렀을땐 attempts값이 5이므로 5일떼 gameover 호출
        if (attempts === 5) return gameover();
        attempts++;
        index = 0;
    }
    const handleBackspace = () => {
        if (index > 0) {
            const preBlock = document.querySelector(`.board-column[data-index='${attempts}${index-1}']`);
            preBlock.innerText = "";
        }
        if (index !== 0) index--;
    }
    const handleEnterKey = () => {
        // answer check
        let correct_count = 0;
        console.log("enter!!!")
        for (let i = 0; i < 5; i++) {
            const block = document.querySelector(`.board-column[data-index='${attempts}${i}']`);

            const input_letter = block.innerText;
            const answer_letter = answer[i];
            console.log(input_letter, answer_letter);
            if (input_letter === answer_letter) {
                correct_count++;
                block.style.background = "#6AAA64";
            } else if (answer.includes(input_letter)) block.style.background = "#C9B458";
            else block.style.background = "#787C7E";
            block.style.color = "white";

        }
        if (correct_count === 5) gameover();
        else nextLine();

    }
    const handleKeydown = (event) => {

        const key = event.key.toUpperCase();
        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(`.board-column[data-index='${attempts}${index}']`);
        if (key === 'BACKSPACE') handleBackspace();
        else if (index === 5) {
            if (key === 'ENTER') handleEnterKey();
            else return;
        } else if (keyCode >= 65 && keyCode <= 90) {
            thisBlock.innerText = key;
            index++;
        }

    };
    const startTimer = () => {
        const start_time = new Date();
        const setTime = () => {
            const now = new Date();
            const running_time = new Date(now - start_time);
            const min = running_time.getMinutes().toString().padStart(2, '0');
            const sec = running_time.getSeconds().toString().padStart(2, '0');
            const timeDiv = document.querySelector("#timer");
            timeDiv.innerText = `${min}:${sec}`;
        }
        timer = setInterval(setTime, 1000);
        // console.log(timer)
        // setInterval 의 ID


    }
    // 키다운 이벤트
    window.addEventListener("keydown", handleKeydown);
    startTimer();
}

appStart();

// javascript 변수명 정할때 camel 표기법 
// 띄어쓰기 할 때 첫글자를 대문자로
// python 은 snake 표기법
// 띄어쓰기 할 때 _(언더바)로