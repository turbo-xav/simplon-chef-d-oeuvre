import { ServerService } from './../../../../services/server.service';
import { Component, OnInit } from '@angular/core';
import { Server } from '../../../../models/server';
import { Layer } from '../../../../models/layer';
import { FormBuilder, FormGroup, FormControl, Validators } from '../../../../../../node_modules/@angular/forms';
import { LayerService } from '../../../../services/layer.service';
import { Router, ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { HttpErrorResponse } from '../../../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-server-edit',
  templateUrl: './server-edit.component.html',
  styleUrls: ['./server-edit.component.scss']
})
export class ServerEditComponent implements OnInit {

  server: Server;
  layers: Layer[];

  error: Error = new Error('');

  serverForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private serverService: ServerService,
    private layerService: LayerService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.serverService.getServer(Number(id)).subscribe(
        (server: Server) => {
          if (server != null) {
            this.server = server;
          } else {
            this.router.navigateByUrl('/admin/diagnostic/server');
          }
        }
      );
    } else {
      this.server = new Server(null, '');
    }
    this.createFormControls();
    this.loadLayers();

  }

  loadLayers() {
    this.layerService.getLayers().subscribe(
      (layers: Layer[]) => {
        this.layers = layers;
      },
      (response: HttpErrorResponse) => {
        this.error = response.error;
      }
    );

  }


  createFormControls() {
    const name = new FormControl('', [Validators.required]);
    const serverLayer = new FormControl('', []);

    this.serverForm = this.formBuilder.group({
      name: name,
      serverLayer : serverLayer
    });
  }
  get name() {
    return this.serverForm.get('name');
  }
get serverLayer() {
  return this.serverForm.get('serverLayer');
}

changeLayer(layerId) {
  this.server.layer = new Layer(layerId, null);
}

  save() {
    if (this.serverForm.valid) {
      this.serverService.saveServer(this.server).subscribe(
        () => {
          this.router.navigateByUrl('/admin/diagnostic/server');
        },
        (response: HttpErrorResponse) => {
          this.error = response.error;
          // console.log(this.error.errors);
        }
      );
    }
  }
}
