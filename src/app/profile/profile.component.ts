import { Component, OnInit, NgModule, Input } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from "../_services/user.service";
import { profilePost } from '../_services/profilePost';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']

}
)


export class ProfileComponent implements OnInit {
  public saveLocal: profilePost[] = [];

  currentUser: any;
  filePost: any;
  file: any;
  textForPost: any;
  fileForCreatePost:any;
  photoInPost:any[] = [];
  profText:any[]=[];


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

    this.userService.uploadingPostInProfile(formData).subscribe(
      (data:profilePost[])=>{
        this.saveLocal = data;
        //console.log(this.saveLocal);
        for (let index = 0; index < data.length; index++) {
          this.photoInPost[index] = "data:image/jpeg;base64,"+ this.saveLocal[index].encodedPhoto;
          this.profText[index] = this.saveLocal[index].label;
        }
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
    console.log(this.saveLocal);
 }

 photoAddInPost(event:any){
  const files = event.target.files as FileList;
  if (files.length > 0) {
    const _file = URL.createObjectURL(files[0]);
    this.filePost = _file;
    this.fileForCreatePost = files[0];
  }

 }
   
  textAddInPost(event:any) {
    const input = document.getElementById('text') as HTMLInputElement | null;
    this.textForPost = input?.value;
  }

  uploadPost(event:any){
    const formData  = new FormData();
    formData.append("photo",this.fileForCreatePost );
    formData.append("email", this.currentUser.email);
    formData.append("label", this.textForPost);

    this.userService.creatingPostInProfile(formData).subscribe();
}

  addLikeOnPost(id:number){
    const formData  = new FormData();
    console.log(this.profText[id]);
    formData.append("label", this.profText[id]);
    this.userService.addLikeOnPost(formData).subscribe();
  }

 resetInput(){
  const input = document.getElementById('avatar-input-file') as HTMLInputElement;
  if(input){
input.value = "";
}
}



}