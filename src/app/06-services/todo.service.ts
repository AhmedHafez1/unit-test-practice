import { HttpClient, HttpClientModule } from '@angular/common/http';

export class TodoService {
  constructor(private http: HttpClient) {}

  add(todo) {
    return this.http.post('...', todo);
  }

  getTodos() {
    return this.http.get<string[]>('...');
  }

  delete(id) {
    return this.http.delete('...');
  }
}
