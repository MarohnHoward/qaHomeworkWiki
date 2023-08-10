class Animal {
  name: string;
  sound: string;
  food: string;
  constructor(name: string, sound: string, food: string) {
    this.name = name;
    this.sound = sound;
    this.food = food;
  }
  soundOff(): string {
    return `The ${this.name} makes the sound "${this.sound}".`;
  }
}

/**
 * Fish extends Animal, but takes different properties, has a different soundOff() method, and a new method, habitat().
 * @param {string} name - as expected
 * @param {string} food - as expected
 * @param {boolean} saltwater - true if the fish is a saltwater fish
 */

/**
 * Bird extends Animal, but takes an additional property, and has an additional method, fly().
 * @param {string} name - as expected
 * @param {string} sound - as expected
 * @param {string} food - as expected
 * @param {number} flightSpeed - the flight speed of the bird, in meters/second. This should be 0 for flightless birds.
 */
class Fish extends Animal {
  saltwater: boolean;
  constructor(name: string, food: string, saltwater: boolean) {
    super(name, "", food);
    this.saltwater = saltwater;
  }
  soundOff() {
    return `The ${this.name} is a fish and does not make sounds.`;
  }
  habitat() {
    return `The ${this.name} is a ${
      this.saltwater ? "saltwater" : "freshwater"
    } fish.`;
  }
}

class Bird extends Animal {
  flightSpeed: number;
  constructor(name: string, sound: string, food: string, flightSpeed: number) {
    super(name, sound, food);
    this.flightSpeed = flightSpeed;
  }
  fly() {
    if (this.flightSpeed > 0) {
      return `The ${this.name} flies at speeds of up to ${this.flightSpeed} meters per second!`;
    } else {
      return `The ${this.name} is a flightless bird.`;
    }
  }
}

describe("Testing animals", () => {
  test("a basic animal works as expected", () => {
    let lion = new Animal("lion", "roar", "meat");
    // lion is an animal
    expect(lion instanceof Animal).toBeTruthy();
    // lion.soundOff() has the expected output
    expect(lion.soundOff()).toBe('The lion makes the sound "roar".');
  });
  describe("Fish", () => {
    // Fish should only have the three parameters listed.
    let goldfish = new Fish("goldfish", "pellets", false);
    let shark = new Fish("shark", "fish", true);
    it("are animals", () => {
      // Fish *must* extend Animal
      expect(goldfish instanceof Animal).toBeTruthy();
    });
    it("doesn't make sound", () => {
      // Fish should give the expected soundOff, it's own version
      expect(goldfish.soundOff()).toBe(
        "The goldfish is a fish and does not make sounds."
      );
    });
    it("can be saltwater or freshwater", () => {
      // Fish gives the right habitat string based on the `saltwater` property
      expect(goldfish.habitat()).toBe("The goldfish is a freshwater fish.");
      expect(shark.habitat()).toBe("The shark is a saltwater fish.");
    });
  });
  describe("Birds", () => {
    // Bird should actually take four arguments
    let swallow = new Bird("swallow", "chattering chirp", "insects", 11);
    let emu = new Bird("emu", "grunt", "plants and insects", 0);
    it("are animals", () => {
      // Bird *must* extend Animal
      expect(swallow instanceof Animal).toBeTruthy();
    });
    it("make sounds", () => {
      // Bird uses the standard soundOff
      expect(swallow.soundOff()).toBe(
        'The swallow makes the sound "chattering chirp".'
      );
    });
    it("might be able to fly", () => {
      // Bird have a new method using the fly speed to give us these strings
      expect(swallow.fly()).toBe(
        "The swallow flies at speeds of up to 11 meters per second!"
      );
      expect(emu.fly()).toBe("The emu is a flightless bird.");
    });
  });
});
