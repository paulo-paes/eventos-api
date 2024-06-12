import { User } from "../../user/model/user";

export class Event {
  constructor(
    public titulo: string,
    public descricao: string,
    public dataCriacao: Date,
    public dataAtualizacao: Date,
    public dataInicioEvento: Date,
    public dataFimEvento: Date,
    public usuarioCriacao: User,
    public usuarioAtualizacao: User,
    public id?: string,
  ) {}
}
