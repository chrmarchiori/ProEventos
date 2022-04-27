import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/ValidatorField';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;
  usuario = {} as Usuario;

  get f(): any {
    return this.form.controls;
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.validation();
  }

  public validation(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha', 'confirmarSenha')
    };

    this.form = this.fb.group({
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['',
        [Validators.required, Validators.email]
      ],
      senha: ['',
        [Validators.required, Validators.minLength(6)]
      ],
      confirmarSenha: ['', Validators.required]
    }, formOptions);
  }

  public salvarAlteracao(): void {

    this.spinner.show();

    if (this.form.valid) {

      this.usuario = this.form.value;

      this.usuarioService.post(this.usuario).subscribe(
        () => {
          this.toastr.success("Usuário salvo com Sucesso!", "Sucesso!");
          this.router.navigate(['/user/login']);
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide;
          this.toastr.error("Erro ao salvar usuário", "Erro");
        },
        () => this.spinner.hide()
      );

    }

    this.spinner.hide();

  }

}
