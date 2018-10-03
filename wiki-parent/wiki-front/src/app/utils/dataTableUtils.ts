import * as jquery from 'jquery';
import 'datatables.net';

export class DataTableUtils {

    public constructor() {
    }

    public generate() {
        this.initDataTable();
    }

    public remove(id: number) {
        const idToRemove = '.row' + String(id);
        jquery('.table').DataTable().rows( idToRemove ).remove();
    }

    public initDataTable() {
        jquery(document).ready( function() {
            if (!jquery.fn.dataTable.isDataTable( '.table' ) ) {
                jquery('.table').DataTable( {
                    'paging': false,
                    'searching': false,
                            'language': {
                                            'url': '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
                                }
                } );
            } else {
                jquery('.table').DataTable();
            }
        });
    }
}
