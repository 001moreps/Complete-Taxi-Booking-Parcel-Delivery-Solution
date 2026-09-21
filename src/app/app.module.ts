import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
 declarations:[AppComponent],
 imports:[BrowserModule,IonicModule.forRoot(),AngularFireModule.initializeApp(environment.firebase),AngularFirestoreModule,AngularFireFunctionsModule,AppRoutingModule,FormsModule,ReactiveFormsModule],
 providers:[{provide:RouteReuseStrategy,useClass:IonicRouteStrategy}],
 bootstrap:[AppComponent]
})
export class AppModule {}