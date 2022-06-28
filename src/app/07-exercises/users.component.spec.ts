import { noop, of, throwError } from 'rxjs';
import { UserService } from './user.service';
import { UsersComponent } from './users.component';

describe('userComponent', () => {
  let userComponent: UsersComponent;
  let service: UserService;

  beforeEach(() => {
    service = new UserService(null);
    userComponent = new UsersComponent(service);
  });

  it('should set the users property to the list recieved from server', () => {
    const users = ['Sarah', 'Omar', 'Mariam', 'Yosuf'];
    spyOn(service, 'getUsers').and.returnValue(of(users));

    userComponent.ngOnInit();

    expect(userComponent.users).toBe(users);
  });

  it('should delete the user from the list if the user confirmed', () => {
    const users = ['Ahmed', 'Sarah', 'Omar', 'Mariam', 'Yosuf'];
    spyOn(service, 'getUsers').and.returnValue(of(users));

    userComponent.ngOnInit();

    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(service, 'deleteUser').and.returnValue(of(null));

    userComponent.deleteUser('Ahmed');

    expect(userComponent.users.includes('Ahmed')).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });

  it('should not delete the user from the list if the server returned an error', () => {
    const users = ['Ahmed', 'Sarah', 'Omar', 'Mariam', 'Yosuf'];
    let error;
    spyOn(service, 'getUsers').and.returnValue(of(users));

    userComponent.ngOnInit();

    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(service, 'deleteUser').and.returnValue(throwError(() => noop));
    spyOn(window, 'alert').and.callFake(() => {
      error = 'Could not delete the user.';
    })

    userComponent.deleteUser('Ahmed');

    expect(error).toBe('Could not delete the user.');
    expect(userComponent.users.includes('Ahmed')).toBeTruthy();
  });

  it('should not delete the user from the list if the user cancelled', () => {
    const users = ['Ahmed', 'Sarah', 'Omar', 'Mariam', 'Yosuf'];
    spyOn(service, 'getUsers').and.returnValue(of(users));

    userComponent.ngOnInit();

    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(service, 'deleteUser').and.returnValue(of(null));

    userComponent.deleteUser('Ahmed');

    expect(userComponent.users.includes('Ahmed')).toBeTruthy();
  });
});
