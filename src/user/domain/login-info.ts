export class LoginInfo {
  constructor(
    public id?: string,
    public idUsuario?: string,
    public login?: string,
    public senha?: string,
    public salt?: string,
    public dataAtualizacao?: Date
  ) {}
}