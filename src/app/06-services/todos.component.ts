import { Component } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  template: '',
})
export class TodosComponent {
  todos = [];
  message;

  constructor(private service: TodoService) {}

  ngOnInit() {
    this.service.getTodos().subscribe((t) => (this.todos = t));
  }

  add() {
    var newTodo = 'To do Today';
    this.service
      .add(newTodo)
      .subscribe({
        next: (t) => this.todos.push(t),
        error: (err) => (this.message = err),
      });
  }

  delete(id) {
    if (confirm('Are you sure?')) this.service.delete(id).subscribe();
  }
}
