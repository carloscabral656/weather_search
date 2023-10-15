export const convertScale = {
    kelvinToFahrenheit(kelvin: number) : number{
        return Math.ceil((kelvin - 273.15) * 1.8 + 32);
    },

    kelvinToCelsius(kelvin: number) : number{
        return Math.ceil(kelvin - 273.15);
    }
}