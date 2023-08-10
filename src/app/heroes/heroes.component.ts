import {Component} from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../hero.service";
import {MessageService} from "../message.service";
import {FormBuilder, Validators} from "@angular/forms";


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent {

  heroes: Hero[] = [];


  heroForm = this.fb.group({
    name: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(private heroService: HeroService, private fb: FormBuilder) {
  }


  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSubmit(): void {

    var name = this.heroForm.value.name?.trim();
    var dateOfBirth: Date = <Date><any>this.heroForm.value.dateOfBirth;
    var description = this.heroForm.value.description?.trim();
    if (!name || !dateOfBirth || !description) {
      return;
    }
    this.heroService.addHero({ name, dateOfBirth, description} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }


}
