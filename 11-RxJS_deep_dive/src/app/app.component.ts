import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, interval, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
count = 0;
clickCount = signal(0);
clickCount$ = toObservable(this.clickCount);
private destroyRef = inject(DestroyRef);
customObservable$ = new Observable((subscriber) => {
  const interval = setInterval(() => {
    if(this.count == 4){
      clearInterval(interval);
      subscriber.complete();
      return;
    }
    console.log("Emitting new value...");
    subscriber.next(this.count++)
  },1000)
});

  ngOnInit(): void{
    // const subscription = interval(1000).pipe(
    //   filter((val) => { return val % 2 !== 0 })).subscribe({
    //   next: (val) => console.log(val)
    // });
    this.customObservable$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log("Completed")
    });

    const subscription = this.clickCount$.subscribe(
      (val) => console.log(val)
    );

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
  });
  }

  onClick() {
    this.clickCount.update(
      (prev) => prev + 1
    )}
}
