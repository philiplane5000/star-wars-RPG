console.log("CONNECTED");

$('document').ready(function () {

        //INSTANTIATION FROM CONSTRUCTOR (BOTTOM OF SCRIPT):
        let yoda = new CreateCharacter('Yoda', 'yoda', './assets/images/yoda-resized.jpg', 95, 14);
        let leia = new CreateCharacter('Princess Leia', 'leia', './assets/images/princess-leia-resized.png', 130, 21);
        let anakin = new CreateCharacter('Young Anakin', 'anakin', './assets/images/young-anakin-resized.jpg', 125, 13);
        let sheev = new CreateCharacter('Sheev Palpatine', 'sheev', './assets/images/sheev-palpatine-resized.png', 100, 24);

        let allChars = [yoda, leia, anakin, sheev];
        let playerChar = [];
        let enemyChars = [];
        let defenderChar = [];

        //ROW TARGETS:
        let $topRow = $('.top-row');
        let $middleRow = $('.middle-row');
        let $bottomRow = $('.bottom-row');

        //MOVE PLAYER CARDS TO BOARD ON STARTUP:
        cardsToBoard(allChars, $topRow);
        chooseYourCharacter();

        //CHOOSE DEFENDER DYNAMIC CLICK LISTENERS:

        $('body').on('click', '.enemy', function () {
                let htmlData = $(this).html();
                //no.1 YODA:
                if (htmlData.includes('yoda')) {
                        console.log(defenderChar[0]);
                        if (defenderChar[0] === undefined) {
                                defenderChar = [];
                                $('.yoda').addClass('removed');
                                defenderChar.push(yoda);
                                clearRow($bottomRow);
                                cardsToBoard(defenderChar, $bottomRow);
                                $('.yoda').addClass('defender');
                                $('.attack').removeClass('invisible');
                        } else {
                                console.log(defenderChar[0]);
                                alert('DEFEAT CURRENT DEFENDER FIRST!');
                        }
                }
                //no.2 ANAKIN:
                else if (htmlData.includes('anakin')) {
                        console.log(defenderChar[0]);
                        if (defenderChar[0] === undefined) {
                                defenderChar = [];
                                $('.anakin').addClass('removed');
                                defenderChar.push(anakin);
                                clearRow($bottomRow);
                                cardsToBoard(defenderChar, $bottomRow);
                                $('.anakin').addClass('defender');
                                $('.attack').removeClass('invisible');
                        } else {
                                console.log(defenderChar[0]);
                                alert('DEFEAT CURRENT DEFENDER FIRST!');
                        }
                }
                //no.3 LEIA: 
                else if (htmlData.includes('leia')) {
                        console.log(defenderChar[0]);
                        if (defenderChar[0] === undefined) {
                                defenderChar = [];
                                $('.leia').addClass('removed');
                                defenderChar.push(leia);
                                clearRow($bottomRow);
                                cardsToBoard(defenderChar, $bottomRow);
                                $('.leia').addClass('defender');
                                $('.attack').removeClass('invisible');
                        } else {
                                console.log(defenderChar[0]);
                                alert('DEFEAT CURRENT DEFENDER FIRST!');
                        }
                }
                //no.4 SHEEV:
                else if (htmlData.includes('sheev')) {
                        console.log(defenderChar[0]);
                        if (defenderChar[0] === undefined) {
                                defenderChar = [];
                                $('.sheev').addClass('removed');
                                defenderChar.push(sheev);
                                clearRow($bottomRow);
                                cardsToBoard(defenderChar, $bottomRow);
                                $('.sheev').addClass('defender');
                                $('.attack').removeClass('invisible');
                        } else {
                                console.log(defenderChar[0]);
                                alert('DEFEAT CURRENT DEFENDER FIRST!');
                        }
                }
        }) /*end enemy click listener*/

        //ATTACK BUTTON CLICK LISTENER:

        $('.attack').on('click', function () {
                let playerFullName = playerChar[0].name; /*for game updates*/
                let playerClassName = playerChar[0].className;
                let playerBaseAttack = playerChar[0].baseAP;

                let defenderFullName = defenderChar[0].name; /*for game updates*/
                let defenderClassName = defenderChar[0].className;
                let defenderBaseAttack = defenderChar[0].AP;
                
                
                playerChar[0].HP -= defenderChar[0].AP; /*defender attacks*/
                console.log(`${defenderFullName} attacked you for ${defenderBaseAttack}hp damage!`);
                console.log(`You attacked ${defenderFullName} for ${playerChar[0].AP}hp damage!`);

                $('.commentary') /* on game-screen */
                .html(`${defenderFullName} attacked you for ${defenderBaseAttack}HP damage! <br> You attacked ${defenderFullName} for ${playerChar[0].AP}HP damage!`)
                .css({"font-size": "2em", "color": "#862800", "padding-top": "20px"});
                
                defenderChar[0].HP -= playerChar[0].AP; /*player attacks*/
                playerChar[0].AP += playerBaseAttack; /*player AP increased by original baseAttack*/
                
                //REFLECT DAMAGE TO PLAYERCHAR:
                $(`.hp-${playerClassName}`).text(playerChar[0].HP + "HP");
                
                //REFLECT DAMAGE TO DEFENDERCHAR:
                $(`.hp-${defenderClassName}`).text(defenderChar[0].HP + "HP");
                
                checkHealthClearBodies();
                
        })

        function chooseYourCharacter() {
                //CHOOSE CHARACTER CLICK LISTENERS:
                $('.yoda').one('click', function () {
                        updateArrays(yoda, leia, anakin, sheev, undefined);
                        clearRow($topRow);
                        cardsToBoard(playerChar, $topRow);
                        cardsToBoard(enemyChars, $middleRow);
                        $('.yoda').addClass('selected player');
                        $('.anakin').addClass('enemy');
                        $('.sheev').addClass('enemy');
                        $('.leia').addClass('enemy');
                        console.log(playerChar.length);

                });
        
                $('.leia').one('click', function () {
                        updateArrays(leia, yoda, anakin, sheev, undefined);
                        clearRow($topRow);
                        cardsToBoard(playerChar, $topRow);
                        cardsToBoard(enemyChars, $middleRow);
                        $('.leia').addClass('player');
                        $('.yoda').addClass('enemy');
                        $('.anakin').addClass('enemy');
                        $('.sheev').addClass('enemy');
                });
        
                $('.anakin').one('click', function () {
                        updateArrays(anakin, yoda, leia, sheev, undefined);
                        clearRow($topRow);
                        cardsToBoard(playerChar, $topRow);
                        cardsToBoard(enemyChars, $middleRow);
                        $('.anakin').addClass('player');
                        $('.leia').addClass('enemy');
                        $('.yoda').addClass('enemy');
                        $('.sheev').addClass('enemy');
                });
        
                $('.sheev').one('click', function () {
                        updateArrays(sheev, leia, anakin, yoda, undefined);
                        clearRow($topRow);
                        cardsToBoard(playerChar, $topRow);
                        cardsToBoard(enemyChars, $middleRow);
                        $('.sheev').addClass('player');
                        $('.anakin').addClass('enemy');
                        $('.leia').addClass('enemy');
                        $('.yoda').addClass('enemy');
                });
        }

        //USE JQUERY TO BUILD PLAYER CARDS ON SCREEN USING CHARACTER INSTANCES:
        //BUILD A FOR LOOP (OR FOR EACH?) THAT WILL ACCESS allChars[i] AND PLACE THE CARDS ON PAGE:
        function checkHealthClearBodies() {
                let playerHealth = playerChar[0].HP;
                let defenderHealth = defenderChar[0].HP;
                if (playerHealth <= 0) {
                        // $(`'.${playerChar[0].className}'`).animate({width: "0px"}, 500)
                        clearRow($topRow);
                        playerChar = [];
                        // let enemies = $('.enemy');
                        $('body').off('click', '.enemy');
                        $('body').off('click', '.attack');
                        // alert('GAME OVER');
                        // // restart();
                        yoda.reset();
                        leia.reset();
                        anakin.reset();
                        sheev.reset();
                        
                        console.log(playerChar.length);
                        console.log(enemyChars.length);
                        console.log(defenderChar.length);
                        promptUser();
                        /*NEED TO MOVE BELOW FEATURES TO ANOTHER FUNCTION promptUser() {} */
                        
                        // clearRow($middleRow);
                        // clearRow($bottomRow);
                        // allChars = [yoda, leia, anakin, sheev];
                        // playerChar = [];
                        // enemyChars = [];
                        // defenderChar = [];
                        // cardsToBoard(allChars, $topRow);
                        // chooseYourCharacter();
                        
                } if (defenderHealth <= 0) {
                        clearRow($bottomRow);
                        defenderChar = [];
                        alert('YOU SAVAGE!');
                        if(enemyChars.length == 1) {
                                promptUser();        
                        } else {
                                console.log(playerChar.length);
                                console.log(enemyChars.length);
                                console.log(defenderChar.length);
                        }
              
                }
                // console.log(defenderHealth);
        }

        function promptUser() {
                if(playerChar.length == 0) {
                        let prompt = $('<div>');
                        let gameOver = $('<div>');
                        prompt.css({"width": "400px", "height": "300px", "background-color": "black", "color": "yellow", "position": "fixed", "top": "50%", "left": "50%", "transform": "translate(-50%, -50%)"});
                        // prompt.html('<h3> GAME OVER! </h3>');

                        gameOver.css({"color": "yellow", "font-size": "5rem", "text-align": "center", "margin-top": "20px"});
                        gameOver.text('GAME OVER');
                        prompt.append(gameOver);

                        $('body').append(prompt);
                } if (playerChar.length == 1 && defenderChar.length == 0) {
                        alert('STAR WARS LEGEND');
                } else {
                        return;
                }   
        }

        function cardsToBoard(arr, target) {
                if (arr.length > 1) {
                        for (let i = 0; i < arr.length; i++) {
                                //BUILDING PLAYER CARD HTML AND APPLYING APPROPRIATE CLASSES:
                                let $playerCard = $('<div>').addClass('player-card ' + arr[i].className);
                                let $playerName = $('<div>').addClass('char-name').html(arr[i].name);
                                let $playerImage = $('<img>').attr('src', arr[i].imageURL);
                                let $playerHP = $('<div>').addClass(`hp-${arr[i].className}`).html(arr[i].HP + 'HP');

                                //PLACE PLAYER CARDS ATTRIBUTES ON CARD:
                                $playerCard.append($playerName);
                                $playerCard.append($playerImage);
                                $playerCard.append($playerHP);

                                //APPEND CARDS TO BOARD AT TARGET:
                                target.append($playerCard);
                        }
                } else if ((typeof arr) === 'object') {
                        let $playerCard = $('<div>').addClass('player-card ' + arr[0].className);
                        let $playerName = $('<div>').addClass('char-name').html(arr[0].name);
                        let $playerImage = $('<img>').attr('src', arr[0].imageURL);
                        let $playerHP = $('<div>').addClass(`hp-${arr[0].className}`).html(arr[0].HP + 'HP');

                        //PLACE PLAYER CARDS ATTRIBUTES ON CARD:
                        $playerCard.append($playerName);
                        $playerCard.append($playerImage);
                        $playerCard.append($playerHP);

                        //APPEND CARDS TO BOARD AT TARGET:
                        target.append($playerCard);
                } else {
                        console.log('EMPTY(?)');

                }
        }

        function updateArrays(player, enemyOne, enemyTwo, enemyThree, defender) {
                playerChar = [player];
                enemyChars = [enemyOne, enemyTwo, enemyThree];
                defenderChar = [defender];
        }

        function clearRow(target) {
                target.empty();
        }

        //CONSTRUCTOR FUNCTION:       
        function CreateCharacter(name, className, imageURL, HP, AP) {
                this.name = name;
                this.className = className;
                this.imageURL = imageURL;
                this.HP = HP;
                this.AP = AP;
                this.baseAP = AP;
                this.greeting = function () {
                        console.log('Hi! I\'m ' + this.name + '. ' + 'My HP: ' + this.HP + ' My AP: ' + AP + ' ClassName: ' + this.className);
                }
                this.reset = function () {
                        this.name = name;
                        this.className = className;
                        this.imageURL = imageURL;
                        this.HP = HP;
                        this.AP = AP;
                        this.baseAP = AP;
                        console.log(`${this.className} has been restored`);
                }
        }


}) /*END OF DOCUMENT.READY*/
