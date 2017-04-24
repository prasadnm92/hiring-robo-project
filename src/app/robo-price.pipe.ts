import { Pipe, PipeTransform } from '@angular/core';
/*
 * Formats price with dollar($) symbol
 * and no cents with commas
 * Usage:
 *   price | roboPrice
 * Example:
 *   {{ 2275476 | roboPrice }}
 *   formats to: $2,275,476
 */
@Pipe({name: 'roboPrice'})
export class RoboPricePipe implements PipeTransform {
  transform(price: string): string {
    price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "$"+price;
  }
}
