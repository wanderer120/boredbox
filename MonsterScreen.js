class MonsterScreen{
    monster;

    constructor(monsterWalk1Pixel, monsterWalk2Pixel, monPosX,monFace){
        this.monster = new Monster(monsterWalk1Pixel, monsterWalk2Pixel, monPosX,monFace);
    }

    run(){
        let screenArr = [];

        let rnd = Math.floor((Math.random() * 5) + 1);
        if(rnd === 5){
            this.monster.roar();
        }else{
            this.monster.walk();
        }

        //draw screen
        for(let i=0;i<16;i++){
            let pixelRow = this.addExtraZeroStr(this.monster.monsterCurrentSprite[i],32,this.monster.monPosX);
            pixelRow = pixelRow.replace(/0/g,'\u{25A1}').replace(/1/g,'\u{25A0}');
            screenArr.push(pixelRow);
        }
        return screenArr;
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