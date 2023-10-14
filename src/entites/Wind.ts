export default class Wind {
    private _speed : number;

    constructor(
        speed: number
    ){
        this._speed = speed;
    }

    get speed() : number{
        return this._speed;
    }

    set speed(speed: number){
        this._speed = speed;
    }
}