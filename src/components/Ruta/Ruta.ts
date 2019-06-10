import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
    selector: 'component-ruta',
    templateUrl: 'Ruta.html',
})

export class rutaComponent implements OnInit, OnChanges {
    constructor() { }
    @Input('ruta') ruta: any;
    @Input('destino') destino: any;
    @Input('activo') activo: Boolean;

    posicionDestino: Number;

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        const currentDestino: SimpleChange = changes.destino;
        if(currentDestino) {
            if(currentDestino.currentValue){
                this.posicionDestino = currentDestino.currentValue.posicion;
            }
        }
    }
}
