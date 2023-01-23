import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { subscriber } from '../_services/subscriber';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  textForSearching: any;
  people: any[] = [];
  public allUser: subscriber[] = [];


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // this.userService.getPublicContent().subscribe(
    //   data => {
    //     this.content = data;
    //   },
    //   err => {
    //     this.content = JSON.parse(err.error).message;
    //   }
    // );
  }

  searchSubscribers(event: any) {
    const input = document.getElementById('text') as HTMLInputElement | null;
    this.textForSearching = input?.value;
  }

  sendName(event: any) {
    const formData = new FormData();
    formData.append("firstname", this.textForSearching);
    this.userService.searchingUsers(formData).subscribe(
      (data) => {
        this.allUser = data;
      }
    );
  }

  sendDataUser(id: number) {
    const formData = new FormData();
    formData.append("email", this.allUser[id].email);
    this.userService.creatingPostInProfile(formData).subscribe();
    console.log(this.allUser[id].email);
  }

}
