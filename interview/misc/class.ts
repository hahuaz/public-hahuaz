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
