import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../post.modal';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  fakePostApi = 'https://jsonplaceholder.typicode.com/posts';
  isEditable: Post;
  constructor(private $http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.$http.get<Post[]>(this.fakePostApi);
  }

  addPost(postData: Post): Observable<Response> {
    return this.$http.post<Response>(this.fakePostApi, postData);
  }

  updatePost(id: string, postData: Post): Observable<Response> {
    return this.$http.put<Response>(`${this.fakePostApi}/${id}`, postData);
  }

  deletePost(id: string): Observable<Response> {
    return this.$http.delete<Response>(`${this.fakePostApi}/${id}`);
  }
}
