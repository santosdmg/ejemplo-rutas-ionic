import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Searchbar, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
    selector: 'page-buscar-ruta',
    templateUrl: './buscarRuta.page.html',
})
export class BuscarRutaPage {
    @ViewChild(Searchbar) searchBarInput: Searchbar;

    origen: any;
    destino: any;
    posicionIni: Number;
    posicionFin: Number;
    direccion: String;
    tipo: string;
    searchQuery: string = '';
    items: any[];

    constructor(public navCtrl: NavController, private navParams: NavParams) {
        this.initializeItems();
    }

    ionViewWillEnter() {
        console.log(this.navParams);
        this.tipo = this.navParams.data.tipo;
        this.origen = this.navParams.data.origen;
        this.destino = this.navParams.data.destino;
        this.direccion = this.navParams.data.direccion;
        if(this.origen)
            this.posicionIni = this.origen.posicion;
        if(this.destino)
            this.posicionFin = this.destino.posicion;

        this.generarLimites();
    }
    ionViewDidEnter() {
        // setTimeout(() => {
        //     this.searchBarInput.setFocus();
        // });
    }

    initializeItems() {
        this.items = [
            {
                nombre: "Ruta 1",
                posicion: 0
            },
            {
                nombre: "Ruta 2",
                posicion: 1
            },
            {
                nombre: "Ruta 3",
                posicion: 2
            },
            {
                nombre: "Ruta 4",
                posicion: 3
            }
        ];
    }

    generarLimites() {
        if(this.direccion == "" || this.direccion == undefined || this.direccion == "normal")
        {
            if (this.items[0].posicion != 0)
                this.items = this.items.reverse();
        }else {
            if (this.items[0].posicion != 3)
                this.items = this.items.reverse();
        }

        if(this.tipo == "origen") {
            this.items.forEach(item => {
                if(this.destino) {
                    if(this.direccion == "" || this.direccion == undefined || this.direccion == "normal") {
                        if(item.posicion <= this.destino.posicion) {
                            item.activo = true;
                        }else {
                            item.activo = false;
                        }
                    }else {
                        if(item.posicion >= this.destino.posicion) {
                            item.activo = true;
                        }else {
                            item.activo = false;
                        }
                    }
                }else {
                    item.activo = true;
                }
            })
        }else {
            this.items.forEach(item => {
                if(this.origen) {
                    if(this.direccion == "" || this.direccion == undefined || this.direccion == "normal") {
                        if(item.posicion < this.origen.posicion) {
                            item.activo = false;
                        }else {
                            item.activo = true;
                        }
                    }else {
                        if(item.posicion > this.origen.posicion) {
                            item.activo = false;
                        }else {
                            item.activo = true;
                        }
                    }
                }else {
                    item.activo = true;
                }
            })
        }
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        const val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter((item) => {
                return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    selectItem(ruta?) {
        if (this.tipo == "origen") {
            this.navCtrl.setRoot(HomePage, { origen: ruta, destino: this.destino, direccion:this.direccion });
        } else {
            this.navCtrl.setRoot(HomePage, { origen: this.origen, destino: ruta, direccion:this.direccion })
        }
    }
}
