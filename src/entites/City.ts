export default class City {
    protected name : string;
    protected long : number;
    protected lat  : number;
    protected country : string;
    protected state : string;

    constructor(
        name: string, 
        long: number, 
        lat: number,
        country: string,
        state: string
    ){
        this.name = name;
        this.long = long;
        this.lat = lat;
        this.country = country;
        this.state = state;
    }
}