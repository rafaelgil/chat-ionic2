import { Mensagem } from './../../models/mensagem';
import { HistoricoDetalhesPage } from './../historico-detalhes/historico-detalhes';
import { Chat } from './../../models/chat';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { DatePipe } from "@angular/common";


@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html',
})
export class HistoricoPage {

  lista: FirebaseListObservable<any>;
  relatorioDiario: Chat[];
  dados: any[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private af: AngularFire) {

    this.lista = af.database.list("chat");
    this.dados = [];

    this.relatorioDiario = [];
    var auxData: string;
    var chaveMensagem: string;
    var datePipe = new DatePipe("en-US");

    this.lista.forEach(element => {
      element.forEach(dados => {
        auxData = datePipe.transform(dados.data, 'dd/MM/yyyy');

        let chat: Chat;

        let mensagem: Mensagem = {
          usuario: dados.usuario,
          mensagem: dados.texto,
          data: dados.data
        }

        if (auxData != chaveMensagem) {
          let arrayMensagem: Mensagem[] = [];
          arrayMensagem.push(mensagem);

          chaveMensagem = auxData;

          chat = {
            data: chaveMensagem,
            mensagens: arrayMensagem
          }
          
          this.relatorioDiario.push(chat);

        } else {
          chat = this.relatorioDiario.slice(this.relatorioDiario.length-1, this.relatorioDiario.length)[0];
          chat.mensagens.push(mensagem);
        }

      });

      console.log(this.relatorioDiario);

    });

  }

  seleciona(item: Chat) {
    this.navCtrl.push(HistoricoDetalhesPage, { item: item });
  }

}
