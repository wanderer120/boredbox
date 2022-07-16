class MonsterScreen{
    shouldFlipImage = false;
    monsterWalk1Pixel;
    monsterWalk2Pixel;
    monPosX;
    monFace;
    monsterPixel;

    constructor(monsterWalk1Pixel, monsterWalk2Pixel, monPosX,monFace){
        this.monPosX = monPosX;
        this.monFace = monFace;
        this.monsterWalk1Pixel = monsterWalk1Pixel;
        this.monsterWalk2Pixel = monsterWalk2Pixel;

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