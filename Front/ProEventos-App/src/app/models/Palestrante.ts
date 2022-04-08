import { PalestranteEvento } from "./PalestranteEvento";
import { RedeSocial } from "./RedeSocial";

export interface Palestrante {
  id: number;
  nome: string;
  miniCurriculo: string;
  imagemURL: string;
  telefone: number;
  email: string;
  redesSociais: RedeSocial[];
  palestrantesEventos: PalestranteEvento[];
}
