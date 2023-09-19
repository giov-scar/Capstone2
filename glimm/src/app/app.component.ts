import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'glimm';
  // constructor(
  //   private fireStorage: AngularFireStorage){}

    // async onFileChange(event: any){
    //     const file = event.target.files[0]
    //     if(file){
    //       const path = `yt/${file.name}`
    //       const uploadTask = await this.fireStorage.upload(path,file)
    //       const url = uploadTask.ref.getDownloadURL()
    //       console.log(url);

    //     }
    // }
}
