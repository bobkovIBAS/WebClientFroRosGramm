import { Component, OnInit, NgModule, Input } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from "../_services/user.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']

}
)


export class ProfileComponent implements OnInit {
  currentUser: any;
  filePost: string = '';
  file: any;
  textForPost: any;


  constructor(private token: TokenStorageService,private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    const formData  = new FormData();
    formData.append("email",this.currentUser.email)
    this.userService.uploadingAvatar(formData).subscribe(
      (data)=>{
        this.file = "data:image/jpeg;base64,"+ data;
      }
    )
  

  }


  onFileChange(event: any)  {
    const files = event.target.files as FileList;
    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.file = _file;
      const formData  = new FormData();
      formData.append("photo",files[0]);
      formData.append("email",this.currentUser.email)
      this.userService.addPhotoOnAvatar(formData).subscribe();
    }
 }

 photoAddInPost(event:any){
  console.log("kek");
  const files = event.target.files as FileList;
  if (files.length > 0) {
    const _file = URL.createObjectURL(files[0]);
    this.filePost = _file;
    console.log(this.filePost);
    
  }

 }
   
  textAddInPost() {
    const input = document.getElementById('text') as HTMLInputElement | null;
    this.textForPost = input?.value;
    console.log(this.textForPost);
  }

  uploadPost(){
    const formData  = new FormData();
    formData.append("photo",this.filePost);
    formData.append("email", this.currentUser.email);
    formData.append("label", this.textForPost);
    this.userService.creatingPostInProfile(formData).subscribe();
}
 resetInput(){
  const input = document.getElementById('avatar-input-file') as HTMLInputElement;
  if(input){
input.value = "";
}
}



}
