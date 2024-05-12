import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root'
})
export class userService {
   constructor(private httpClient: HttpClient) {
   }

   getAllUsers(pageNum: number) {
      return this.httpClient.get(environment.apiUrl + `?page=${pageNum}`)
   }

   getUserDetails(id: number) {
      return this.httpClient.get(environment.apiUrl + `/${id}`)
   }

   getUsers(): any[] {
      const cachedUsers = localStorage.getItem('users');
      return cachedUsers ? JSON.parse(cachedUsers) : [];
   }

   setUsers(users: any[]): void {
      localStorage.setItem('users', JSON.stringify(users));
   }
}