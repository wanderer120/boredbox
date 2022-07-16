let screenDOM = document.getElementById('screen');
let screenUI = screenDOM.getContext("2d");
screenUI.font = "12px Arial";

let monPosX = 0;
let monFace = 0;
// screenUI.beginPath();
// screenUI.rect(20, 20, 150, 100);
// screenUI.fillStyle = "red";
// screenUI.fill();
// screenUI.fillStyle = "black";

let monsterScreen = new MonsterScreen(monPosX,monFace);

setInterval(()=>{
    let screenArr = [];
    
    screenArr = monsterScreen.run();
    
    //draw screen
    screenUI.clearRect(0, 0, screenDOM.width, screenDOM.height);
    screenUI.fillText(screenArr[0], 10, 50);
    screenUI.fillText(screenArr[1], 10, 56);
    screenUI.fillText(screenArr[2], 10, 62);
    screenUI.fillText(screenArr[3], 10, 68);
    screenUI.fillText(screenArr[4], 10, 74);
    screenUI.fillText(screenArr[5], 10, 80);
    screenUI.fillText(screenArr[6], 10, 86);
    screenUI.fillText(screenArr[7], 10, 92);
    screenUI.fillText(screenArr[8], 10, 98);
    screenUI.fillText(screenArr[9], 10, 104);
    screenUI.fillText(screenArr[10], 10, 110);
    screenUI.fillText(screenArr[11], 10, 116);
    screenUI.fillText(screenArr[12], 10, 122);
    screenUI.fillText(screenArr[13], 10, 128);
    screenUI.fillText(screenArr[14], 10, 134);
    screenUI.fillText(screenArr[15], 10, 140);
},500);

// function getCursorPosition(canvas, event) {
//     const rect = canvas.getBoundingClientRect()
//     const x = event.clientX - rect.left
//     const y = event.clientY - rect.top
//     console.log("x: " + x + " y: " + y)
// }

// const canvas = document.getElementById('screenUI');
// console.log("w:"+canvas.width);
// canvas.addEventListener('mousedown', function(e) {
//     getCursorPosition(canvas, e)
// })


