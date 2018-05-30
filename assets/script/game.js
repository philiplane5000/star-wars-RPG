console.log("CONNECTED");

$('document').ready(function(){



//INSTANTIATION FROM CONSTRUCTOR:
let yoda = new CreateCharacter('Yoda', 'yoda', './assets/images/yoda-resized.jpg', 90, 6);
let leia = new CreateCharacter('Princess Leia', 'leia', './assets/images/princess-leia-resized.png', 100, 7);
let anakin = new CreateCharacter('Young Anakin', 'anakin', './assets/images/young-anakin-resized.jpg', 140, 9);
let sheev = new CreateCharacter('Sheev Palpatine', 'sheev', './assets/images/sheev-palpatine-resized.png', 120, 13);

let allChars = [yoda, leia, anakin, sheev];

allChars[1].greeting(); /*hmmmmm array of all objects to easily access their properties in a loop?*/
console.log(allChars[1].HP); /*seems to work...*/

//ROW TARGETS:
let $topRow    = $('.top-row');
let $middleRow = $('.middle-row');
let $bottomRow = $('.bottom-row');

cardsToBoard(allChars, $topRow);
// cardsToBoard(enemyChars, $middleRow); /*troubleshoot this, function can only exectue once?*/




//USE JQUERY TO BUILD PLAYER CARDS ON SCREEN USING CHARACTER INSTANCES:
//BUILD A FOR LOOP (OR FOR EACH?) THAT WILL ACCESS allChars[i] AND PLACE THE CARDS ON PAGE:
function cardsToBoard(arr, target) {
        if(arr && target) {
                for(let i = 0; i <= arr.length; i++ ) {
                        //BUILDING PLAYER CARD HTML AND APPLYING APPROPRIATE CLASSES:
                        let $playerCard = $('<div>').addClass('player-card ' + arr[i].className);
                        let $playerName = $('<div>').addClass('char-name').html(arr[i].name.toUpperCase());
                        let $playerImage = $('<img>').attr('src', arr[i].imageURL);
                        let $playerHP = $('<div>').addClass('hp').html(arr[i].HP + 'HP');  
        
                        //PLACE PLAYER CARDS ATTRIBUTES ON CARD:
                        $playerCard.append($playerName);
                        $playerCard.append($playerImage);
                        $playerCard.append($playerHP);

                        //APPEND CARDS TO BOARD AT TARGET:
                        target.append($playerCard);
                }
        } else {console.log('ERROR');}

}

//CONSTRUCTOR FUNCTION:       
function CreateCharacter(name, className, imageURL, HP, AP) {
        this.name = name;
        this.className = className;
        this.imageURL = imageURL;
        this.HP = HP;
        this.AP = AP;
        this.greeting = function() {
                console.log('Hi! I\'m ' + this.name + '. ' + 'My HP: ' + this.HP + ' My AP: ' + AP + ' ClassName: ' + this.className);
        };
}


}) /*END OF DOCUMENT.READY*/
