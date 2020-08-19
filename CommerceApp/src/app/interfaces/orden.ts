export class Orden {
  constructor(
    public id: number,

    public id_pedido: string,
    public id_extra: string,
    public id_combo: string,
    public precio: string,
    public cantidad: string,
    public nombre: string,
    public detalle: string,
    public updated_at: string,
    public created_at: string,
    public id_comercio: string,
    public descripcion: string,
    public foto: string,
    public promocion: string
  ) {}
}
