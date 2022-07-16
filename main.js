let screenDOM = document.getElementById('screen');
let screenUI = screenDOM.getContext("2d");
screenUI.font = "12px Arial";

// screenUI.beginPath();
// screenUI.rect(20, 20, 150, 100);
// screenUI.fillStyle = "red";
// screenUI.fill();
// screenUI.fillStyle = "black";
let shouldFlipImage = false;
let monPosX = 0;
let monFace = 0;
let monMoveSeq = 0b10011010;
let monMoveFramePointer = 0;
let monState = 0;

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
    // console.log("before:"+monsterWalk1Pixel[i].toString(2));
    let monsterPixelRow = addExtraZeroStr(monsterWalk1Pixel[i],32,monPosX);
    // console.log('after:'+monsterPixelRow);
}
// monsterWalk1Pixel = flipMonster(monsterWalk1Pixel);

// let test = flipMonster(monsterWalk1Pixel);
setInterval(()=>{
    let screenArr = [];
    //init blank screen
    for (let i = 0; i < 16; i++) {
        screenBinArr[i] = 0;
    }
    let monsterPixel = monsterWalk1Pixel;

    // monState = updateFrame(monMoveSeq);
    // // console.log(monState);
    // let isChangeState = false;
    // switch(monState){
    //     case 0:
    //         monsterPixel = monsterWalk1Pixel;
    //         break;
    //     case 1:
    //         //roar
    //         monsterPixel = monsterWalk2Pixel;
    //         isChangeState = true;
    //         break;
    // }
    // console.log(`before monFace:${monFace} shouldFlipImage:${shouldFlipImage}`);
    // //flip monster image
    // if(monFace === 1){
    //     monsterPixel = flipMonster(monsterPixel);
    //     // shouldFlipImage = false;
    // }
    // console.log(`after monFace:${monFace} shouldFlipImage:${shouldFlipImage}`);
    // if(isChangeState == false){
    //     // move monster randomly;
    //     moveMonster();
    // }
        
    
    let rnd = Math.floor((Math.random() * 5) + 1);
    if(rnd === 5 ){
        monState = 1;
    }
    if(monState === 1){
        monsterPixel = monsterWalk2Pixel;
        monState = 0;
    }else{
        monsterPixel = monsterWalk1Pixel;
    }
    if(monFace === 1){
        monsterPixel = flipMonster(monsterPixel);
        // shouldFlipImage = false;
    }
    moveMonster();
    
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

function updateFrame(seqBinary){
    let _arr = seqBinary.toString(2).split('');
    if(monMoveFramePointer < _arr.length)
        monMoveFramePointer++;
    else
        monMoveFramePointer = 1;
    return parseInt(_arr[monMoveFramePointer-1]);
}

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
        shouldFlipImage = true;
    }
    if(monPosX + 1 > 16){
        monFace = 0;
        shouldFlipImage = true;
    }
    let rnd = Math.floor((Math.random() * 10) + 1);
    if(rnd === 10){
        monFace = (monFace===0)?1:0;
        shouldFlipImage = true;
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
        // console.log('before:'+_pixelArr[i].toString(2));
        _pixelArr[i] = mirror_bits(_pixelArr[i]);
        // console.log('after:'+_pixelArr[i].toString(2));
    }
    return _pixelArr;
}
function mirror_bits(n) {
    let str = n.toString(2);
    let extraZero = '';
    for (let i = 0; i < 16-str.length; i++) {
        extraZero += '0';
    }
    str = extraZero + str;
    let t = str.split("");
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


