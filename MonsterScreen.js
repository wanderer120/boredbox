class MonsterScreen{
    shouldFlipImage = false;
    monsterWalk1Buffer = new ArrayBuffer(32);
    monsterWalk2Buffer = new ArrayBuffer(32);
    monsterWalk1Pixel = new Uint16Array(this.monsterWalk1Buffer);
    monsterWalk2Pixel = new Uint16Array(this.monsterWalk2Buffer);
    monPosX;
    monFace;
    monsterPixel
    constructor(monPosX,monFace){
        this.monPosX = monPosX;
        this.monFace = monFace;
        this.monsterWalk1Pixel[0]  = 0b0000000000000000;
        this.monsterWalk1Pixel[1]  = 0b0000000000000000;
        this.monsterWalk1Pixel[2]  = 0b0000000000000000;
        this.monsterWalk1Pixel[3]  = 0b0000000000000000;
        this.monsterWalk1Pixel[4]  = 0b0000000000000000;
        this.monsterWalk1Pixel[5]  = 0b0000000000000000;
        this.monsterWalk1Pixel[6]  = 0b0000000000000000;
        this.monsterWalk1Pixel[7]  = 0b0000000000000000;
        this.monsterWalk1Pixel[8]  = 0b0000110001100000;
        this.monsterWalk1Pixel[9]  = 0b0000101110100000;
        this.monsterWalk1Pixel[10] = 0b0001000000010000;
        this.monsterWalk1Pixel[11] = 0b0010010001001000;
        this.monsterWalk1Pixel[12] = 0b0010010001001000;
        this.monsterWalk1Pixel[13] = 0b0010000100001000;
        this.monsterWalk1Pixel[14] = 0b0010000000001000;
        this.monsterWalk1Pixel[15] = 0b0001111111110000;

        // this.monsterWalk1Pixel[0]  = 0b0000000000000000;
        // this.monsterWalk1Pixel[1]  = 0b0000001111100000;
        // this.monsterWalk1Pixel[2]  = 0b0000010000010000;
        // this.monsterWalk1Pixel[3]  = 0b0000110110001000;
        // this.monsterWalk1Pixel[4]  = 0b0011000011001000;
        // this.monsterWalk1Pixel[5]  = 0b0100000111000100;
        // this.monsterWalk1Pixel[6]  = 0b0111100000000100;
        // this.monsterWalk1Pixel[7]  = 0b0010000000000100;
        // this.monsterWalk1Pixel[8]  = 0b0001111100001000;
        // this.monsterWalk1Pixel[9]  = 0b0000110000101000;
        // this.monsterWalk1Pixel[10] = 0b0001010001000100;
        // this.monsterWalk1Pixel[11] = 0b0001110001110100;
        // this.monsterWalk1Pixel[12] = 0b0000011000010010;
        // this.monsterWalk1Pixel[13] = 0b0001100111100010;
        // this.monsterWalk1Pixel[14] = 0b0010100101010101;
        // this.monsterWalk1Pixel[15] = 0b0011111101111111;

        this.monsterWalk2Pixel[0]  = 0b0000000000000000;
        this.monsterWalk2Pixel[1]  = 0b0000000000000000;
        this.monsterWalk2Pixel[2]  = 0b0000000000000000;
        this.monsterWalk2Pixel[3]  = 0b0000000000000000;
        this.monsterWalk2Pixel[4]  = 0b0000000000000000;
        this.monsterWalk2Pixel[5]  = 0b0000000000000000;
        this.monsterWalk2Pixel[6]  = 0b0000011111000000;
        this.monsterWalk2Pixel[7]  = 0b0000100000110000;
        this.monsterWalk2Pixel[8]  = 0b0000010000001000;
        this.monsterWalk2Pixel[9]  = 0b0000001000100100;
        this.monsterWalk2Pixel[10] = 0b0000000101101010;
        this.monsterWalk2Pixel[11] = 0b0000000100000010;
        this.monsterWalk2Pixel[12] = 0b0001010100000110;
        this.monsterWalk2Pixel[13] = 0b0001111000000100;
        this.monsterWalk2Pixel[14] = 0b0001000000001000;
        this.monsterWalk2Pixel[15] = 0b0000111111110000;

        this.monsterPixel = this.monsterWalk1Pixel;
    }

    run(){
        let screenArr = [];

        let isMove = true;
        let rnd = Math.floor((Math.random() * 5) + 1);
        if(rnd === 5){
            this.monsterPixel = this.monsterWalk2Pixel;
            isMove = false;
        }else{
            this.monsterPixel = this.monsterWalk1Pixel;
        }
        if(this.shouldFlipImage){
            this.monsterWalk2Pixel = this.flipMonster(this.monsterWalk2Pixel);
            this.monsterWalk1Pixel = this.flipMonster(this.monsterWalk1Pixel);
            this.shouldFlipImage = false;
        }
        if(isMove){
            this.moveMonster();
        }
        //draw screen
        for(let i=0;i<16;i++){
            let pixelRow = this.addExtraZeroStr(monsterScreen.monsterPixel[i],32,monsterScreen.monPosX);
            pixelRow = pixelRow.replace(/0/g,'\u{25A1}').replace(/1/g,'\u{25A0}');
            screenArr.push(pixelRow);
        }
        return screenArr;
    }
    moveMonster(){
        if(this.monPosX - 1 < 0){
            this.monFace = 1;
            this.shouldFlipImage = true;
        }
        if(this.monPosX + 1 > 16){
            this.monFace = 0;
            this.shouldFlipImage = true;
        }
        
        let rnd = Math.floor((Math.random() * 10) + 1);
        if(rnd === 10){
            this.monFace = (this.monFace===0)?1:0;
            this.shouldFlipImage = true;
        }
        switch(this.monFace){
            case 0:
                this.monPosX--;
                break;
            case 1:
                this.monPosX++;
                break;
        }
    }
    flipMonster(pixelArr){
        let _pixelArr = pixelArr;
        for(let i=0; i<16; i++){
            _pixelArr[i] = this.mirror_bits(_pixelArr[i]);
        }
        return _pixelArr;
    }
    mirror_bits(n) {
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
    addExtraZeroStr(binaryStr, width, xPos){
        let binArr = binaryStr.toString(2).slice();
        let extraZeroFront = '';
        let extraZeroBack = '';
        for (let i = 0; i < 16 - binArr.length + (xPos<16?xPos:16) ; i++) {
            extraZeroFront+='0';
        }
        for (let i = 0; i < width - (extraZeroFront.length + binArr.length); i++) {
            extraZeroBack+='0';
        }
        return extraZeroFront + binArr + extraZeroBack;
    }
}