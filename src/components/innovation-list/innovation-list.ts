import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Innovation } from '../../models/innovation';
import { Toast, ToastController, ToastOptions } from 'ionic-angular';

@Component({
  selector: 'innovation-list',
  templateUrl: 'innovation-list.html'
})
export class InnovationListComponent {

    @Input() innovations: Innovation[] = [];
    @Output() navigateToDetails = new EventEmitter();

    private toastOptions: ToastOptions;
    private toast: Toast;
    constructor(private toastController: ToastController) {}

    public goToDetailsView(innovation: Innovation) {
        this.navigateToDetails.emit(innovation);
    }

    openToast(innovation: Innovation) {
        if (this.toast) this.toast.dismissAll();

        this.toastOptions = {
            message: innovation.description,
            showCloseButton: true,
            position: 'bottom',
        };

        this.toast = this.toastController.create(this.toastOptions);
        this.toast.present();
    }
}
