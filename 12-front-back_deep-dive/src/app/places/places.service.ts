import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchData('http://localhost:3000/places')
  }

  loadUserPlaces() {
    return this.fetchData('http://localhost:3000/user-places')
    .pipe(
      tap({
        next: (userPlaces) => this.userPlaces.set(userPlaces!),
      })
    )
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();
   

    if(!prevPlaces.some((p) => p.id === place.id)){
      this.userPlaces.set([...prevPlaces, place]);
    }

    return this.httpClient.put('http://localhost:3000/user-places',{
      placeId: place.id,
    }).pipe(
      catchError((error) => {
        this.userPlaces.set(prevPlaces);
        return throwError(() => {
          return new Error("Failed to store selected Place.")
        })
      })
    );
  }

  removeUserPlace(place: Place) {

    const prevPlaces = this.userPlaces();

    if(prevPlaces.some((p) => p.id == place.id)){
      this.userPlaces.set(prevPlaces.filter((p) => p.id !== place.id));
    }
    return this.httpClient.delete(`http://localhost:3000/user-places/${place.id}`).pipe(
      catchError((error) => {
        this.userPlaces.set(prevPlaces);
        return throwError(() => {
          return new Error("Failed to remove selected Place.")
        });
      }
    )
  )
 }



  fetchData(url: string){
   return this.httpClient.get<{places: Place[]}>(url,{
      observe: "response",
     }).pipe(
      map((response) => {
        return response.body?.places;
      })
     )
  }
}
