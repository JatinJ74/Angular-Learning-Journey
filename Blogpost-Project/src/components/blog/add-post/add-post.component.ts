import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../service/post.service';
import { Post } from '../../../app/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {

  title?:string;
  content?: string;
  private postService = inject(PostService);
  private router = inject(Router);

  onSubmit() {
    const new_post = {
      title: this.title,
      content: this.content
    }
    
   this.postService.addPost(new_post).subscribe(
    () => this.router.navigate(['/blog'])
    );
    
    }

  

}
