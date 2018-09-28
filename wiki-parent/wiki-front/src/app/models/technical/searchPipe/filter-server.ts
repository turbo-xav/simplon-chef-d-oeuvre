import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'FilterServer'
})

export class FilterServer implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (server: any) {
                return server.name.toString().toLowerCase().indexOf(input) > -1;
            });
        }
        return value;
    }
}

