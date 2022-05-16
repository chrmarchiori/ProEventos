import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = 'https://localhost:5001/api/usuario';

  constructor(private http: HttpClient) { }

  public getUsuarioById(id: number): Observable<Usuario> {
    return this.http
      .get<Usuario>(`${this.baseUrl}/${id}`)
      .pipe(take(1));
  }

  // public getUsuarioByEmailSenha(hashcode: String){
  //   return this.http
  //     .get<Usuario>(`${this.baseUrl}/login/${hashcode}`)
  //     .pipe(take(1));
  // }

  public getUsuarioByEmailSenha(usuario: Usuario){
    return this.http
      .post<Usuario>(`${this.baseUrl}/login/`, usuario)
      .pipe(take(1));
  }

  public post(usuario: Usuario): Observable<Usuario> {
    return this.http
      .post<Usuario>(this.baseUrl, usuario)
      .pipe(take(1));
  }

  public put(usuario: Usuario): Observable<Usuario> {
    return this.http
      .put<Usuario>(`${this.baseUrl}/${usuario.id}`, usuario)
      .pipe(take(1));
  }

  public deleteUsuario(id: number): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/${id}`)
      .pipe(take(1));
  }

}
