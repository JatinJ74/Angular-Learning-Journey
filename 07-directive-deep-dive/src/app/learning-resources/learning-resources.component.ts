import { Component } from '@angular/core';
import { SafeLinkDirective } from './safe-link.directive';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-learning-resources',
  templateUrl: './learning-resources.component.html',
  styleUrl: './learning-resources.component.css',
  standalone: true,
  imports:[SafeLinkDirective,NgStyle]
})
export class LearningResourcesComponent {}
