import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: Observable<User>;

  constructor(
    private nav: NavController,
    private toast: ToastController,
    private auth: AngularFireAuth
  ) { 
    this.isLoggedIn = auth.authState;
  }

  login(user) {
    //Se passou na autenticação, direciona para home, do contrário, exibe o erro
    this.auth.signInWithEmailAndPassword(user.email, user.password).then(() => this.nav.navigateForward('home')).catch(() => this.showError());
  }

  //declarando como async podemos utilizar o await para fazer uma parada no sistema, uma vez que o tost retorna uma promise
  private async showError() {
    const ctrl = await this.toast.create({
      message: 'Dados de acesso incorretos',
      duration: 3000
    });

    ctrl.present();
  }

  createUser(user) {
    this.auth.createUserWithEmailAndPassword(user.email, user.password).then(credentials => console.log(credentials));
  }

  recoverPass(data) {
    this.auth.sendPasswordResetEmail(data.email).
    then(() => this.nav.navigateBack('auth')).
    catch(err => {
      console.log(err)
    });
  }

  logout() {
    this.auth.signOut().then(() => this.nav.navigateBack('auth'));
  }

}
