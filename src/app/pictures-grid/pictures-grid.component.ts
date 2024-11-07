import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';

interface Picture {
  id: number;
  title: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'app-pictures-grid',
  standalone: true,
  imports: [HttpClientModule, CommonModule,LazyLoadImageModule],
  templateUrl: './pictures-grid.component.html',
  styleUrls: ['./pictures-grid.component.css']
})
export class PicturesGridComponent implements OnInit {

  apisUrl: string = 'https://jsonplaceholder.typicode.com/photos';
  pictures: Picture[] = [];
  loading: boolean = true;
  
  private http = inject(HttpClient);
  constructor(private router: Router) { }
  
  ngOnInit(): void {
    // Fetch the first 20 pictures and assign to the pictures array
    this.http.get<Picture[]>(this.apisUrl).pipe(
      map(pictures => pictures.slice(0, 20)),
      catchError(error => {
        console.error('Failed to fetch pictures:', error);
        return of([]);
      })
    ).subscribe(data => {
      this.pictures = data;
      this.loading = false;
    });
  }

  getSrcSet(url: string): string {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?w=300 300w, ${baseUrl}?w=600 600w, ${baseUrl}?w=1200 1200w`;
  }

  navigate(id:number){
    this.router.navigate([`/picture/${id}`])
  }

  handleImageError(event: any) {
    event.target.src = '/assets/placeholder.gif'; 
  }
}
