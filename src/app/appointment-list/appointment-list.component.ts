import { Component, OnInit } from '@angular/core';
import { Appointment } from '../shared/interfaces/appointment';
import { AppointmentService } from '../shared/services/appointment.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateAppointmentDialogComponent } from '../create-appointment-dialog/create-appointment-dialog.component';
import { EditAppointmentDialogComponent } from '../edit-appointment-dialog/edit-appointment-dialog.component';
import { BaseService } from '../shared/services/base.service';
import { Service } from '../shared/interfaces/service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss'],
})
export class AppointmentListComponent implements OnInit {
  appointments: Appointment[] = [];
  displayedColumns: string[] = [
    'clientName',
    'email',
    'services',
    'scheduledDate',
    'actions',
  ];

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService
      .get()
      .subscribe((appointments) => (this.appointments = appointments));
  }

  openEditDialog(appointmentToEdit: Appointment): void {
    const dialogRef = this.dialog.open(EditAppointmentDialogComponent, {
      width: '400px',
      data: { appointmentToEdit },
    });

    dialogRef.afterClosed().subscribe((updated: boolean) => {
      if (updated) this.loadAppointments();
    });
  }

  deleteAppointment(appointment: Appointment) {
    if (confirm('Tem certeza que deseja excluir este agendamento?')) {
      if (!appointment.id) return;

      this.appointmentService.delete(appointment.id).subscribe({
        complete: () => {
          this.loadAppointments();
        },
      });
    }
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateAppointmentDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((created: boolean) => {
      if (created) this.loadAppointments();
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return (
      this.baseService.formatDate(date) +
      ' ' +
      this.baseService.formatTime(date)
    );
  }

  getServicesNameJoined(services: Service[]): string {
    return services.map((service) => service.name).join(', ');
  }
}
