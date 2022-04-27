import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isCollapsed = true;
  usuarioLogado = {} as Usuario;


  constructor(private router: Router) {  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
       this.getUsuarioLogado();
      }
    })
  }

  showMenu(): boolean {
    return this.router.url !== '/user/login'
        && this.router.url !== '/user/registration';
  }

  public getUsuarioLogado(): void {
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  }

  public deslogarUsuario(): void {
    localStorage.removeItem('usuarioLogado');
  }

  public atualizarDados(): void {
    console.log("atualizou");
  }

}
