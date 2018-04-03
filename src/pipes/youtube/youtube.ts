import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Pipe({
  name: 'youtube',
})
export class YoutubePipe implements PipeTransform {

  constructor(public domSanitizer: DomSanitizer) {}

  transform(value: string, ...args) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
