import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterDiagConsult'
})
export class FilterDiagConsult implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (diagnostic: any) {
                let searchParameters: string[];
                searchParameters = input.split('-');

                const appId = searchParameters[0];
                const envirId = searchParameters[1];
                const layerId = searchParameters[2];
                const serverId = searchParameters[3];

                return (appId === '0' || diagnostic.application.id === appId) &&
                (envirId === '0' || diagnostic.server.layer.environ.id === envirId) &&
                (layerId === '0' || diagnostic.server.layer.id === layerId) &&
                (serverId === '0' || diagnostic.server.id === serverId);

            });
        }
        return value;
    }

}
