import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { ApiService } from './api.service';
import { AsyncPipe, JsonPipe, NgForOf } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, JsonPipe, AsyncPipe, NgForOf],
  selector: 'ts-rest-ng-root',
  template: `
    <h1>My Blog</h1>

    <ng-container *ngFor="let post of posts$ | async">
      <section>
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
      </section>
    </ng-container>
  `,
})
export class AppComponent {
  private readonly apiService = inject(ApiService);

  posts$ = this.apiService.posts
    .getPosts()
    .pipe(map((res) => (res.status === 200 ? res.body : [])));
}
