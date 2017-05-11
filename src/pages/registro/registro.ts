import { UsuarioService } from './../../services/usuario.service';
import { Usuario } from './../../models/usuario';
import { AutenticacaoService } from './../../services/autenticacao.service';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the Registro page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public autenticacaoService: AutenticacaoService, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, private usuarioService: UsuarioService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registro');
  }

  registra(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Fazendo o registro da aplicação'
    });
    loading.present();

    const usuario: Usuario = {usuario: form.value.email, 
                              email: form.value.email};

    this.autenticacaoService.registra(form.value.email, form.value.senha)
      .then(data => {
         this.usuarioService.registraUsuario(usuario);
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Falha no registro',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

}
