// OOP advantages:
// Modularity: it promotes modular design, where software components are divided into objects. Modular approach makes it easier to understand, maintain, and modify code base.
// Reusability: it facilitates code reuse through inheritance and composition. Inheritance allows a class (subclass) to inherit properties and methods from another class (superclass), reducing redundancy and promoting code reuse. Composition enables objects to be composed of other objects, allowing for the reuse of existing functionality.
// Encapsulation: it hides the internal state of an object and restricts access to it through well-defined interfaces (methods). This helps prevent unintended modification of object state. Encapsulation also enables the implementation details of an object to be hidden.
// Polymorphism: through common interfaces, it allows different classes to be treated as instances of the same class.

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
 * abstract class can't be instantiated directly but can be extended by other classes.
 * It defines common properties and methods that subclasses must implement.
 * abstract class can contain abstract methods, which are methods without a body. subclasses must provide an implementation for these abstract methods.
 * abstract class can have abstract properties as well. subclasses must provide an implementation for these properties.
 * failure to implement abstract members in subclasses will result in a compilation error.
 *
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

class Cat extends Animal {
  color = "white";
  makeSound() {
    console.log("Meow!");
  }
}

const dog = new Dog();
dog.makeSound();
dog.move(10);

// Abstract classes enable polymorphism by defining a common interface (through abstract methods) that subclasses must implement.
// polymorphism: the ability of different classes to be treated as instances of the same class through a common interface.
// Polymorphism = “same call, different behavior”
// here, making same call (animal.makeSound()) on different subclasses (Dog, Cat) but getting different behavior (different sound)
function perform(animal: Animal) {
  animal.makeSound();
}
perform(new Dog()); // Woof! Woof!
perform(new Cat()); // Meow!

// so
// inheritance is about reusing code,
// composition is about combining objects,
// polymorphism is about using a common interface for different types to provide different behaviors(same call, different method runs).

// SOLID principles
// Single Responsibility Principle: A class should have one responsibility. example: car class should only handle vehicle and not driver logic
// Open/Closed Principle: open to extension, closed to modification. example: for EV car, extend car class instead of modifying it.
// Liskov Substitution Principle: subclass should be substitutable for its superclass. example: electricCar.start() should work wherever car.start() works
// Interface Segregation Principle: Clients should not be forced to depend on interfaces they do not use. example: instead of having one big vehicle interface, have separate interfaces for car, bike, truck
// Dependency Inversion Principle: Depend on abstractions, not on concretions. example: car class shouldn't depend EVEngine or PetrolEngine directly, but on an Engine interface that both implement.
