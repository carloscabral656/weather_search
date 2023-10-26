import TimeZone from "./TimeZone";

export default class City {
    private _name : string;
    private _long : number;
    private _lat  : number;
    private _country : string;
    private _state : string;
    private _timeZone?: TimeZone;

    constructor(
        name: string, 
        lat: number,
        long: number, 
        country: string,
        state: string
    ){
        this._name = name;
        this._long = long;
        this._lat = lat;
        this._country = country;
        this._state = state;
        this._timeZone = undefined;
    }

    get name(): string{
        return this._name
    }
    
    get long(): number{
        return this._long
    }

    get lat(): number{
        return this._lat
    }

    get country(): string{
        return this._country
    }

    set country(country){
        this._country = country
    }

    get state(): string{
        return this._state
    }

    get timeZone() : TimeZone | undefined{
        return this._timeZone
    }

    set timeZone(timeZone: TimeZone){
        this._timeZone = timeZone
    }
}