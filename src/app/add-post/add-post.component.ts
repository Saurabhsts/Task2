import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../app-services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  postForm: FormGroup = new FormGroup({
    userId: new FormControl(null, Validators.required),
    id: new FormControl(null, Validators.required),
    title: new FormControl(null, Validators.required),
    body: new FormControl(null, Validators.required)
  });

  isEditable = this.$postService.isEditable;
  addedProduct: any;

  constructor(private $postService: PostService, private $router: Router) {
    if (this.isEditable) {
      this.postForm.patchValue({ ...this.isEditable });
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.isEditable) {
      this.updatePost();
    } else {
      this.addPost();
    }
  }

  addPost() {
    const postData = this.postForm.value;
    this.$postService.addPost(postData).subscribe(data => {
      this.addedProduct = JSON.stringify(data);
    });

  }

  updatePost() {
    const id = this.isEditable.id;
    const postData = this.postForm.value;
    this.$postService.updatePost(id, postData).subscribe(data => {
      this.addedProduct = JSON.stringify(data);
    });

  }

}
