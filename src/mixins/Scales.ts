export const convertScale = {
    kelvinToFahrenheit(kelvin: number): number{
        return Math.ceil((kelvin - 273.15) * 1.8 + 32);
    },

    kelvinToCelsius(kelvin: number): number{
        return Math.ceil(kelvin - 273.15);
    },

    fahrenheitToCelsius(fahrenheit: number): number{
        return Math.ceil((fahrenheit - 32) * 5/9);
    },

    fahrenheitToKelvin(fahrenheit: number): number{
        return Math.ceil((fahrenheit - 32) * 5/9 + 273.15);
    },

    celsiusToFahrenheit(celsius: number){
        return Math.ceil((celsius * 9/5) + 32);
    },

    celsiusToKelvin(celsius: number){
        return Math.ceil(celsius + 273.15);
    }
    
}