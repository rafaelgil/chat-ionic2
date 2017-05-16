import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-historico-detalhe',
  templateUrl: 'historico-detalhes.html',
})
export class HistoricoDetalhesPage {

  private item: any;
  private mensagens: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    
    this.item = this.navParams.get('item');
    
    this.mensagens = this.item.mensagens;
  }

}
