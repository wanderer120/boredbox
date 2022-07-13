let screenDOM = document.getElementById('screen');
let screenUI = screenDOM.getContext("2d");
screenUI.font = "12px Arial";

// screenUI.beginPath();
// screenUI.rect(20, 20, 150, 100);
// screenUI.fillStyle = "red";
// screenUI.fill();
// screenUI.fillStyle = "black";

let monPosX = 0;
let monFace = 0;
let monMoveSeq = 0b10011010;

let monsterBuffer = new ArrayBuffer(32);
let monsterWalk1Pixel = new Uint16Array(monsterBuffer);
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

//screen = 16 x 32
let screenBuffer = new ArrayBuffer(64);
let screenBinArr = new Uint16Array(screenBuffer);



// screenUI.fillText("\u{25A0}\u{25A0}\u{25A0}\u{25A0}\u{25A0}", 10, 50);
// screenUI.fillText("\u{25A0}\u{25A0}\u{25A0}\u{25A0}\u{25A0}", 10, 56);
// screenUI.fillText("\u{25A0}\u{25A0}\u{25A1}\u{25A0}\u{25A0}", 10, 62);
// screenUI.fillText("\u{25A0}\u{25A0}\u{25A0}\u{25A0}\u{25A0}", 10, 68);
// screenUI.fillText("\u{25A0}\u{25A0}\u{25A0}\u{25A0}\u{25A0}", 10, 74);

//0001111111110000000000000000000000000000000000000000000000
//test monster
for (let i = 15; i < 16; i++) {
    // let pixelRow = addExtraZero(monsterWalk1Pixel[i],32,monPosX);
    // console.log(screenBinArr[i].toString(2));
    // screenBinArr[i] = screenBinArr[i] ^ pixelRow;
    // screenBinArr[i] = screenBinArr[i] >> 1;
    console.log("before:"+monsterWalk1Pixel[i].toString(2));
    let monsterPixelRow = addExtraZeroStr(monsterWalk1Pixel[i],32,monPosX);
    console.log('after:'+monsterPixelRow);
}

setInterval(()=>{
    let screenArr = [];
    //init blank screen
    for (let i = 0; i < 16; i++) {
        screenBinArr[i] = 0;
    }
    // move monster randomly;
    moveMonster();

    //flip monster image
    let monsterPixel = monsterWalk1Pixel;
    if(monFace === 1){
        // monsterPixel = flipMonster(monsterPixel);
    }
    //draw screen
    for(let i=0;i<16;i++){
        //draw monster
        // let pixelRow = addExtraZero(screenBinArr[i],32,0);
        // pixelRow = pixelRow.replace(/0/g,'\u{25A1}').replace(/1/g,'\u{25A0}');
        // screenArr.push(pixelRow);
        
        let pixelRow = addExtraZeroStr(monsterPixel[i],32,monPosX);
        pixelRow = pixelRow.replace(/0/g,'\u{25A1}').replace(/1/g,'\u{25A0}');
        screenArr.push(pixelRow);
    }
    
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


function addExtraZeroStr(binaryStr, width, xPos){
    let binArr = binaryStr.toString(2).slice();
    let extraZeroFront = '';
    let extraZeroBack = '';
    for (let i = 0; i < 16 - binArr.length + (xPos<16?xPos:16) ; i++) {
        extraZeroFront+='0';
    }
    // console.log(binArr.length);
    // console.log(extraZeroFront.length);
    // console.log(width - (extraZeroFront.length + binArr.length));
    for (let i = 0; i < width - (extraZeroFront.length + binArr.length); i++) {
        extraZeroBack+='0';
    }
    return extraZeroFront + binArr + extraZeroBack;
}
function moveMonster(){
    // monFace = Math.round(Math.random());
    if(monPosX - 1 < 0){
        monFace = 1;
    }
    if(monPosX + 1 > 16){
        monFace = 0;
    }
    let rnd = Math.floor((Math.random() * 10) + 1);
    if(rnd === 10){
        monFace = (monFace===0)?1:0;
    }
    switch(monFace){
        case 0:
            monPosX--;
            break;
        case 1:
            monPosX++;
            break;
    }
}
function flipMonster(pixelArr){
    let _pixelArr = pixelArr;
    for(let i=0; i<16; i++){
        // console.log(_pixelArr[i].toString(2));
        _pixelArr = mirror_bits(_pixelArr[i]);
    }

    return _pixelArr;
}
function mirror_bits(n) {
    let t = n.toString(2).split("");
    let str_len = t.length;
    for (let i = 0; i < 8 - str_len; i++) {
        t.unshift("0");
    }
    return parseInt(t.reverse().join(""), 2);
}
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


