import { Component, OnInit, NgModule } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']

  
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  file: string = '';

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }


  
  onFileChange(event: any) {
    const files = event.target.files as FileList;

    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.file = _file;
      // отправка файла на сервер 
      this.resetInput(); 
}
  
 }
 resetInput(){
  const input = document.getElementById('avatar-input-file') as HTMLInputElement;
  if(input){
input.value = "";
}
}

}

