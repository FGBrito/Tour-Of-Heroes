import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { SIGTERM } from 'constants';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  
  constructor(
    private heroService: HeroService
  ) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // espera cerca de 300ms apos o pressionamento de cada tecla
      debounceTime(300),
      //ignorar novo termo se igual ao termo anterior
      distinctUntilChanged(),
      //  muda para a nova pesquisa cada vez que o termo mudar
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

}
