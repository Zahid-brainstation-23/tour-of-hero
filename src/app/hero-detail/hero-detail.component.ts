import {Component, Input} from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../hero.service";
import {DatePipe, Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  hero ?: Hero;
  heroForm: FormGroup | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.getHero();
    this.initForm();
  }

  initForm(): void {
    this.heroForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => {
      this.hero = hero;

      const formattedDate = this.datePipe.transform(this.hero.dateOfBirth, 'yyyy-MM-dd');
      this.heroForm?.patchValue({
        id: this.hero.id,
        dateOfBirth:formattedDate,
        name: this.hero.name,
        description: this.hero.description
      })

    });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    const {id} = this.heroForm?.value;


    if (this.heroForm?.invalid) {
      return;
    }
    if (id) {
      this.heroService.updateHero({...this.heroForm?.value} as Hero)
        .subscribe(() => this.goBack());
    }
  }


}
