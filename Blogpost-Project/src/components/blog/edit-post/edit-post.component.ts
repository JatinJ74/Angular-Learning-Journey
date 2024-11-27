import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../service/post.service';
import { time } from 'console';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit{

  id!: number;
  title!: string;
  content!: string

  private router = inject(Router);
  private activated_route = inject(ActivatedRoute);
  private postService = inject(PostService);

  ngOnInit(): void {
    this.activated_route.params.subscribe(
      (parameters) => this.postService.getPost(parameters['id']).subscribe(
        (retrievedPost) => 
          { 
            this.id = retrievedPost.id,
            this.title = retrievedPost.title,
            this.content = retrievedPost.content
          }
      )
  );
  }

  onSubmit(){
    const updatedPost = {
      id: this.id,
      title: this.title,
      content: this.content
    }

    this.postService.editPost(updatedPost).subscribe( () =>
      this.router.navigate(['/blog'])
    );
  }
}
