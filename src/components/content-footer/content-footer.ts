import { Component, Input } from '@angular/core';
import { InnovationStatus } from '../../models/innovation';

@Component({
    selector: 'content-footer',
    templateUrl: './content-footer.html',
})

export class ContentFooterComponent {
    @Input() teamName: string ='';
    @Input() status: InnovationStatus = 'prototype';
}