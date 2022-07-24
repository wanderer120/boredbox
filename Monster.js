class Monster{
    monsterWalk1Sprite;
    monsterWalk2Sprite;
    monPosX;
    monFace;
    monsterCurrentSprite;
    constructor(monsterWalk1Sprite, monsterWalk2Sprite, monPosX,monFace){
        this.monPosX = monPosX;
        this.monFace = monFace;
        this.monsterWalk1Sprite = monsterWalk1Sprite;
        this.monsterWalk2Sprite = monsterWalk2Sprite;

        this.monsterCurrentSprite = this.monsterWalk1Sprite;
    }
    roar(){
        this.monsterCurrentSprite = this.monsterWalk2Sprite;
    }
    walk(){
        this.monsterCurrentSprite = this.monsterWalk1Sprite;
        let shouldFlipImage = false;
        if(this.monPosX - 1 < 0){
            this.monFace = 1;
            shouldFlipImage = true;
        }
        if(this.monPosX + 1 > 16){
            this.monFace = 0;
            shouldFlipImage = true;
        }
        
        let rnd = Math.floor((Math.random() * 10) + 1);
        if(rnd === 10){
            this.monFace = (this.monFace===0)?1:0;
            shouldFlipImage = true;
        }
        switch(this.monFace){
            case 0:
                this.monPosX--;
                break;
            case 1:
                this.monPosX++;
                break;
        }
        if(shouldFlipImage){
            this.monsterWalk2Sprite = this.flipMonster(this.monsterWalk2Sprite);
            this.monsterWalk1Sprite = this.flipMonster(this.monsterWalk1Sprite);
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
}