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

let monsterWalk1Buffer = new ArrayBuffer(32);
let monsterWalk2Buffer = new ArrayBuffer(32);
let monsterWalk1Pixel = new Uint16Array(monsterWalk1Buffer);
let monsterWalk2Pixel = new Uint16Array(monsterWalk2Buffer);

monsterWalk1Pixel[0]  = 0b0000000000000000;
monsterWalk1Pixel[1]  = 0b0000000000000000;
monsterWalk1Pixel[2]  = 0b0000000000000000;
monsterWalk1Pixel[3]  = 0b0000000000000000;
monsterWalk1Pixel[4]  = 0b0000000000000000;
monsterWalk1Pixel[5]  = 0b0000000000000000;
monsterWalk1Pixel[6]  = 0b0000000000000000;
monsterWalk1Pixel[7]  = 0b0000000000000000;
monsterWalk1Pixel[8]  = 0b0000110001100000;
monsterWalk1Pixel[9]  = 0b0000101110100000;
monsterWalk1Pixel[10] = 0b0001000000010000;
monsterWalk1Pixel[11] = 0b0010010001001000;
monsterWalk1Pixel[12] = 0b0010010001001000;
monsterWalk1Pixel[13] = 0b0010000100001000;
monsterWalk1Pixel[14] = 0b0010000000001000;
monsterWalk1Pixel[15] = 0b0001111111110000;

// monsterWalk1Pixel[0]  = 0b0000000000000000;
// monsterWalk1Pixel[1]  = 0b0000001111100000;
// monsterWalk1Pixel[2]  = 0b0000010000010000;
// monsterWalk1Pixel[3]  = 0b0000110110001000;
// monsterWalk1Pixel[4]  = 0b0011000011001000;
// monsterWalk1Pixel[5]  = 0b0100000111000100;
// monsterWalk1Pixel[6]  = 0b0111100000000100;
// monsterWalk1Pixel[7]  = 0b0010000000000100;
// monsterWalk1Pixel[8]  = 0b0001111100001000;
// monsterWalk1Pixel[9]  = 0b0000110000101000;
// monsterWalk1Pixel[10] = 0b0001010001000100;
// monsterWalk1Pixel[11] = 0b0001110001110100;
// monsterWalk1Pixel[12] = 0b0000011000010010;
// monsterWalk1Pixel[13] = 0b0001100111100010;
// monsterWalk1Pixel[14] = 0b0010100101010101;
// monsterWalk1Pixel[15] = 0b0011111101111111;

monsterWalk2Pixel[0]  = 0b0000000000000000;
monsterWalk2Pixel[1]  = 0b0000000000000000;
monsterWalk2Pixel[2]  = 0b0000000000000000;
monsterWalk2Pixel[3]  = 0b0000000000000000;
monsterWalk2Pixel[4]  = 0b0000000000000000;
monsterWalk2Pixel[5]  = 0b0000000000000000;
monsterWalk2Pixel[6]  = 0b0000011111000000;
monsterWalk2Pixel[7]  = 0b0000100000110000;
monsterWalk2Pixel[8]  = 0b0000010000001000;
monsterWalk2Pixel[9]  = 0b0000001000100100;
monsterWalk2Pixel[10] = 0b0000000101101010;
monsterWalk2Pixel[11] = 0b0000000100000010;
monsterWalk2Pixel[12] = 0b0001010100000110;
monsterWalk2Pixel[13] = 0b0001111000000100;
monsterWalk2Pixel[14] = 0b0001000000001000;
monsterWalk2Pixel[15] = 0b0000111111110000;

let monsterScreen = new MonsterScreen(monsterWalk1Pixel, monsterWalk2Pixel, monPosX,monFace);

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


