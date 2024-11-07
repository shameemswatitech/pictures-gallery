import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
interface Picture {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'app-picture-detail',
  standalone: true,
  imports: [HttpClientModule, CommonModule,LazyLoadImageModule],
  templateUrl: './picture-detail.component.html',
  styleUrl: './picture-detail.component.css',
})
export class PictureDetailComponent {
  apisUrl: string = 'https://jsonplaceholder.typicode.com';
  selectedPicture: Picture | null = null;
  isModalOpen = false; 
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  constructor(private router: Router) { }

  
  picture$: Observable<Picture> = this.route.paramMap.pipe(
    switchMap((params) =>
      this.http.get<Picture>(`${this.apisUrl}/photos/${params.get('id')}`)
    )
  );

  openModal(picture: Picture): void {
    this.selectedPicture = picture;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedPicture = null;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  handleImageError(event: any) {
    event.target.src = '/assets/placeholder.gif'; 
  }

  getSrcSet(url: string): string {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?w=300 300w, ${baseUrl}?w=600 600w, ${baseUrl}?w=1200 1200w`;
  }

}
