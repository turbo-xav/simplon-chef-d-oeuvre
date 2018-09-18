import * as jquery from 'jquery';
import 'datatables.net';

export class DataTableUtils {

    private table: any;

    public constructor() {
    }

    public getTable(): any {
        return this.table;
    }

    public generate() {
         this.table = jquery('.table');
         const table = this.table;
        jquery(document).ready(
          function() {
             table.DataTable({
                              'searching': false,
                              'language': {
                                            'url': '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
                                }
                          });
        });
    }
}
