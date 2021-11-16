import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { USERS } from '../database/mock-users';

import { UserService } from './user.service';

const mockRouter = {};

describe('UserService', () => {
  let service: UserService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {

  

    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({providers: [
      UserService, 
      {provide: Router, useValue: spy}
    ]
  });
    service = TestBed.inject(UserService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return users from observable',
  (done: DoneFn) => {
  service.getUsers().subscribe(value => {
    expect(value).toEqual(USERS);
    done();
  });
});


it('should return users by ID from observable',
(done: DoneFn) => {
service.getUserById(1).subscribe(value => {
  expect(value).toEqual(USERS[1]);
  done();
});
});


});
