import { Component, Inject, OnInit } from '@angular/core';
import { filter, map, mergeMap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private title: Title,
    private meta: Meta,
    private activeRoute: ActivatedRoute,
    @Inject(DOCUMENT) private dom,
  ) {
    this.title.setTitle('');
    this.meta.updateTag({
      name: 'keywords',
      content: ''
    });
    this.meta.updateTag({
      name: 'description',
      content: ''
    });
    this.setupSEO();
  }
  
  ngOnInit(): void {
  }

  changeCanonical({ url }) {
    let link: HTMLLinkElement = [].slice.call(this.dom.getElementsByTagName('link')).find((link) => link.getAttribute('rel') === 'canonical');

    if (!link) {
      link = this.dom.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.dom.head.appendChild(link);
    }
    link.setAttribute('href', 'http://www.ibiz.name' + url);
  }

  async changeMeta ({ metaData }) {

    await sleep(500);

    const cloneData = {
      title: '111',
      keywords: '',
      description: '', 
      ...metaData,
    }
    const { title, keywords, description } = cloneData;
    this.title.setTitle(title);
    this.meta.updateTag({
      name: 'keywords',
      content: keywords
    });
    this.meta.updateTag({
      name: 'description',
      content: description
    });
  }

  private setupSEO() {
    const routerAjaxSrc = this.activeRoute.url

    routerAjaxSrc.pipe(
      map(( url ) => ({
        url,
        metaData: {
          title: url,
        }
      }))
    ).subscribe((data) => {
      this.changeCanonical(data);
      this.changeMeta({metaData:{
        title: '추천 테마 여행지',
        keywords: '추천 테마 여행지 인천 로마 세부 부다페스트 시드니',
        description: '즐거운 추천 테마 여행지',
      }});
    });
  }
}
