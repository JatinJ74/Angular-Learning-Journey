import { Component, ElementRef, EventEmitter, output, Output, ViewChild } from '@angular/core';
import { ButtonComponent } from "../../../../shared/button/button.component";
import { ControlComponent } from "../../../../shared/control/control.component";
import { FormsModule } from '@angular/forms';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {

  @Output() add = new EventEmitter<{title: string, text: string}>();
  // add = output<{title:string, text:string}>();

  @ViewChild('form',{static:false}) form?: ElementRef<HTMLFormElement>;

  onSubmit(textInput: string, textareaInput: string){
    this.add.emit({title:textInput,text:textareaInput});

    this.form?.nativeElement.reset();
  }
}
