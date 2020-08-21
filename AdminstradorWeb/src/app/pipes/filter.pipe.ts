import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pedido'
})
export class FilterPipe implements PipeTransform {

  transform(pedidos: any[], filtro: any, columna: any="selected"): any[] {
    if (!filtro) return pedidos;
    return pedidos.filter(pedidos => (pedidos[columna]).includes(filtro));
  }
}
