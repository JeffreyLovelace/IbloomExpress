export class Orden {
  constructor(
    public id: number,

    public id_extra: number,
    public id_combo: string,
    public id_pedido: string,
    public precio: string,
    public nombre: string
  ) {}
}
