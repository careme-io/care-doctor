import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({ name: 'objNgFor',  pure: false })
export class objNgFor implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value)//.map(key => value[key]);
    }
}