import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { HttpClient } from '@angular/common/http';
import { Place } from '../place.model';
import { map } from 'rxjs';
import { NgIf } from '@angular/common';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, NgIf, PlacesComponent],
})
export class UserPlacesComponent implements OnInit{

  // places:Place[] | undefined = undefined;
 
  error = '';
  isFetching = false;
  private destroyRef = inject(DestroyRef);
  private placeService = inject(PlacesService);
  places = this.placeService.loadedUserPlaces;

  ngOnInit() {
    this.isFetching = true;
    const subscription = this.placeService.loadUserPlaces()
    .subscribe({
      error: (error) => {
        console.error(error);
        this.error = "Failed to fetch Favourate Places. Please try again later."
      },

      complete: () => {
        this.isFetching = false;
      }
    });

    this.destroyRef.onDestroy( () => {
      subscription.unsubscribe();
    });
  }

  onRemovePlace(place: Place) {
    const subscription = this.placeService.removeUserPlace(place).subscribe();

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
    }
}
