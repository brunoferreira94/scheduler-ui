import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from '../shared/interfaces/appointment';
import { Client } from '../shared/interfaces/client';
import { ClientService } from '../shared/services/client.service';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { AppointmentService } from '../shared/services/appointment.service';
import { Service } from '../shared/interfaces/service';
import { ServicesService as ServiceService } from '../shared/services/service.service';

@Component({
  selector: 'app-create-appointment-dialog',
  templateUrl: './create-appointment-dialog.component.html',
  styleUrls: ['./create-appointment-dialog.component.scss'],
})
export class CreateAppointmentDialogComponent implements OnInit {
  readonly formGroup: FormGroup;
  clients: Client[] = [];
  services: Service[] = [];
  newAppointment: Appointment = {};

  constructor(
    public dialogRef: MatDialogRef<CreateAppointmentDialogComponent>,
    private clientService: ClientService,
    private serviceService: ServiceService,
    private appointmentService: AppointmentService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = formBuilder.group({
      name: [null],
      email: [null],
      scheduledDate: [new Date(), Validators.required],
      client: [null, Validators.required],
      services: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadClients();
    this.loadServices();
  }

  loadClients() {
    this.clientService.get().subscribe((clients) => {
      this.clients = clients;
    });
  }

  loadServices() {
    this.serviceService.get().subscribe((services) => {
      this.services = services;
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.newAppointment.scheduledDate = this.formGroup.value['scheduledDate'];
    const services: string[] = this.formGroup.value['services'];

    this.newAppointment.services = services.map<Service>(
      (serviceId: string) => ({
        id: serviceId,
      })
    );

    this.newClient
      ? (this.newAppointment.client = {
          email: this.formGroup.value['email'],
          name: this.formGroup.value['name'],
        })
      : (this.newAppointment.clientId = this.formGroup.value['client']);

    this.appointmentService.create(this.newAppointment).subscribe({
      next: (result) => {
        if (!result) this.appointmentAlertError();
        else this.dialogRef.close(result);
      },
      error: () => this.appointmentAlertError(),
    });
  }

  appointmentAlertError() {
    alert(
      'Não foi possível criar o agendamento.\nCaso esteja cadastrando um novo usuário, verifique se o e-mail já não está cadastrado.'
    );
  }

  changeValidator() {
    if (!this.newClient) {
      this.formGroup.get('email')?.clearValidators();
      this.formGroup.get('name')?.clearValidators();
      return;
    }

    this.formGroup
      .get('email')
      ?.setValidators([Validators.required, Validators.email]);
    this.formGroup
      .get('name')
      ?.setValidators([Validators.required, Validators.minLength(3)]);
  }

  get newClient(): boolean {
    return this.formGroup?.value?.client === 'new';
  }
}
