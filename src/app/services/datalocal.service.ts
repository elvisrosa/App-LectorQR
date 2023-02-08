import { Injectable } from '@angular/core';
import { Registro } from '../models/registros.models';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
@Injectable({
  providedIn: 'root'
})
export class DatalocalService {

  guardados: Registro[] = [];

  constructor(private storage: Storage, 
    private nacCtrl: NavController,
    private inPBrowser: InAppBrowser,
    private file:File,
    private email:EmailComposer) {
    //Cragamos los registros
    this.storage.create();
    this.cargarStorage();
  }

  async cargarStorage() {
    this.guardados = (await this.storage.get('registros')) || [];
  }

  async guardarRegistro(formato: string, texto: string) {
    this.cargarStorage();
    const nuevoRegistro = new Registro(formato, texto);
    this.guardados.unshift(nuevoRegistro);
    console.log(this.guardados)
    this.storage.set('registros', this.guardados);
    this.abrirRegistro(nuevoRegistro);
  }

  abrirRegistro(registro: Registro) {
    this.nacCtrl.navigateForward('/tabs/tab2');

    switch (registro.tipo) {
      case 'http':
        //Abrir navegador web
        this.inPBrowser.create(registro.texto, '_system');
        break;

      case 'geo':
        //Abrir navegador web
        this.nacCtrl.navigateForward(`/tabs/tab2/mapa/${registro.texto}`)
        break;
    }
  }

  enviarCorreo(){
    //preparamos la data para enviar por medio de un archivo csv
    const arrTemp:any = [];
    const titulos = 'Tipo, Formato, Creado en, Texto\n';
    arrTemp.unshift(titulos);

    this.guardados.forEach(reg => {
      const linea = `${reg.tipo}, ${reg.formato}, ${reg.creado}, ${reg.texto.replace(',', ' ')}\n`;
      arrTemp.push(linea);
      this.creararchivoFisicoCsv(arrTemp.join(''));
    });
  }

  creararchivoFisicoCsv(text:string){
    this.file.checkFile(this.file.dataDirectory, 'registros.csv')
    .then(exis => {
      console.log(exis);
      return this.escribirArchivo(text);
    }).catch(err =>{
      return this.file.createFile(this.file.dataDirectory, 'registros.csv', false)
      .then(creado=>{
        this.escribirArchivo(text);
      }).catch(err2=>{
        console.log('error2 al crear el archivo');
      });
    })
  }

  async escribirArchivo(texto:string){
    await this.file.writeExistingFile(this.file.dataDirectory, 'registros.csv', texto);

    const archivo = `${this.file.dataDirectory}/registros.csv`;
    const email = {
      to:      'montoya103adrian@gmail.com',
      //cc:      'elvis.rosam@ug.edu.ec',
      //bcc:     ['john@doe.com', 'jane@doe.com'],
      attachments: [
        archivo
      ],
      subject: 'Backup de scans',
      body:    'Backups de scans hechos en la app de lectura de Scans',
      isHtml:true
  };

  this.email.open(email);



  }

}
