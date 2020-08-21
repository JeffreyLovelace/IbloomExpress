export class Comercio {
  constructor(
    public id: number,

    public correo: number,
    public telefono: string,
    public nombre: string,
    public id_tipoComercio: string,
    public fotoLogo: string,
    public fotoBaner: string,
    public envio: string,
    public direccion: string,
    public referencia: string,
    public precioMinimo: string,
    public longitud: number,
    public latitud: number
  ) {}
}
