import { PipeTransform, Pipe } from '@angular/core';
@Pipe({
    name: 'FilterAppli'
})
export class FilterAppli implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (application: any) {
                return application.codeApp.toString().toLowerCase().indexOf(input) > -1 ||
                application.title.toString().toLowerCase().indexOf(input) > -1 ||
                application.description.toString().toLowerCase().indexOf(input) > -1;
            });
        }
        return value;
    }
}
