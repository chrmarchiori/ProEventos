import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkMargins } from 'ngx-bootstrap/positioning';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioLogado } from 'src/app/shared/usuarioLogado';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  salvando: boolean = false;
  usuarioLogado: UsuarioLogado;
  usuarioLogin: Usuario;

  get f(): any {
    return this.form.controls;
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {

  }

  public ngOnInit(): void {
    this.validation();
  }

  public efetuarLogin(): void {

    if (this.form.valid) {
      this.spinner.show();

      localStorage.removeItem('usuarioLogado');

      this.usuarioLogin = this.form.value;

      this.usuarioService
        .getUsuarioByEmailSenha(this.usuarioLogin).subscribe(
          (usuario: Usuario) => {
            this.toastr.success("Usuário logado com sucesso", "Sucesso!");
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            this.router.navigate(['/dashboard']);
            this.spinner.hide();
          },
          (error: any) => {
            console.error(error);
            this.spinner.hide;
            this.toastr.error("Email ou Senha inválidos", "Erro");
          },
          () => this.spinner.hide()
        );

      this.spinner.hide();
    } else {
      this.toastr.error("Preencha os campos.", "Erro");
    }

  }

  public validation(): void {
    this.form = this.fb.group({
      email: ['',
        [Validators.required, Validators.email]
      ],
      senha: ['', Validators.required]
    });
  }

}
