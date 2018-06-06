console.log("CONNECTED");

$('document').ready(function () {

        //INSTANTIATION FROM CONSTRUCTOR (BOTTOM OF SCRIPT):
        let yoda = new CreateCharacter('Yoda', 'yoda', './assets/images/yoda-resized.jpg', 95, 14);
        let leia = new CreateCharacter('Princess Leia', 'leia', './assets/images/princess-leia-resized.png', 115, 27);
        let anakin = new CreateCharacter('Young Anakin', 'anakin', './assets/images/young-anakin-resized.jpg', 130, 17);
        let sheev = new CreateCharacter('Sheev Palpatine', 'sheev', './assets/images/sheev-palpatine-resized.png', 120, 12);

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
        chooseDefender();

        //CHOOSE DEFENDER DYNAMIC CLICK LISTENERS:
        function chooseDefender() {

                $('body').on('click', '.enemy', function () {
                        let htmlData = $(this).html();
                        //no.1 YODA:
                        if (htmlData.includes('yoda')) {
                                console.log(defenderChar[0]);
                                if (defenderChar[0] === undefined) {

                                        index = enemyChars.indexOf(yoda);
                                        enemyChars.splice(index, 1);

                                        defenderChar = [];
                                        clearRow($bottomRow);

                                        $('.yoda').addClass('removed');
                                        defenderChar.push(yoda);
                                        cardsToBoard(defenderChar, $bottomRow);
                                        $('.yoda').addClass('defender');
                                        if ($('.attack').hasClass('invisible')) {
                                                console.log('YES INVISIBLE');
                                                $('.attack').toggleClass('invisible');
                                        }

                                } else {
                                        console.log(defenderChar[0]);
                                        alert('DEFEAT CURRENT DEFENDER FIRST!');
                                }
                        }
                        //no.2 ANAKIN:
                        else if (htmlData.includes('anakin')) {
                                console.log(defenderChar[0]);
                                if (defenderChar[0] === undefined) {

                                        index = enemyChars.indexOf(anakin);
                                        enemyChars.splice(index, 1);

                                        defenderChar = [];
                                        clearRow($bottomRow);

                                        $('.anakin').addClass('removed');
                                        defenderChar.push(anakin);
                                        cardsToBoard(defenderChar, $bottomRow);
                                        $('.anakin').addClass('defender');
                                        if ($('.attack').hasClass('invisible')) {
                                                console.log('YES INVISIBLE');
                                                $('.attack').toggleClass('invisible');
                                        }
                                } else {
                                        console.log(defenderChar[0]);
                                        alert('DEFEAT CURRENT DEFENDER FIRST!');
                                }
                        }
                        //no.3 LEIA: 
                        else if (htmlData.includes('leia')) {
                                console.log(defenderChar[0]);
                                if (defenderChar[0] === undefined) {

                                        index = enemyChars.indexOf(leia);
                                        enemyChars.splice(index, 1);

                                        defenderChar = [];
                                        clearRow($bottomRow);
                                        $('.leia').addClass('removed');
                                        defenderChar.push(leia);
                                        cardsToBoard(defenderChar, $bottomRow);
                                        $('.leia').addClass('defender');
                                        if ($('.attack').hasClass('invisible')) {
                                                console.log('YES INVISIBLE');
                                                $('.attack').toggleClass('invisible');
                                        }
                                } else {
                                        console.log(defenderChar[0]);
                                        alert('DEFEAT CURRENT DEFENDER FIRST!');
                                }
                        }
                        //no.4 SHEEV:
                        else if (htmlData.includes('sheev')) {
                                console.log(defenderChar[0]);
                                if (defenderChar[0] === undefined) {

                                        index = enemyChars.indexOf(sheev);
                                        enemyChars.splice(index, 1);
                                        console.log(enemyChars);
                                        console.log(enemyChars.length);

                                        defenderChar = [];
                                        clearRow($bottomRow);
                                        $('.sheev').addClass('removed');
                                        defenderChar.push(sheev);
                                        cardsToBoard(defenderChar, $bottomRow);
                                        $('.sheev').addClass('defender');
                                        if ($('.attack').hasClass('invisible')) {
                                                console.log('YES INVISIBLE');
                                                $('.attack').toggleClass('invisible');
                                        }
                                        console.log(enemyChars.length);
                                } else {
                                        console.log(defenderChar[0]);
                                        alert('DEFEAT CURRENT DEFENDER FIRST!');
                                }
                        }
                }) /*end enemy click listener*/

        }

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
                        .css({ "font-size": "2em", "color": "#862800", "padding-top": "20px" });

                defenderChar[0].HP -= playerChar[0].AP; /*player attacks*/
                playerChar[0].AP += playerBaseAttack; /*player AP increased by original baseAttack*/

                //REFLECT DAMAGE TO PLAYERCHAR:
                $(`.hp-${playerClassName}`).text(playerChar[0].HP + "HP");

                //REFLECT DAMAGE TO DEFENDERCHAR:
                $(`.hp-${defenderClassName}`).text(defenderChar[0].HP + "HP");

                checkWinOrLose();

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
        function checkWinOrLose() {
                let playerHealth = playerChar[0].HP;
                let defenderHealth = defenderChar[0].HP;

                if (defenderHealth <= 0 && enemyChars.length == 0 && playerHealth > 0) {
                        clearRow($bottomRow);
                        // defenderChar = []; /*potentially unnessesary*/
                        // enemyChars = []; /*potentially unnessesary because in prompt()*/
                        $('body').off('click', '.enemy');
                        $('body').off('click', '.attack');
                        $('.attack').toggleClass('invisible');
                        promptChampion();
                } else if (defenderHealth <= 0 && enemyChars.length == 0 && playerHealth < 0) {
                        clearRow($topRow);
                        clearRow($bottomRow);
                        // defenderChar = []; /*potentially unnessesary*/
                        // enemyChars = []; /*potentially unnessesary because in prompt()*/
                        $('body').off('click', '.enemy');
                        $('body').off('click', '.attack');
                        $('.attack').toggleClass('invisible');
                        promptChampion(); /*kinda?? promptHero()*/
                } else if (playerHealth <= 0) {
                        clearRow($topRow);
                        playerChar = [];
                        /* prevent further battle */
                        $('body').off('click', '.enemy');
                        $('body').off('click', '.attack');
                        /* reset to orinal character values */
                        yoda.reset();
                        leia.reset();
                        anakin.reset();
                        sheev.reset();
                        promptGameOver();

                } else if (defenderHealth <= 0) {
                        clearRow($bottomRow);
                        defenderChar = [];
                        alert("SAVAGE!");
                }



        }

        function promptChampion() {
                let $modal = $('<div id="modal">');
                let $prompt = $('<div id="prompt">');
                let $gameOver = $('<div>');
                let $restart = $('<div>');
                // $('.attack').hide();

                $modal.css({ "position": "fixed", "top": "0", "left": "0", "bottom": "0", "right": "0", "background-color": "rgba(0,0,0,0.65)", "z-index": "5" });
                $prompt.css({ "background-color": "#0a0406", "border": "2px dashed slategray", "position": "fixed", "top": "50%", "left": "50%", "transform": "translate(-50%, -50%)", "z-index": "10" });

                $gameOver.html('<img src=\"./assets/images/you-win-oval.png\" width="426px" height="220px">');

                $restart.css({ "margin": "0 auto", "position": "relative", "top": "-50px", "background-color": "#0a0406", "text-align": "center", "font-size": "2rem", "cursor": "pointer" });
                $restart.html('<h2 id="restart">PLAY AGAIN?</h2>').css({ "color": "slategray" });

                //RESTART BUTTON CLICK LISTENER ADDED UPON CREATION:
                $restart.on('click', function () {
                        $prompt.hide();
                        $modal.hide();
                        // $('.commentary-box').text('');

                        yoda.reset();
                        leia.reset();
                        anakin.reset();
                        sheev.reset();

                        clearRow($topRow);
                        clearRow($middleRow);
                        clearRow($bottomRow);

                        playerChar = [];
                        enemyChars = [];
                        defenderChar = [];

                        console.log(typeof $bottomRow);
                        console.log($bottomRow.length);
                        console.log(defenderChar[0]);

                        // $topRow.empty();
                        // $middleRow.empty();
                        // $bottomRow.empty();

                        allChars = [yoda, leia, anakin, sheev];
                        cardsToBoard(allChars, $topRow);



                        // cardsToBoard(enemyChars, $middleRow);
                        // cardsToBoard(defenderChar, $bottomRow);
                        chooseYourCharacter();
                        chooseDefender();
                })

                $gameOver.append($restart);
                $prompt.append($gameOver);

                $('body').append($modal);
                $('body').append($prompt);
        }

        function promptGameOver() {
                let $modal = $('<div id="modal">');
                let $prompt = $('<div id="prompt">');
                let $gameOver = $('<div>');
                let $restart = $('<div>');
                $('.attack').toggleClass('invisible');

                $modal.css({ "position": "fixed", "top": "0", "left": "0", "bottom": "0", "right": "0", "background-color": "rgba(0,0,0,0.65)", "z-index": "5" });
                $prompt.css({ "background-color": "#0a0406", "border": "2px dashed slategray", "position": "fixed", "top": "50%", "left": "50%", "transform": "translate(-50%, -50%)", "z-index": "10" });

                $gameOver.html('<img src=\"./assets/images/game-over-xs.png\" width="426px" height="220px">');

                $restart.css({ "margin": "0 auto", "position": "relative", "top": "-50px", "background-color": "#0a0406", "text-align": "center", "font-size": "2rem", "cursor": "pointer"});
                $restart.html('<h2 id="restart">TRY AGAIN?</h2>').css({ "color": "slategray" });

                //RESTART BUTTON CLICK LISTENER ADDED UPON CREATION:
                $restart.on('click', function () {
                        $prompt.hide();
                        $modal.hide();
                        // $('.commentary-box').text('');

                        yoda.reset();
                        leia.reset();
                        anakin.reset();
                        sheev.reset();

                        clearRow($topRow);
                        clearRow($middleRow);
                        clearRow($bottomRow);

                        allChars = [yoda, leia, anakin, sheev];
                        playerChar = [];
                        enemyChars = [];
                        defenderChar = [];

                        cardsToBoard(allChars, $topRow);
                        chooseYourCharacter();
                        chooseDefender();
                })

                $gameOver.append($restart);
                $prompt.append($gameOver);

                $('body').append($modal);
                $('body').append($prompt);
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
                this.reset = function () {
                        this.name = name;
                        this.className = className;
                        this.imageURL = imageURL;
                        this.HP = HP;
                        this.AP = AP;
                        this.baseAP = AP;
                        console.log(`${this.className} has been restored`);
                };
        }


}) /*END OF DOCUMENT.READY*/
