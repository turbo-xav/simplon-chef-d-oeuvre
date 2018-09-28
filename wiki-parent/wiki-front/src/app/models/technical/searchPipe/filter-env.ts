import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'FilterEnv'
})
export class FilterEnv implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (env: any) {
                return env.name.toString().toLowerCase().indexOf(input) > -1;

            });
        }
        return value;
    }
}
