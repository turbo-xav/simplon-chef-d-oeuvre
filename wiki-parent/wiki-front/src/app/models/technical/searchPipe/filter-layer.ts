import { PipeTransform, Pipe } from '@angular/core';

@Pipe ({
    name: 'FilterLayer'
})

export class FilterLayer implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (layer: any) {
                return layer.name.toString().toLowerCase().indexOf(input) > -1;
            });
        }
        return value;
    }
}

