import { Base } from './base';
import { Client } from './client';
import { Service } from './service';

export interface Appointment extends Base {
  scheduledDate?: Date;
  clientId?: string;
  client?: Client;
  services?: Service[];
}
