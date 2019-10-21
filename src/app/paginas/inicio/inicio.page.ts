import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ErrorHandlerService } from 'src/app/servicios/error-handler.service';
import { FotosService } from 'src/app/servicios/fotos.service';
import { SpinnerHandlerService } from 'src/app/servicios/spinner-handler.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { timer } from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public image: string = null;
  private spinner:any=null;
  constructor(private navCtrl: NavController,
    public errorHand: ErrorHandlerService,
    private camera: Camera,
    private fotoService: FotosService,
    private spinnerHand:SpinnerHandlerService,
    private alertCtrl:AlertController,
    private authService:AuthService) { }

  ngOnInit() {
  }
  //cerrar sesión
  public async LogOut() {
    const alert = await this.alertCtrl.create({
      cssClass: 'avisoAlert',
      header:'¿Desea cerrar sesión?',
      buttons:[{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Confirm Cancel');
        }
      },
    {
      text:'Ok',
      handler: async () => {
        this.spinner = await this.spinnerHand.GetAllPageSpinner('Cerrando sesión.');
        this.spinner.present();

        timer(2000).subscribe(()=>{
          this.authService.LogOut().then(() => {
          this.navCtrl.navigateRoot('login', { replaceUrl: true });
          }).catch(error => {
            this.errorHand.mostrarError(error);
          }).finally(() => {
            //timer(2000).subscribe(()=>this.spinner.dismiss());
            
          });
        });
      }
    }]
    });
    await alert.present(); 
  }

  public async cosasLindasClick() {
    this.ObtenerFoto('linda');
    this.navCtrl.navigateForward('tabs/tabs/cosas-lindas');
  }
  public hacerClick()
  {
    console.log("Click cosas lindas");
  }

  public cosasFeasClick() {
    console.log("Click cosas feas");
    this.navCtrl.navigateForward('tabs/tabs/cosas-feas');
    this.ObtenerFoto('fea');
  }
  public async ObtenerFoto(tipo: string) {
    this.spinner = await this.spinnerHand.GetAllPageSpinner('Procesando...');
    this.spinner.present();

    const camOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true,
      correctOrientation: true,
    };

    this.camera.getPicture(camOptions).then(async (pictureAux) => {
      // Send the picture to Firebase Storage
      this.fotoService.UploadToFirebase(pictureAux, tipo);
      this.spinner.dismiss();
    }, error => {
      // console.log(error);
      if (error === 'No Image Selected') {
        this.errorHand.mostrarErrorSolo('Cancelado.');
      } else {
        this.errorHand.mostrarErrorSolo('Error al tomar la foto ' + error);
      }
      // console.log(error);
      this.spinner.dismiss();
    }).catch(err => {
      // console.log(err);
      this.spinner.dismiss();
    });
  }
}
