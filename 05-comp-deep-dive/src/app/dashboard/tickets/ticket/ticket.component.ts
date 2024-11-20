import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Ticket } from './ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {

  @Input({required:true}) data!: Ticket;

  detailsVisible = true;
  @Output() close = new EventEmitter();

  onToggleDetails(){
    this.detailsVisible = !this.detailsVisible;
  }

  // detailsVisible = signal(true);

  // onToggleDetails(){
  //   // this.detailsVisible.set(!this.detailsVisible);
  //   this.detailsVisible.update((wasVisible) => !wasVisible);
  // }

  onClose(){
    this.close.emit();
  }
}
