import * as jquery from 'jquery';
import 'datatables.net';

export class DataTableUtils {

    public generate() {
        jquery(document).ready(
          function() {
            console.log(this.className);
            const table: any = jquery('.table');
            table.DataTable({
                              'searching': false,
                              'language': {
                                            'url': '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
                                }
                          });
        });
    }
}
