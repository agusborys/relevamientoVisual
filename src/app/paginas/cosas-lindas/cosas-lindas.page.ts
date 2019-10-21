import { Component, OnInit } from '@angular/core';
import { Foto, FotosService } from 'src/app/servicios/fotos.service';
import { ErrorHandlerService } from 'src/app/servicios/error-handler.service';
import { NavController } from '@ionic/angular';
import { SpinnerHandlerService } from 'src/app/servicios/spinner-handler.service';

@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage implements OnInit {
  public arrayCosasLindas: Array<Foto> = null;
  public displayed = false;
  public yaVoto = false;
  private spinner = null;

  constructor(
    private photoHandler: FotosService,
    private errorHandler: ErrorHandlerService,
    private navCtrl: NavController,
    private spinnerHandler:SpinnerHandlerService
  ) {
    this.arrayCosasLindas = new Array<Foto>();
    this.displayed = false;
   }

  ngOnInit() {
    this.ObtenerLindasDeBase();
  }
  public Like(data: Foto) {
    // this.errorHandler.MostrarErrorSoloLower('Votar: Aun no hago nada');
    this.EditarFoto(data);
  }

  private async ObtenerLindasDeBase() {
    this.spinner = await this.spinnerHandler.GetAllPageSpinner('Cargando fotos...');
    this.spinner.present();

    this.photoHandler.ObtenerFotos().subscribe(async (fotos) => {
      //console.log(fotos);
      this.arrayCosasLindas = this.photoHandler.FiltrarFotos(fotos, 'linda');
      //console.log(this.arrayCosasLindas);
      this.OrderByDate();
      this.displayed = true;

      this.spinner.dismiss();
    });
  }

  private async EditarFoto(data: Foto) {
    // console.log(data);

    this.photoHandler.EditarFoto(data)
      .then(response => {
      }, error => {
        this.errorHandler.mostrarErrorSolo('Error al votar');
      });
  }

  private OrderByDate() {
    this.arrayCosasLindas= this.arrayCosasLindas.sort((a,b)=>{
      if(a.fecha<b.fecha)
      {return 1;}
      if(a.fecha > b.fecha)
      {return -1;}
      return 0;
    });
  }

}
