import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../shared/interfaces/appointment';
import { AppointmentService } from '../shared/services/appointment.service';
import { ServicesService } from '../shared/services/service.service';
import { Service } from '../shared/interfaces/service';

@Component({
  selector: 'app-edit-appointment-dialog',
  templateUrl: './edit-appointment-dialog.component.html',
  styleUrls: ['./edit-appointment-dialog.component.scss'],
})
export class EditAppointmentDialogComponent implements OnInit {
  editAppointmentForm: FormGroup;
  services: Service[] = [];
  servicesSelected: string[] = [];

  @Input() appointmentToEdit: Appointment = {};

  constructor(
    public dialogRef: MatDialogRef<EditAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private serviceService: ServicesService,
    private appointmentService: AppointmentService
  ) {
    this.servicesSelected =
      this.data.appointmentToEdit.services?.map(
        (service: Service) => service.id!
      ) || [];
    this.editAppointmentForm = this.formBuilder.group({
      scheduledDate: [
        this.data.appointmentToEdit.scheduledDate,
        Validators.required,
      ],
      services: [this.servicesSelected, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadServices();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  loadServices() {
    this.serviceService.get().subscribe((services) => {
      this.services = services;
    });
  }

  onSaveClick(): void {
    if (this.editAppointmentForm.valid) {
      this.data.appointmentToEdit.client = null;
      this.data.appointmentToEdit.scheduledDate =
        this.editAppointmentForm.value.scheduledDate;
      const services: string[] = this.editAppointmentForm.value.services;

      this.data.appointmentToEdit.services = services.map<Service>(
        (serviceId: string) => ({
          id: serviceId,
        })
      );
      this.appointmentService.update(this.data.appointmentToEdit).subscribe({
        next: (result) => {
          if (!result) this.appointmentAlertError();
          else this.dialogRef.close(result);
        },
        error: () => this.appointmentAlertError(),
      });
    }
  }

  appointmentAlertError() {
    alert('Não foi possível editar o agendamento.');
  }
}
