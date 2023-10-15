export default class Scale {
    protected _id : number;
    protected _name : string;
    protected _simbol : string;
    
    constructor(
        id: number, 
        name: string,
        simbol: string
    ){
        this._id = id;
        this._name = name;
        this._simbol = simbol;
    }

    get id(): number{
        return this._id;
    }

    get name(): string{
        return this._name
    }

    get simbol(): string {
        return this._simbol;
    }
    
}