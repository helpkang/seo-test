import { Component, Inject, OnInit } from '@angular/core';
import { filter, map, mergeMap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private dom,
  ) { }

  ngOnInit(): void {
  //   this.setupSEO();
  }

  // changeCanonical({ url }) {
  //   let link: HTMLLinkElement = [].slice.call(this.dom.getElementsByTagName('link')).find((link) => link.getAttribute('rel') === 'canonical');

  //   if (!link) {
  //     link = this.dom.createElement('link');
  //     link.setAttribute('rel', 'canonical');
  //     this.dom.head.appendChild(link);
  //   }
  //   link.setAttribute('href', 'http://www.ibiz.name' + url);
  // }

  // changeMeta ({ metaData }) {
  //   const cloneData = {
  //     title: '111',
  //     keywords: '',
  //     description: '', 
  //     ...metaData,
  //   }
  //   const { title, keywords, description } = cloneData;
  //   this.title.setTitle(title);
  //   this.meta.updateTag({
  //     name: 'keywords',
  //     content: keywords
  //   });
  //   this.meta.updateTag({
  //     name: 'description',
  //     content: description
  //   });
  // }

  // private setupSEO() {





  //   const routerAjaxSrc = this.router.events.pipe(
  //     filter((routerEvent) => routerEvent instanceof NavigationStart),
  //     // filter((routerEvent)=> true),//TODO 자체 SEO 처리 할 녀석들은 빼고
  //     map((routerEvent: NavigationStart) => routerEvent.url),
  //     // mergeMap(url =>
  //     //   this.i18nService.subject.pipe(
  //     //     map(lang => ({
  //     //       url,
  //     //       lang
  //     //     }))
  //     //   )
  //     // ),
  //     // //TODO: server api 연동 필요 하고 언어 변경 처리 필요
  //     // mergeMap(v => cache(this.http, `/api/et/uiCommon/c/seoInfo/${v.lang}`)
  //     //   .pipe(
  //     //     map(data => ({
  //     //       ...v,
  //     //       data
  //     //     })),
  //     //   ))
  //   )

  //   routerAjaxSrc.pipe(
  //     map(( url ) => ({
  //       url,
  //       metaData: {
  //         title: url,
  //       }
  //     }))
  //   ).subscribe((data) => {
  //     this.changeCanonical(data);
  //     this.changeMeta(data);
  //   });
  // }
}


