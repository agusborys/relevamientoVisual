import { Component, OnInit, ErrorHandler } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../servicios/error-handler.service';
import { NavController } from '@ionic/angular';
import { SpinnerHandlerService } from 'src/app/servicios/spinner-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userSelect: string = "";
  email:string = "";
  password:string = "";
  splash = true;
  private spinner:any=null;
  constructor(private auth: AuthService, 
    public router : Router,
    private errorHandler : ErrorHandlerService,
    private navCtrl: NavController,
    private spinnerHand:SpinnerHandlerService) 
    { 
    }

  ngOnInit() {
  }

  public async Login()
  {
    if(this.ValidForm())
    {
       // Obtener Spiner
       this.spinner = await this.spinnerHand.GetAllPageSpinner('Entrando.');
       // Mostrar Spiner
       this.spinner.present();
      this.auth.SignIn(this.email, this.password).then(()=>{
        this.router.navigate(['/tabs']);
        this.email = "";
        this.password = "";
        this.userSelect = "";
      })
      .catch(err=>{
        this.spinner.dismiss();
        this.errorHandler.mostrarError(err,"Error al iniciar sesión");
      });
    }
    // this.auth.login(this.email, this.password).then( res=>{
    //   this.router.navigate(['/inicio']);
    // }).catch(err=>{
    //   this.errorHandler.mostrarError(err, "Error al iniciar sesión");
    // });
  }

  SeleccionUsuario()
  {
    switch (this.userSelect) {
      case "admin":
        this.email = "admin@admin.com";
        this.password = "111111";
        break;
      
      case "invitado": 
        this.email = "invitado@invitado.com";
        this.password = "222222";
        break;
      
      case "usuario": 
        this.email = "usuario@usuario.com";
        this.password= "333333";
        break;
      
      case "anonimo": 
        this.email = "anonimo@anonimo.com";
        this.password = "4444";
        break;
      
      case "tester" : 
        this.email = "tester@tester.com";
        this.password = "5555";
        break;
      
    }
  }
  private ValidForm() {
    let auxReturn: boolean = false;
    if (this.email && this.password) {
      auxReturn = true;
    } else {
      // Mostrar Toast con mensaje
      this.errorHandler.mostrarErrorSolo("Debe completar todos los campos");
    }
    return auxReturn;
  }
  
}
