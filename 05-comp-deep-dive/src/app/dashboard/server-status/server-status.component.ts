import { Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('online');
  private intervalId?: ReturnType<typeof setInterval>;

  constructor() {}


  ngOnInit() {
    this.intervalId=setInterval( () => {
      const random = Math.random();

      if(random < 0.5){
        this.currentStatus.set('online');
      }else if(random < 0.9){
        this.currentStatus.set('offline');
      }else {
        this.currentStatus.set('unknown');
      }
    }, 5000)
  }

  ngOnDestroy() {
    clearTimeout(this.intervalId);
  }
}
