import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { filter, map, mergeMap, takeWhile, delay } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Component({
  selector: 'app-home',
  templateUrl: './data.component.html',
})
export class DataComponent implements OnInit, OnDestroy {
  alive = true;
  reset() {
    this.title.setTitle('');
    this.meta.updateTag({
      name: 'keywords',
      content: ''
    });
    this.meta.updateTag({
      name: 'description',
      content: ''
    });
  }

  from = '';
  to = '';

  fromStr =  '인천';

  city: City;

  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router,
    private activeRoute: ActivatedRoute,
    @Inject(DOCUMENT) private dom,
  ) { 


    this.activeRoute.url.pipe(
      map(v=>{
        this.reset();
        return v;
      }),
      delay(500),
      takeWhile(() => this.alive)
    )
    .subscribe(async (url) => {
      await this.metasubscribe(url);
    });


    this.router.events.pipe(
      map(v=>{
        this.reset();
        return v;
      }),
      delay(500),
      takeWhile(() => this.alive)
    ).subscribe(async (url)=>{
      await this.metasubscribe(url);
    })
  }
  ngOnDestroy(): void {
    this.alive = false;
  }

  private async metasubscribe(url) {
    this.reset();
    const { fromto } = this.activeRoute.snapshot.params;
    const value = fromto.split(/\s*\-\s*/g);
    this.from = value[0];
    this.to = value[2];
    this.changeValue(this.to);
    this.changeCanonical({ url });

    const { city, price } = this.city;
    this.changeMeta({
      metaData: {
        title: `${this.fromStr} 출발 ${city} 항공권 최저가 ${this.city.price}`,
        keywords: `${this.fromStr}, 출발, ${city}, 항공권, 최저가`,
        description: `${this.fromStr} 출발 ${city} 항공권 최저가 ${this.city.price}`,
      }
    });
  }

  ngOnInit() {
    // const {fromto} = this.activeRoute.snapshot.params;
    // const value = fromto.split(/\s*\-\s*/g);
    // console.log(`from: ${value[0]}, to: ${value[2]}`);

   
  }

  changeValue(to: string) {
    const city = citys[to];
    this.city = city;
  }

  changeUrl() {
    this.router.navigate(['/data', 'icn-to-nrt']);
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

  changeMeta ({ metaData }) {
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

}

interface City {
  city: string,
  country: string,
  title: string,
  desc: string,
  price: string,
}

interface CityValues {
  [key: string]: City;
}


const citys: CityValues = {

  lax: {
    city: '로스앤젤레스',
    country: '미국',
    title: '따사로운 햇살이 비치는 천사의 도시',
    desc: '일년 중 맑은 날이 329일로 환상적인 날씨를 자랑하는 로스앤젤레스. 으레 떠오르는 할리우드나 디즈니랜드 이 외에도 문화 즐길 거리가 풍족하다. 월트 디즈니 콘서트 홀과 야구팀 다저스 스타디움부터 아카데미 시상식이 열리는 돌비 극장까지 다운타운만 해도 볼거리가 넘친다. 가까운 해변에 들러보면 여유로운 현지의 삶과 축복받은 날씨를 직접 느껴보자. 미국의 남서쪽에 위치한 해안도시.',
    price: '892,200원',
  },

  nrt: {
    city: '도쿄',
    country: '일본',
    title: '감각적이고 생동감 넘치는 메트로폴리탄, 도쿄',
    desc: '도쿄는 신/구의 매력이 넘치는 곳입니다. 아사쿠사, 츠키시마 등 전통을 만들어 온 동쪽 지역과 시부야, 롯폰기 등 항상 변화가 계속되는 서쪽 지역이 합쳐져 도쿄만의 매력을 표출하고 있습니다.',
    price: '155,000원',
  }

}

