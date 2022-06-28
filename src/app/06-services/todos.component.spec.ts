import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { from, of, throwError } from 'rxjs';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  // Get Todos
  it('should set todo property with the items returned from the server', () => {
    let todos = ['first action', 'second action', 'third action'];

    spyOn(service, 'getTodos').and.callFake(() => {
      return of(todos);
    });

    component.ngOnInit();

    expect(component.todos).toBe(todos);
  });

  // Add Todo
  it('should call the servic add method to add todo to the server', () => {
    let spy = spyOn(service, 'add').and.returnValue(of(null));

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo returned from the server', () => {
    let newTodo = 'To do Today';

    spyOn(service, 'add').and.returnValue(of(newTodo));

    component.add();

    expect(component.todos.indexOf(newTodo)).toBeGreaterThan(-1);
  });

  it('should set the message property if the server returned an error', () => {
    let error = 'Error From Server';

    spyOn(service, 'add').and.returnValue(throwError(() => error));

    component.add();

    expect(component.message).toBe(error);
  });

  // Delete Todo
  it('should call service delete method if the user confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(service, 'delete').and.returnValue(of(null));

    component.delete(3);

    expect(spy).toHaveBeenCalledWith(3);
  });

  it('should not call service delete method if the user cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(service, 'delete').and.returnValue(of(null));

    component.delete(3);

    expect(spy).not.toHaveBeenCalled();
  });
});
