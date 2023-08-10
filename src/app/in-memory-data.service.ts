import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Hero} from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  private newVar = [
    {id: 12, name: 'Dr. Nice', dateOfBirth: new Date("2019-01-16"), description: "I'm Dr.Nice"},
    {id: 13, name: 'Bombasto', dateOfBirth: new Date("2019-01-16"), description: "I'm Bombasto"},
    {id: 14, name: 'Celeritas', dateOfBirth: new Date("2019-01-16"), description: "I'm Celeritas"},
    {id: 15, name: 'Magneta', dateOfBirth: new Date("2019-01-16"), description: "I'm Magneta"},
    {id: 16, name: 'RubberMan', dateOfBirth: new Date("2019-01-16"), description: "I'm RubberMan"},
    {id: 17, name: 'Dynama', dateOfBirth: new Date("2019-01-16"), description: "I'm Dynama"},
    {id: 18, name: 'Dr. IQ', dateOfBirth: new Date("2019-01-16"), description: "I'm Dr. IQ"},
    {id: 19, name: 'Magma', dateOfBirth: new Date("2019-01-16"), description: "I'm Magma"},
    {id: 20, name: 'Tornado', dateOfBirth: new Date("2019-01-16"), description: "I'm Tornado"}
  ];

  createDb() {
    const heroes = this.newVar;
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes?.map(hero => hero.id)) + 1 : 11;
  }
}
