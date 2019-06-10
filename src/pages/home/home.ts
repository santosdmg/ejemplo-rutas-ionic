import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BuscarRutaPage } from '../buscarRuta/buscarRuta.page';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    origen:any;
    destino:any;
    temporal:any;

    direccion: String; // la direccion puede tomar 2 valores (normal o invertir)

    rutas = [
        {
            nombre: "Ruta 1",
            posicion:0,
            activa: false
        },
        {
            nombre: "Ruta 2",
            posicion:1,
            activa: false
        },
        {
            nombre: "Ruta 3",
            posicion:2,
            activa: false
        },
        {
            nombre: "Ruta 4",
            posicion:3,
            activa: false
        },
    ];
    rutaActiva: any;
    constructor(public navCtrl: NavController,
        private navParams: NavParams) {

    }

    ionViewWillEnter(){
        if (this.navParams.data.origen)
            this.origen = this.navParams.data.origen;
        if (this.navParams.data.destino)
            this.destino = this.navParams.data.destino;
        this.direccion = this.navParams.data.direccion ? this.navParams.data.direccion : "";
        this.activarRutas();
    }

    seleccionarRuta(nombreRuta) {
        this.rutas.forEach(item => {
            if (nombreRuta == item.nombre) {
                this.rutaActiva = item;
            }
        })
    }

    irBuscarRuta(tipo) {
        if (tipo=="origen") {
            this.navCtrl.push(BuscarRutaPage, {tipo:"origen", origen:this.origen, destino:this.destino, direccion: this.direccion});
        }else {
            this.navCtrl.push(BuscarRutaPage, {tipo:"destino", origen:this.origen, destino:this.destino, direccion: this.direccion});
        }
    }

    cambioDireccion() {
        if(this.direccion == "normal") {
            this.direccion = "invertir";
        }else if(this.direccion == "invertir") {
            this.direccion = "normal";
        }else {
            this.direccion = "invertir"
        }

        this.temporal = this.origen;
        this.origen = this.destino;
        this.destino = this.temporal;
        this.activarRutas();
    }

    activarRutas() {
        if(this.direccion == "" || this.direccion == undefined || this.direccion == "normal")
        {
            if (this.rutas[0].posicion != 0)
                this.rutas = this.rutas.reverse();
        }else {
            if (this.rutas[0].posicion != 3)
                this.rutas = this.rutas.reverse();
        }
        this.rutas.forEach(item => {
            if(this.origen && this.destino) {
                if(this.direccion == "" || this.direccion == undefined || this.direccion == "normal") {
                    if(item.posicion >= this.origen.posicion && item.posicion <= this.destino.posicion)
                        item.activa=true;
                    else {
                        item.activa = false;
                    }
                }else {
                    if(item.posicion <= this.origen.posicion && item.posicion >= this.destino.posicion)
                        item.activa=true;
                    else {
                        item.activa = false;
                    }
                }
            }else if (this.origen) {
                if(this.direccion == "" || this.direccion == undefined || this.direccion == "normal") {
                    if(item.posicion === this.origen.posicion){
                        item.activa = true;
                    }
                }else {
                    if(item.posicion === this.origen.posicion){
                        item.activa = false;
                    }
                }

            }
        })
    }
}
