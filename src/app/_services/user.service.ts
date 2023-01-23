import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { profilePost } from './profilePost';

const API_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'profile', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  addPhotoOnAvatar(formData: FormData): Observable<any> {
    console.log(formData.get("photo"))
    return this.http.post("http://localhost:8080/avatar/new-avatar",formData);
  }
  uploadingAvatar(formData: FormData): Observable<any> {
    return this.http.post("http://localhost:8080/avatar/upload-avatar",formData ,{ responseType: 'text' })
  }
  uploadingPostInProfile(formData: FormData): Observable<profilePost[]> {
    return this.http.post<profilePost[]>("http://localhost:8080/post/upload-profilePost",formData)
  }
  creatingPostInProfile(formData: FormData): Observable<any> {
    return this.http.post("http://localhost:8080/post/new-post",formData ,{ responseType: 'text' })
  }

  searchingUsers(formData: FormData): Observable<any> {
    return this.http.post("http://localhost:8080/subscriber/find-users",formData)
  }

}
