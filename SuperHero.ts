import { PowerStats } from './PowerStats'; // Classe SuperHero

export class SuperHero {
    id: number;
    name: string;
   
    slug: string;
    powerstats: PowerStats;

    constructor(id: number, name: string, slug: string, powerstats: PowerStats) {
      this.id = id;
      this.name = name;
      this.slug = slug;
      this.powerstats=powerstats;
    }
  
    getImageUrl(): string {
      return `https://cdn.jsdelivr.net/gh/rtomczak/superhero-api@0.3.0/api/images/sm/${this.slug}.jpg`;
    }
  }