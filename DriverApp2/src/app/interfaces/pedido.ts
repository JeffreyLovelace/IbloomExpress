export class Pedido {
  constructor(
    public id: number,
    public latitud: number,
    public longitud: number,
    public id_cliente: string,
    public id_conductor: string,
    public total: string,
    public estadoEliminado: string,
    public id_estado: string,
    public nit: string,
    public razonSocial: string,
    public id_comercio: string,
    public pNombre: string,
    public telefono: string,
    public nombreCompercio: string,
    public telefonoComercio: string,
    public delivery: string
  ) {}
}
