export class Pedido {
  constructor(
    public id: number,
    public latitud: number,
    public longitud: string,
    public id_cliente: string,
    public id_conductor: string,
    public total: string,
    public id_estado: string
  ) {}
}
