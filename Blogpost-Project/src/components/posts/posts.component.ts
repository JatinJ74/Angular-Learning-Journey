import { Component, inject, OnInit } from '@angular/core';
import { PostComponent } from "./post/post.component";
import { Post } from '../../app/post.model';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit{


  private PostService = inject(PostService);
  posts: Post[] = [];
  

  ngOnInit(): void {
    this.PostService.getPosts().subscribe((retrievedData) => {
      this.posts = retrievedData;
    })
  }

  onDelete(post: Post) {
    this.PostService.deletePost(post.id).subscribe(() => {
      this.posts = this.posts.filter((p) => p.id !== post.id)
    });
    console.log(post.id)
  }   

  // deleteEvent(post: Post) {
  //   console.log(post.id)
  //   }
}
