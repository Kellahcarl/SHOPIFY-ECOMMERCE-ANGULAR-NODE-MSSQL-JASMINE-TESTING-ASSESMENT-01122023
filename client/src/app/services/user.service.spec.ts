import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UserService } from './user.service';
import {
  User,
  LoginUser,
  UpdateUser,
  ForgotUser,
} from '../types/userInterface';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', fakeAsync(() => {
    const mockUser: User = {
      user_name: 'diana',
      email: 'dianaaberi12@gmail.com',
      password: '@Santa2023',
    };

    let response: any;

    service.registerUser(mockUser).then((res) => {
      response = res;
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/register`);
    expect(req.request.method).toBe('POST');

    req.flush({ status: 'success' });

    tick();
    expect(response).toEqual({ status: 'success' });
  }));

  it('should handle errors during registration', fakeAsync(() => {
    const mockUser: User = {
      user_name: 'diana',
      email: 'dianaaberi12@gmail.com',
      password: '@Santa2023',
    };

    let errorResponse: any;

    service.registerUser(mockUser).catch((error) => {
      errorResponse = error;
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/register`);
    expect(req.request.method).toBe('POST');

    req.flush(null, { status: 500, statusText: 'Internal Server Error' });

    tick();

    expect(errorResponse).toBeDefined();
    expect(errorResponse.status).toBe(500);
  }));

  it('should login a user', fakeAsync(() => {
    const mockCredentials: LoginUser = {
      email: 'dianaaberi12@gmail.com',
      password: '@Santa2023',
    };

    let response: any;

    service.loginUser(mockCredentials).then((res) => {
      response = res;
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/login`);
    expect(req.request.method).toBe('POST');

    req.flush({ status: 'success' });

    tick();

    expect(response).toEqual({ status: 'success' });
  }));

  it('should update a user', fakeAsync(() => {
    const mockUpdateDetails: UpdateUser = {
      user_id: '28e61f6e-e838-41c7-a155-380a84d78871',
      user_name: 'caleb',
      email: 'baraka606@student.mmarau.ac.ke',
    };
    const mockToken = 'mockToken';

    let response: any;

    service.updateUser(mockUpdateDetails, mockToken).then((res) => {
      response = res;
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('PUT');

    req.flush({ status: 'success' });

    tick();

    expect(response).toEqual({ status: 'success' });
  }));

  it('should delete a user by ID', fakeAsync(() => {
    const mockUserId = 'mockUserId';
    const mockToken = 'mockToken';

    let response: any;

    service.deleteUserById(mockUserId, mockToken).then((res) => {
      response = res;
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${mockUserId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({ status: 'success' });

    tick();

    expect(response).toEqual({ status: 'success' });
  }));

  it('should get a user by ID', fakeAsync(() => {
    const mockUserId = 'mockUserId';
    const mockToken = 'mockToken';

    let response: any;

    service.getUserById(mockUserId, mockToken).then((res) => {
      response = res;
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${mockUserId}`);
    expect(req.request.method).toBe('GET');

    req.flush({
      status: 'success',
      user: {
        user_id: '0324762f-076c-4d5b-842f-ddf61faa3dd4',
        email: 'user_m89dmv@example.com',
        user_name: 'jane Doe',
      },
    });

    tick();

    expect(response).toEqual({
      status: 'success',
      user: {
        user_id: '0324762f-076c-4d5b-842f-ddf61faa3dd4',
        email: 'user_m89dmv@example.com',
        user_name: 'jane Doe',
      },
    });
  }));

  it('should check user details', fakeAsync(() => {
    const mockToken = 'mockToken';

    let response: any;

    service.checkUserDetails(mockToken).then((res) => {
      response = res;
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/check_user_details`);
    expect(req.request.method).toBe('GET');

    req.flush({
      status: 'success',
      userDetails: {
        info: {
          user_name: 'diana',
          email: 'dianaaberi12@gmail.com',
          user_id: '2f44dc9b-ab86-4a2b-9889-b3cd95ae380f',
          isAdmin: false,
          iat: 1701418232,
          exp: 1701504632,
        },
      },
    });

    tick();

    expect(response).toEqual({
      status: 'success',
      userDetails: {
        info: {
          user_name: 'diana',
          email: 'dianaaberi12@gmail.com',
          user_id: '2f44dc9b-ab86-4a2b-9889-b3cd95ae380f',
          isAdmin: false,
          iat: 1701418232,
          exp: 1701504632,
        },
      },
    });
  }));

  it('should reset a user password', fakeAsync(() => {
    const mockUserDetails: string = 'mockUserDetails';

    let response: any;

    service.resetPassword(mockUserDetails).then((res) => {
      response = res;
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/reset`);
    expect(req.request.method).toBe('POST');

    req.flush({ status: 'success' });

    tick();

    expect(response).toEqual({ status: 'success' });
  }));

  it('should initiate password reset for a user', fakeAsync(() => {
    const mockResetDetails: ForgotUser = {
      email: 'caleb.baraka@thejitu.com',
    };

    let response: any;

    service.forgotPassword(mockResetDetails).then((res) => {
      response = res;
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/forgot`);
    expect(req.request.method).toBe('POST');

    req.flush({ status: 'success' });

    tick();

    expect(response).toEqual({ status: 'success' });
  }));

  it('should get all users', fakeAsync(() => {
    const mockToken = 'mockToken';

    let response: any;

    service.getAllUsers(mockToken).then((res) => {
      response = res;
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('GET');

    req.flush({
      status: 'success',
      users: [
        {
          user_id: '0324762f-076c-4d5b-842f-ddf61faa3dd4',
          user_name: 'jane Doe',
          email: 'user_m89dmv@example.com',
        },
        {
          user_id: '151f79fd-12e7-4d47-a0d7-35029fd3c560',
          user_name: 'diana',
          email: 'dianaaberi9@gmail.com',
        },
        {
          user_id: '185448a1-7a07-4a0d-b4f9-a9761dc811ea',
          user_name: 'mercy',
          email: 'mercy.wambui@thejitu.com',
        },
        {
          user_id: '2f44dc9b-ab86-4a2b-9889-b3cd95ae380f',
          user_name: 'diana',
          email: 'dianaaberi12@gmail.com',
        },
      ],
    });

    tick();

    expect(response).toEqual({
      status: 'success',
      users: [
        {
          user_id: '0324762f-076c-4d5b-842f-ddf61faa3dd4',
          user_name: 'jane Doe',
          email: 'user_m89dmv@example.com',
        },
        {
          user_id: '151f79fd-12e7-4d47-a0d7-35029fd3c560',
          user_name: 'diana',
          email: 'dianaaberi9@gmail.com',
        },
        {
          user_id: '185448a1-7a07-4a0d-b4f9-a9761dc811ea',
          user_name: 'mercy',
          email: 'mercy.wambui@thejitu.com',
        },
        {
          user_id: '2f44dc9b-ab86-4a2b-9889-b3cd95ae380f',
          user_name: 'diana',
          email: 'dianaaberi12@gmail.com',
        },
      ],
    });
  }));
});
