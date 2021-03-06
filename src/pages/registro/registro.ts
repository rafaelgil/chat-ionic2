import { EqualValidator } from './equal-validator';
import { UsuarioService } from './../../services/usuario.service';
import { Usuario } from './../../models/usuario';
import { AutenticacaoService } from './../../services/autenticacao.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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

  registroForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public autenticacaoService: AutenticacaoService, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, private usuarioService: UsuarioService,
    private formBuilder: FormBuilder) {

    let senhaFormControl:FormControl = new FormControl('', [ Validators.required, Validators.minLength(6) ]);
    let confirmSenhaFormControl:FormControl = new FormControl('', [ Validators.required, Validators.minLength(6), EqualValidator.sameValue(senhaFormControl) ]);

    this.registroForm = this.formBuilder.group({
      usuario: new FormControl('', [ Validators.required ]),
      email: new FormControl('', [ Validators.required, Validators.email ]),
      senha: senhaFormControl,
      confirmacaoSenha: confirmSenhaFormControl
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registro');
  }

  registra() {
    const loading = this.loadingCtrl.create({
      content: 'Fazendo o registro da aplicação'
    });
    loading.present();

    const usuario: Usuario = {usuario: this.registroForm.value.usuario, 
                              email: this.registroForm.value.email,
                              senha: this.registroForm.value.senha};

    this.autenticacaoService.registra(this.registroForm.value.email, this.registroForm.value.senha)
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
