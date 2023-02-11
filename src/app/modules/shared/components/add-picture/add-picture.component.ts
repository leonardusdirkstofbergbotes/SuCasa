import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.component.html',
  styleUrls: ['./add-picture.component.scss']
})
export class AddPictureComponent {

  profilePictureFile: any = '';
  profilePicturePreviewUrl: string = '';
  @Output() fileChanged = new EventEmitter<File>;

  createPreviewUrl (event: any) {
    const file = event.target?.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.profilePicturePreviewUrl = reader.result as string;
    }
    reader.readAsDataURL(file);

    this.fileChanged.emit(file);
  }
}
