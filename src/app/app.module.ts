import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { rutaComponent } from '../components/Ruta/Ruta';
import { BuscarRutaPage } from '../pages/buscarRuta/buscarRuta.page';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        rutaComponent,
        BuscarRutaPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        BuscarRutaPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Keyboard,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
