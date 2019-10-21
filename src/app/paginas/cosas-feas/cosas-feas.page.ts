import { Component, OnInit } from '@angular/core';
import { Foto, FotosService } from 'src/app/servicios/fotos.service';
import { ErrorHandlerService } from 'src/app/servicios/error-handler.service';
import { NavController } from '@ionic/angular';
import { SpinnerHandlerService } from 'src/app/servicios/spinner-handler.service';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
})
export class CosasFeasPage implements OnInit {
  public arrayCosasFeas: Array<Foto> = null;
  public displayed = false;
  private spinner:any=null;
  constructor(
    private photoHandler: FotosService,
    private errorHandler: ErrorHandlerService,
    private navCtrl: NavController,
    private spinnerHandler:SpinnerHandlerService,
  ) {
    this.arrayCosasFeas = new Array<Foto>();
    this.displayed = false;
   }

  ngOnInit() {
    this.ObtenerFeasDeBase();
    console.log(this.arrayCosasFeas);
  }
  public Like(data: Foto) {
    // this.errorHandler.MostrarErrorSoloLower('Votar: Aun no hago nada');
    this.EditarFoto(data);
  }

  private async ObtenerFeasDeBase() {
    this.spinner = await this.spinnerHandler.GetAllPageSpinner('Cargando fotos...');
    this.spinner.present();

    this.photoHandler.ObtenerFotos().subscribe(async (fotos) => {
      this.arrayCosasFeas = this.photoHandler.FiltrarFotos(fotos, 'fea');
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
    this.arrayCosasFeas= this.arrayCosasFeas.sort((a,b)=>{
      if(a.fecha<b.fecha)
      {return 1;}
      if(a.fecha > b.fecha)
      {return -1;}
      return 0;
    });
  }

}
