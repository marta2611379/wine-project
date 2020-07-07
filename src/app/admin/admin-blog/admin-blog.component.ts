import { Component, OnInit } from '@angular/core';
import { IBlog } from 'src/app/shared/interfaces/blog.interface';
import { WineService } from 'src/app/shared/services/wine.service';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.css']
})
export class AdminBlogComponent implements OnInit {
  adminBlogs: Array<IBlog> = [];
  idBlog: string;
  image: string = '';
  name: string = '';
  text: string = '';
  date: string;

  nameEdit: string;
  textEdit: string;

  disabledAdd: boolean = true;
  disabledSave: boolean = true;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  urlImage: string;

  productImage: string;

  constructor(
    private wineService: WineService,
    private prStorage: AngularFireStorage,
    private firestore: AngularFirestore) {
    this.getAdminBlog();
  }

  ngOnInit() {
  }

  public disabledStatusAdd(): boolean {
    if ((this.productImage == '' || undefined) || (this.name == '' || undefined) || (this.text == '' || undefined)) {
      this.disabledAdd = true;
    } else {
      this.disabledAdd = false;
    }
    return this.disabledAdd;
  }

  public disabledStatusSave(): boolean {
    if ((this.nameEdit == '' || undefined) || (this.textEdit == '' || undefined)) {
      this.disabledSave = true;
    } else {
      this.disabledSave = false;
    }
    return this.disabledSave;
  }

  public upload(event): void {
    const id = Math.random().toString(36).substring(2)
    this.ref = this.prStorage.ref(`blogs/${id}`)
    this.task = this.ref.put(event.target.files[0])
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL()
        this.downloadURL.subscribe(url => {
          this.urlImage = url;
          console.log(this.urlImage);
          return this.productImage = url;
        })
      })
    ).subscribe();
  }

  refresh(): void {
    this.name = '';
    this.text = '';
    this.image = '';  
  }

  public getAdminBlog(): void {
    this.wineService.getBlogs().subscribe(blogs => (this.adminBlogs = blogs));
  }

  public addBlog(): void {
    this.firestore.collection('blogs').add({
      name: this.name,
      text: this.text,
      image: this.urlImage
    }).then(function () {
      console.log("Document successfully add!");
    }).catch(function (error) {
      console.error("Error adding document: ", error);
    });
    this.refresh();
  }

  public deleteBlog(blog): void {
    this.firestore.collection('blogs').doc(blog.id).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }



  public editBlog(blog): void {
    this.idBlog = blog.id;
    this.urlImage = blog.image;
    this.nameEdit = blog.name;
    this.textEdit = blog.text;

  }

  public saveEditWine(): void {
    this.firestore.collection('blogs').doc(this.idBlog).update({
      name: this.nameEdit,
      text: this.textEdit,
      image: this.urlImage
    }).then(function () {
      console.log("Document successfully edit!");
    }).catch(function (error) {
      console.error("Error editing document: ", error);
    });
  }

}
