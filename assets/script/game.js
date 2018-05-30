console.log("CONNECTED");

$('document').ready(function(){

//CONSTRUCTOR FUNCTION:       
function CreateCharacter(name, imageURL, HP, AP) {
        this.name = name;
        this.imageURL = imageURL;
        this.HP = HP;
        this.AP = AP;
        this.greeting = function() {
                console.log('Hi! I\'m ' + this.name + '. ' + 'My total HP is ' + this.HP + ' and my Attack Power is ' + AP + '.');
        };
}

//INSTANTIATION:
let yoda = new CreateCharacter('Yoda', '../images/yoda-resized.jpg', 90, 6);
yoda.greeting();
let leia = new CreateCharacter('Princess Leia', '../images/princess-leia-resized.png', 100, 7);
leia.greeting();
let anakin = new CreateCharacter('Young Anakin', '../images/young-anakin-resized.jpg', 140, 9);
anakin.greeting();
let sheev = new CreateCharacter('Sheev Palpatine', '../images/sheev-palpatine-resized.png', 120, 13);
sheev.greeting();

//USE JQUERY TO BUILD PLAYER CARDS ON SCREEN USING CHARACTER INSTANCES:



















}) /*END OF DOCUMENT.READY*/



/*PREVIOUS: */

        //Format: [0]=Name, [1]="Image", [2]="Hit Points", [4]="Attack Points"
// let yodaData    = ["Yoda", "../images/yoda-resized.jpg", 90, 6];
// let leiaData    = ["Princess Leia", "../images/princess-leia-resized.png", 100, 7];
// let anakinData  = ["Young Anakin", "../images/young-anakin-resized.jpg", 140, 9];
// let sheevData   = ["Sheev Palpatine", "../images/sheev-palpatine-resized.png", 130, 11];    