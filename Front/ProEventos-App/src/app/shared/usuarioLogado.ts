import { Usuario } from "../models/Usuario";
import { UsuarioService } from "../services/usuario.service";

export class UsuarioLogado {

  private usuario: Usuario;

  private static instance: UsuarioLogado;

  private constructor(){ }

  public static getInstance(): UsuarioLogado {
    if (!UsuarioLogado.instance) {
      console.log("Criado nova instancia");
      UsuarioLogado.instance = new UsuarioLogado();
    }

    return UsuarioLogado.instance;
  }


  public getUsuarioLogado(): Usuario {

    console.log(this.usuario);
    return this.usuario;

  }

  public setUsuarioLogado(usuario: Usuario): void {

    this.usuario = usuario;

  }

}
