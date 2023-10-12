import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostSchema } from '@ts-rest-ng/api-contract';
import { lastValueFrom } from 'rxjs';
import { z } from 'zod';
import { ApiService } from './api.service';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, JsonPipe],
  selector: 'ts-rest-ng-root',
  template: `
    <h1>It Works</h1>

    {{ post | json }}
  `,
})
export class AppComponent implements OnInit {
  private readonly apiService = inject(ApiService);

  post?: z.infer<typeof PostSchema> | null;

  ngOnInit() {
    this.createPost('1');
  }

  async createPost(id: string) {
    await lastValueFrom(
      this.apiService.posts.createPost({
        body: {
          body: 'Hello World! ' + id,
          id,
          title: 'Hello World' + id,
        },
      })
    );

    const post = await lastValueFrom(
      this.apiService.posts.getPost({
        params: {
          id: '1',
        },
      })
    );

    if (post.status === 200) {
      this.post = post.body;
    }
  }
}
