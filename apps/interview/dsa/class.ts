/**
 * Class: A blueprint for creating objects with properties and methods.
 *
 * Key concepts demonstrated:
 * - Properties (instance variables)
 * - Constructor (initializes object)
 * - Methods (functions tied to the object)
 * - Access modifiers (public, private, readonly)
 * - Static properties/methods (belong to the class itself)
 */

class Car {
  // Public property: accessible from anywhere
  public make: string;

  // Private property: accessible only inside the class
  private speed: number;

  // Readonly property: can only be set during initialization
  readonly wheels: number;

  // Static property: belongs to the class, not an instance
  static vehicleType = "Automobile";

  // Constructor: called when creating a new instance
  constructor(make: string, speed: number) {
    this.make = make;
    this.speed = speed;
    this.wheels = 4; // all cars have 4 wheels
  }

  // Public method: accessible from instance
  public accelerate(amount: number): void {
    this.speed += amount;
    console.log(`${this.make} accelerated to ${this.speed} km/h`);
  }

  // Private method: can only be called inside the class
  private checkEngine(): void {
    console.log("Engine is running smoothly.");
  }

  // Public method calling a private method
  public start(): void {
    console.log(`${this.make} is starting...`);
    this.checkEngine();
  }

  // Static method: called on the class itself
  static info(): void {
    console.log(`All cars are ${Car.vehicleType}s.`);
  }
}

// Example usage
const myCar = new Car("Toyota", 0);

myCar.start(); // Toyota is starting... Engine is running smoothly.
myCar.accelerate(50); // Toyota accelerated to 50 km/h
console.log(myCar.wheels); // 4

// Access static members
Car.info(); // All cars are Automobiles.
console.log(Car.vehicleType); // Automobile

// -------------------------

/**
 * abstract class can't be instantiated directly but can be extended by other classes. it acts as a blueprint for other classes to inherit from.
 * abstract class can contain abstract methods, which are methods without a body. subclasses must provide an implementation for these abstract methods.
 * abstract class can have abstract properties as well. subclasses must provide an implementation for these properties.
 * failure to implement abstract members in subclasses will result in a compilation error.
 */
abstract class Animal {
  // Abstract method
  abstract makeSound(): void;

  // Abstract property
  abstract color: string;

  // Regular method
  move(distanceInMeters = 0): void {
    console.log(`This animal moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  // you would get an error if you don't implement the abstract members
  color = "brown";
  makeSound() {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog();
dog.makeSound();
dog.move(10);
