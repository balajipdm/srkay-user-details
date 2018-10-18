import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "./user.model";

@Injectable()
export class UserService {
  
  constructor(private http: HttpClient) { }
  
  baseUrl: string = 'http://localhost:4000/api/users';

  getUsers() {
    return this.http.get<Array<string>>(this.baseUrl);
  }

  saveUser(user: User, userName = null) {
    if(userName) {
      return this.updateUser(user);
    } else {
      return this.createUser(user);
    }
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  getUser(userName: string) {
    return this.http.get<User>(`${this.baseUrl}/${userName}`);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + '/' + user.userName, user);
  }

  deleteUser(userName: string) {
    return this.http.delete(this.baseUrl + '/' + userName);
  }
}
