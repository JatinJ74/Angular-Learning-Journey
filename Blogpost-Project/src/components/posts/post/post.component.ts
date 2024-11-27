import { Component, inject, Input, input, OnInit, Output, output, signal, WritableSignal } from '@angular/core';
import { Post } from '../../../app/post.model';
import { PostService } from '../../../service/post.service';
import { EventEmitter } from 'stream';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit{

  // @Input({
  //   required: true
  // })
  // post!: Post;
  
  post = input.required<Post>();
  // @Output() onDeletePost:EventEmitter<any> = new EventEmitter();
  onDeletePost = output<Post>()


  ngOnInit(): void {
    
  }
  
  onDelete(){
    this.onDeletePost.emit(this.post());
  }
  
}
