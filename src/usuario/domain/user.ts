import { LoginInfo } from "./login-info";

export class User {
  constructor(
    private id: string,
    private nome: string,
    private email: string,
    private cpf: string,
    private dataCriacao: string,
    private dataAtualizacao: string,
    private loginInfo: LoginInfo
  ) {}
}