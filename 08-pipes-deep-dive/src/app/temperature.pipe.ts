import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'pipetemp',
    standalone: true,
    pure: true
})
export class TemperaturePipe implements PipeTransform{
    transform(value: string | number,inputType: 'cel' | 'feh', outputType?: 'cel' | 'feh'): any {
        // let decimal = parseFloat(digits);
        // return value.toFixed(decimal);

        let input: any = value;
        let output;
        if(inputType === 'cel'){
            if(outputType === 'feh'){
                output = (input * 9/5) + 32;
            }else{
                output = input;
            }
        }else{
            if(outputType === 'cel'){
                 output = (input - 32) * 5/9;
            }else{
                output = input;
            }
        }

        return `${output?.toFixed(2)}` + `${
            outputType === 'feh' ? ' °F' : ' °C'
        }`;
    }
}