import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TASK_STATUS_OPTIONS, TaskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [TaskStatusOptionsProvider]
})
export class TasksListComponent {

  constructor(private taskService:TasksService){}
  TaskStatusOptions = inject(TASK_STATUS_OPTIONS);

  selectedFilter = signal<string>('all');
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.taskService
        .allTasks()
        .filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.taskService
        .allTasks()
        .filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.taskService
        .allTasks()
        .filter((task) => task.status === 'DONE');
      default:
        return this.taskService.allTasks();
    }
  })

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}