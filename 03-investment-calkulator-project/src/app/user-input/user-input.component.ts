import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentInput } from '../investment-input.model';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {

  // @Output() calculate = new EventEmitter<InvestmentInput>(); 

  private investmentService = inject(InvestmentService);

  enteredInitialInvestment = '0';
  enteredAnnualInvesment = '0';
  enteredExpectedReturn = '5';
  enteredDuration = '10';

  onSubmit(){
    this.investmentService.calculateInvestmentResults(
      {
        initialInvestment: +this.enteredInitialInvestment,
        duration: +this.enteredDuration,
        expectedReturn: +this.enteredExpectedReturn,
        annualInvestment: +this.enteredAnnualInvesment,
      }
    );
    
  this.enteredInitialInvestment = '0';
  this.enteredAnnualInvesment = '0';
  this.enteredExpectedReturn = '5';
  this.enteredDuration = '10';
}
 
}
