export class Animal {
  public constructor(name) {
    // No accessibility modifier
    this.animalName = name;
  }
  animalName: string; // No accessibility modifier
  get name(): string {
    // No accessibility modifier
    return this.animalName;
  }
  set name(value: string) {
    // No accessibility modifier
    this.animalName = value;
  }
  walk() {
    // method
  }
}
