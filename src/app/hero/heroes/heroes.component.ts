import { Component, OnInit } from '@angular/core';

import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

import { Hero } from "../../hero";
import { HeroService } from "../../hero.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  animations: [
    trigger('heroes', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
          ]))]), { optional: true })
        ,
        query(':leave', stagger('300ms', [
          animate('.6s ease-out', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
          ]))]), { optional: true })
      ])
    ])
  ]
})

export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void{
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
  
  onSubmit() {
    console.log('1');
  }
  
  
  add(name: string): void {
    name = name.trim();
    
    if (name.length === 0) {return};
    this.heroService.addHero({ name } as Hero)
    .subscribe(
      hero => { this.heroes.push(hero);    
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero)
      .subscribe()
  }

}
