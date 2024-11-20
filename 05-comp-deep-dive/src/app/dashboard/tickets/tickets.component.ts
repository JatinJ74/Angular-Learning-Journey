import { Component } from '@angular/core';
import { NewTicketComponent } from "./new-ticket/new-ticket.component";
import { Ticket } from './ticket/ticket.model';
import { TicketComponent } from "./ticket/ticket.component";

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {

  tickets: Ticket[] = [];

  onAdd($event: { title: string; text: string; }) {
    const ticket: Ticket = {
      title: $event.title,
      request: $event.text,
      id: Math.random().toString(),
      status: 'open'
    }
    this.tickets.push(ticket);
  }
  
  onMarkAsComplete(id: string){
    this.tickets = this.tickets.map((ticket) => {
      if(ticket.id === id){
        return { ...ticket,status: "closed"};
      }
      return ticket;
    });
  }
  
}