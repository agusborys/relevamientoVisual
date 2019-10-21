import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth : AngularFireAuth) { }

  login(email:string, pass:string)
  {
    return new Promise((resolve, rejected) =>{
      this.AFauth.auth.signInWithEmailAndPassword(email, pass).then(user =>{
            resolve(user)
          }).catch(err=> rejected(err));
    });
  }
  public SignIn(email:string, pass:string)
  {
    return this.AFauth.auth.signInWithEmailAndPassword(email, pass);
  }
  public LogOut() 
  {
    return this.AFauth.auth.signOut();
  }
}
