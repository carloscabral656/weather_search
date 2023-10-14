export default class Weather {
    private _id: number;
    private _main: string;
    private _description : string;
    private _icon: string;
    private _temperature: number;
    private _wind: number;
    private _humidity : number;
    private _feelsLike : number;


    constructor(
        id   : number, 
        main : string, 
        description: string,
        icon : string,
        temperature: number,
        wind: number,
        humidity: number,
        feelsLike: number
    ){
        this._id = id;
        this._main = main;
        this._description = description;
        this._icon = icon;
        this._temperature = temperature
        this._wind = wind
        this._humidity = humidity
        this._feelsLike = feelsLike
    }

    get id(){
        return this._id;
    }

    set id(id){
        this._id = id;
    }

    get main(){
        return this._main;
    }

    set main(main){
        this._main = main;
    }

    get description(){
        return this._description;
    }

    set description(description){
        this._description = description;
    }

    get icon(){
        return this._icon;
    }

    set icon(icon){
        this._icon = icon;
    }

    get temperature(){
        return this._temperature;
    }

    set temperature(temperature){
        this._temperature = temperature;
    }

    get wind(){
        return this._wind;
    }

    set wind(wind){
        this._wind = wind;
    }
    
    get humidity(){
        return this._humidity;
    }

    set humidity(humidity){
        this._humidity = humidity;
    }

    get feelsLike(){
        return this._feelsLike;
    }

    set feelsLike(feelsLike){
        this._feelsLike = feelsLike;
    }
}