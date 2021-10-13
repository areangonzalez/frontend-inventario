import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert, AlertType } from '../../core/model';
import { AlertService } from '../../core/service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
    @Input() id = 'default-alert';
    @Input() fade = true;

    alerts: Alert[] = [];
    alertSubscription: Subscription;
    routeSubscription: Subscription;
    mensaje: any;
    tipo: number;



    constructor(private router: Router, private alertService: AlertService) { }

    ngOnInit() {
        // subscribe to new alert notifications
        this.alertSubscription = this.alertService.getMessage()
            .subscribe((alert: Alert) => {

              console.log(alert);
                // clear alerts when an empty alert is received
                if (!alert) {
                  this.mensaje = false;
                    return;
                }else{
                  this.mensaje = alert.mensaje;
                  this.tipo = alert.tipo;
                }
           });

        // clear alerts on location change
        this.routeSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.alertService.clearMessage();
            }
        });
    }

    ngOnDestroy() {
        // unsubscribe to avoid memory leaks
        this.alertSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }

    removeAlert() {
      this.alertService.clearMessage();
    }

    cssClass(tipo) {
        const classes = ['alert', 'alert-dismissable'];

        const alertTypeClass = {
            [AlertType.Exitoso]: 'alert alert-success',
            [AlertType.Cancelado]: 'alert alert-danger',
            [AlertType.Confirmar]: 'alert alert-success',
            [AlertType.Info]: 'alert alert-info',
            [AlertType.Warning]: 'alert alert-warning'
        }

        classes.push(alertTypeClass[tipo]);

        return classes.join(' ');
    }
}
