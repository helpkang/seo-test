import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  from = '';
  to = '';

  fromStr = '인천';
  toStr = ''
  city: City;

  constructor(private activeRoute: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    // const {fromto} = this.activeRoute.snapshot.params;
    // const value = fromto.split(/\s*\-\s*/g);
    // console.log(`from: ${value[0]}, to: ${value[2]}`);

    this.activeRoute.url.subscribe((url) => {
      const { fromto } = this.activeRoute.snapshot.params;
      const value = fromto.split(/\s*\-\s*/g);
      this.from = value[0];
      this.to = value[2];
      this.changeValue(this.to);

      console.log(`from: ${this.from}, to: ${this.to}`);
    });
  }

  changeValue(to: string) {
    const city = citys[to];
    this.city = city;
  }

  changeUrl() {
    this.route.navigate(['/data', 'icn-to-nrt']);
  }

}

interface City {
  city: string,
  country: string,
  title: string,
  desc: string,
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
  },

  nrt: {
    city: '도쿄',
    country: '일본',
    title: '감각적이고 생동감 넘치는 메트로폴리탄, 도쿄',
    desc: '도쿄는 신/구의 매력이 넘치는 곳입니다. 아사쿠사, 츠키시마 등 전통을 만들어 온 동쪽 지역과 시부야, 롯폰기 등 항상 변화가 계속되는 서쪽 지역이 합쳐져 도쿄만의 매력을 표출하고 있습니다.',
  }

}

