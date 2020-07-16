import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { WineService } from 'src/app/shared/services/wine.service';
import { IBlog } from 'src/app/shared/interfaces/blog.interface';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  page:string;
  arrBlog: Array<IBlog> = [];
  adminBlogs: Array<IBlog> = [];


  title = 'Hard Hitter@Cool';
  navIsFixed: boolean;


  constructor(private wineService: WineService,
    @Inject(DOCUMENT) private document: Document) {
    this.getAdminBlog();
  }

  ngOnInit() {
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) { this.navIsFixed = false; }
  }
  scrollToTop() {
    (function smoothscroll() {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop; if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }


  public getAdminBlog(): void {
    this.wineService.getBlogs().subscribe(
      data => {
        this.adminBlogs = data;
      },
      err => {
        console.log(err);
      }
    )
  }

}
