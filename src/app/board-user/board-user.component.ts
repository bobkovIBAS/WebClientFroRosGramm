import { Component, OnInit } from '@angular/core';
import { subscriberPost } from '../_services/subscriberPost';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  public saveLocal: subscriberPost[] = [];
  photoInPost:any[] = [];
  currentUser: any;


  constructor(private userService: UserService,private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    const formData  = new FormData();
    formData.append("email",this.currentUser.email)
    console.log(this.currentUser.email);
    this.userService.getUserBoard(formData).subscribe(
      data => {
        this.saveLocal = data;
        console.log(this.saveLocal);
        for (let index = 0; index < data.length; index++) {
          this.photoInPost[index] = "data:image/jpeg;base64,"+ this.saveLocal[index].encodedPhoto;
          
        }
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  

}
