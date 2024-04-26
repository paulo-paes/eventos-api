export class LoginInfo {
  constructor(
    private id: string,
    private idUsuario: string,
    private login: string,
    private senha: string,
    private salt: string,
    private dataAtualizacao: Date
  ) {}
}