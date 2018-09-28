import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterPipe'
 })


export class FilterPipe  implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (diag: any) {
                return diag.application.codeApp.toString().toLowerCase().indexOf(input) > -1 ||
                diag.url.toString().toLowerCase().indexOf(input) > -1 ||
                diag.server.name.toString().toLowerCase().indexOf(input) > -1 ||
                diag.server.layer.name.toString().toLowerCase().indexOf(input) > -1 ||
                diag.server.layer.environ.name.toString().toLowerCase().indexOf(input) > -1;
            });
        }
        return value;
    }

}
