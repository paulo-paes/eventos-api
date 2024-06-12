export class Order {
  constructor(
    public idUsuario: string,
    public idEvento: string,
    public quantidade: number,
    public valorTotal: string,
    public dataPedido?: Date,
    public statusPedido?: string,
  ) {}
}