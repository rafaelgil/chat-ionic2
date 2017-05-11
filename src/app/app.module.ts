import { UsuarioService } from './../services/usuario.service';
import { AngularFireModule } from 'angularfire2';
import { AutenticacaoService } from './../services/autenticacao.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { ChatPage } from "../pages/chat/chat";
import { RegistroPage } from "../pages/registro/registro";
import { SigninPage } from "../pages/signin/signin";

export const firebaseConfig={
    apiKey: "AIzaSyAIMe6thKy7CzoXapFpXNavC2Nfz7UpZTA",
    authDomain: "chat-85ce6.firebaseapp.com",
    databaseURL: "https://chat-85ce6.firebaseio.com",
    projectId: "chat-85ce6",
    storageBucket: "chat-85ce6.appspot.com",
    messagingSenderId: "946094870817"
}

@NgModule({
  declarations: [
    MyApp,
    ChatPage,
    RegistroPage,
    SigninPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatPage,
    RegistroPage,
    SigninPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AutenticacaoService,
    UsuarioService
  ]
})
export class AppModule {}
