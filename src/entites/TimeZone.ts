export default class TimeZone {
    private _timestamp: string;
    private _formatted : number;

    constructor(
        timestamp: string, 
        formatted: number
    ){
        this._timestamp = timestamp;
        this._formatted = formatted;
    }

    get timestamp(): string{
        return this._timestamp
    }
    
    get formatted(): number{
        return this._formatted
    }

}