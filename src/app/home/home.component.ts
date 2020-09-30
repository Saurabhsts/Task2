import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../app-services/post.service';
import { Post } from '../post.modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[];
  totalPosts = 0;
  deleteStatus: boolean;

  constructor(private $postService: PostService, private $router: Router) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  private getAllPosts() {
    this.$postService.getAllPosts().subscribe(data => {
      this.posts = data;
      this.totalPosts = data.length;
    });
  }

  addPost() {
    this.$router.navigate(['add-post']);
  }

  onEditPost(post: Post) {
    this.$postService.isEditable = post;
    this.$router.navigate(['add-post']);
  }

  onDeletePost(id: string) {
    this.$postService.deletePost(id).subscribe(data => {
      this.deleteStatus = true;
    });
  }

}
