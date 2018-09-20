import { HttpErrorResponse } from '@angular/common/http';
import { Layer } from './../../../models/layer';
import { DataTableUtils } from './../../../utils/dataTableUtils';
import { LayerService } from './../../../services/layer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss']
})
export class LayerComponent implements OnInit {

layers: Layer[] = [];
error: Error;

constructor(
  private layerService: LayerService,
  private dataTableUtils: DataTableUtils
) {}

protected gererateDataTable(): void {
  this.dataTableUtils.generate();
}

ngOnInit() {
  this.loadLayers();

}

delete(id: number) {
  this.layerService.deleteLayer(id).subscribe(
    () => {
      this.loadLayers();
    }
  );
}

loadLayers() {
  this.layerService.getLayers().subscribe(
    (layers: Layer[]) => {
      this.layers = layers;
      this.gererateDataTable();
    },
    (response: HttpErrorResponse) => {
      this.error = response.error;
    }
  );
}
}
