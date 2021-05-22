namespace Donaldsfarm {
    window.addEventListener("load", load);

    function load(): void {

    class Animal {
        name: string;
        sound: string;
        food: string;
        foodAmount: number;
        foodEaten: number;
        
        
    
    constructor(_name: string, _sound: string, _food: string, _foodAmount: number, _foodEaten: number ) {
        this.name = _name;
        this.sound = _sound;
        this.food = _food;
        this.foodAmount = _foodAmount;
        this.foodEaten = _foodEaten;
        
    }
    text(): void {
        console.log("Hey I am a " + this.name);
        console.log("Old Mac Donald had a farm E-I-E-I-O And on his farm he had some " + this.name + "s E-I-E-I-O With a " + this.sound + "-" + this.sound + " here and a " + this.sound + "-" + this.sound + " there Here a " + this.sound + " , there a " + this.sound + " Everywhere a " + this.sound);
    }

    eat(): void {
        console.log(this.name + "s Ate today: " + this.foodEaten   + " Kg " + "of " + this.food + "  Old Mac Donald have ",  this.foodAmount - this.foodEaten + " Kg" + " left" );
    
    }

}
    
    let cow: Animal = new Animal("Cow", "Moo", "Hay", 200, 50);
    console.log(cow.text());
    console.log(cow.eat());
   
    
    let horse: Animal = new Animal("Horse", "Prrr", "Apple", 50, 15);
    console.log(horse.text());
    console.log(horse.eat());
   
  
    let chicken: Animal = new Animal("Chicken", "CawkCawk", "Corn", 100, 25);
    console.log(chicken.text());
    console.log(chicken.eat());
   
    let dog: Animal = new Animal("Dog", "Woof", "Kibble", 20, 5);
    console.log(dog.text());
    console.log(dog.eat());
    

    let sheep: Animal = new Animal("Sheep", "Baaah", "Grass", 200, 80);
    console.log(sheep.text());
    console.log(sheep.eat());

    }
}