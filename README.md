# ts-rest-ng

## About

Create [ts-rest](https://ts-rest.com/) clients using Angular's HttpClient.

## Installation

`npm i ts-rest-ng`

## Usage

1. Create a [ts-rest](https://ts-rest.com/) contract as you normally would

```typescript
const c = initContract();
export const todoContract = c.router({
  getTodos: {
    method: 'GET',
    path: '/todos',
    responses: {
      200: z.array(z.string()),
    },
    summary: 'Get all todos',
  },
});
```

2. Create an injection token in your angular app

```typescript
export const TodoClient = new InjectionToken<inferNgClient<typeof todoContract>>('todo-client');
```

3. Add the client as a provider somewhere in your app

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    {
      provide: TodoClient,
      useFactory: () =>
        initNgClient(todoContract, {
          baseHeaders: {},
          baseUrl: 'http://localhost:3333',
        }),
    },
  ],
};
```

4. Start using the client

```typescript
@Component({
  template: `
    <ul>
      <li *ngFor="let todo of todos$ | async">
        {{ todo }}
      </li>
    </ul>
  `,
  imports: [CommonModule],
  standalone: true,
})
export class TodoComponent {
  private todoClient = inject(TodoClient);

  todos$ = this.todoClient.getTodos().pipe(map((res) => (res.status === 200 ? res.body : [])));
}
```
