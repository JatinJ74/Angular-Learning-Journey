import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { NgIf } from '@angular/common';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent, NgIf],
})
export class AvailablePlacesComponent implements OnInit{

  places = signal<Place[]>([]);
  isFetching = false;
  error = '';
  private destroyRef = inject(DestroyRef);
  private placeService = inject(PlacesService);

  ngOnInit() {
   this.isFetching = true;
   const subscription = this.placeService.loadAvailablePlaces()
   .subscribe({
    next: (places) => {
      // console.log(response);
      console.log(places);
      this.places.set(places!);
    },

    error: (error) => {
      console.log(error);
      this.error = 'Failed to fetch places. Please try again later';
    },

    complete: () => {
      this.isFetching = false;
    }
   });

   this.destroyRef.onDestroy(() => {
    subscription.unsubscribe();
   })
  }

  onSelectPlace(selectedPlace: Place) {

    const subscription = this.placeService.addPlaceToUserPlaces(selectedPlace).subscribe({
      next: (resdata) => { console.log(resdata)
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
    }
}
