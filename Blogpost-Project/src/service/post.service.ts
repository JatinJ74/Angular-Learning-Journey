import { Injectable } from '@angular/core';
import { Post } from '../app/post.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = "https://json-server-d62l.onrender.com/posts";

  constructor(private http: HttpClient) { }

  // private posts:Post[] = [];

    getPosts(): Observable<Post[]>{
       return this.http.get<Post[]>(this.apiUrl);
    }

    deletePost(id:number): Observable<Post>{
      const url = `${this.apiUrl}${id}`;
      return this.http.delete<Post>(url);
   }

   getPost(id:number): Observable<Post>{
      const url = `${this.apiUrl}${id}`;
      return this.http.get<Post>(url);
   }

   addPost(post: any): Observable<Post>{
      return this.http.post<Post>(this.apiUrl, post);
   }

   editPost(post:Post): Observable<Post>{
      const url = `${this.apiUrl}${post.id}`;
      return this.http.put<Post>(url,post);
   }
}
