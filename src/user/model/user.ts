import { LoginInfo } from "./login-info";

export class User {
  constructor(
    public nome: string,
    public email: string,
    public cpf: string,
    public dataCriacao?: Date,
    public dataAtualizacao?: Date,
    public loginInfo?: LoginInfo,
    public id?: string,
  ) {}
}