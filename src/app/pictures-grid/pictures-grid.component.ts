import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'app-pictures-grid',
  standalone: true,
  imports: [],
  templateUrl: './pictures-grid.component.html',
  styleUrl: './pictures-grid.component.css'
})
export class PicturesGridComponent {
  apisUrl : string = 'https://jsonplaceholder.typicode.com'


  private http = inject(HttpClient);
  pictures$: Observable<Photo[]> = this.http.get<Photo[]>(`${this.apisUrl}/photos`)
    .pipe(catchError(error => {
      console.error('Failed to fetch pictures:', error);
      return of([]);
    }));
}
