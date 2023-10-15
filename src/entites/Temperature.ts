import Scale from "./Scale";

export default class Temperature {
    protected _value: number;
    protected _scale: Scale;

    constructor(
        value: number,
        scale: Scale
    ){
        this._value = value;
        this._scale = scale;
    }

    get scale(){
        return this._scale;
    }

    get value(){
        return this._value;
    }

}