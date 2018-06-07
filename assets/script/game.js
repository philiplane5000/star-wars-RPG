$('document').ready(function () {

        //INSTANTIATION OF PLAYER CARDS FROM CONSTRUCTOR FUNCTION (BOTTOM OF SCRIPT):
        let yoda   = new CreateCharacter('Yoda', 'yoda', './assets/images/yoda-resized.jpg', 95, 14);
        let leia   = new CreateCharacter('Princess Leia', 'leia', './assets/images/princess-leia-resized.png', 115, 27);
        let anakin = new CreateCharacter('Young Anakin', 'anakin', './assets/images/young-anakin-resized.jpg', 130, 17);
        let sheev  = new CreateCharacter('Sheev Palpatine', 'sheev', './assets/images/sheev-palpatine-resized.png', 120, 12);

        //ARRAYS TO HOLD PLAYER OBJECTS
        let allChars     = [yoda, leia, anakin, sheev];
        let playerChar   = [];
        let enemyChars   = [];
        let defenderChar = [];

        //ROW TARGETS:
        let $topRow    = $('.top-row');
        let $middleRow = $('.middle-row');
        let $bottomRow = $('.bottom-row');

        //FLICKER INTERVAL:
        let restartBtnInterval;

        //WIN or LOSE:
        let imgSrc      = "";
        let win         = false;
        let $audioWin   = $('audio#Win')[0];
        let $audioLose  = $('audio#Lose')[0];

        //RENDER GAME:
        cardsToBoard(allChars, $topRow);
        chooseYourCharacter();
        chooseDefender();

        //MAIN GAME FUNCTIONS:
        //=====================//

        function cardsToBoard(arr, target) {

                if (arr.length > 1) {
                        for (let i = 0; i < arr.length; i++) {
                                //BUILDING PLAYER CARD HTML AND APPLYING APPROPRIATE CLASSES:
                                let $playerCard = $('<div>').addClass('player-card ' + arr[i].className);
                                let $playerName = $('<div>').addClass('char-name').html(arr[i].name);
                                let $playerImage = $('<img>').attr('src', arr[i].imageURL);
                                let $playerHP = $('<div>').addClass(`hp-${arr[i].className}`).html(arr[i].HP + 'HP');

                                //PLACE PLAYER ATTRIBUTES ON CARD:
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

                        //PLACE PLAYER ATTRIBUTES ON CARD:
                        $playerCard.append($playerName);
                        $playerCard.append($playerImage);
                        $playerCard.append($playerHP);

                        //APPEND CARDS TO BOARD AT TARGET:
                        target.append($playerCard);
                }
        }

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

        function chooseDefender() {
                //CHOOSE DEFENDER CLICK LISTENERS:
                $('body').on('click', '.enemy', function () {
                        let htmlData = $(this).html();
                        //no.1 YODA:
                        if (htmlData.includes('yoda')) {
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
                                                $('.attack').toggleClass('invisible');
                                        }
                                } else {
                                        alert('DEFEAT CURRENT DEFENDER FIRST!');
                                }
                        }
                        //no.2 ANAKIN:
                        else if (htmlData.includes('anakin')) {
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
                                                $('.attack').toggleClass('invisible');
                                        }
                                } else {
                                        alert('DEFEAT CURRENT DEFENDER FIRST!');
                                }
                        }
                        //no.3 LEIA: 
                        else if (htmlData.includes('leia')) {
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
                                                $('.attack').toggleClass('invisible');
                                        }
                                } else {
                                        alert('DEFEAT CURRENT DEFENDER FIRST!');
                                }
                        }
                        //no.4 SHEEV:
                        else if (htmlData.includes('sheev')) {
                                if (defenderChar[0] === undefined) {
                                        index = enemyChars.indexOf(sheev);
                                        enemyChars.splice(index, 1);
                                        defenderChar = [];
                                        clearRow($bottomRow);
                                        $('.sheev').addClass('removed');
                                        defenderChar.push(sheev);
                                        cardsToBoard(defenderChar, $bottomRow);
                                        $('.sheev').addClass('defender');
                                        if ($('.attack').hasClass('invisible')) {
                                                $('.attack').toggleClass('invisible');
                                        }
                                } else {
                                        alert('DEFEAT CURRENT DEFENDER FIRST!');
                                }
                        }
                })
        }  /*end chooseDefender() */

        //ATTACK BUTTON CLICK LISTENER:
        $('.attack').on('click', function () {
                //PLAYER:
                let playerFullName = playerChar[0].name; /*for game updates*/
                let playerClassName = playerChar[0].className;
                let playerBaseAttack = playerChar[0].baseAP;
                //DEFENDER:
                let defenderFullName = defenderChar[0].name; /*for game updates*/
                let defenderClassName = defenderChar[0].className;
                let defenderBaseAttack = defenderChar[0].AP;

                playerChar[0].HP -= defenderChar[0].AP; /*defender attacks*/
                console.log(`${defenderFullName} attacked you for ${defenderBaseAttack}hp damage!`);
                defenderChar[0].HP -= playerChar[0].AP; /*player attacks*/
                console.log(`You attacked ${defenderFullName} for ${playerChar[0].AP}hp damage!`);

                $('.commentary') /* on game-screen USE TWO COLORS(!) */
                        .html(`${defenderFullName} attacked you for ${defenderBaseAttack}HP damage! <br> You attacked ${defenderFullName} for ${playerChar[0].AP}HP damage!`)
                        .css({ "font-size": "2em", "color": "#862800", "padding-top": "20px" });

                //PLAYER AP INCREASED BY ORIGINAL baseAttack
                playerChar[0].AP += playerBaseAttack;

                //REFLECT DAMAGE TO PLAYERCHAR:
                $(`.hp-${playerClassName}`).text(playerChar[0].HP + "HP");

                //REFLECT DAMAGE TO DEFENDERCHAR:
                $(`.hp-${defenderClassName}`).text(defenderChar[0].HP + "HP");

                checkWinOrLose();
        })

        function checkWinOrLose() {

                let playerHealth = playerChar[0].HP;
                let defenderHealth = defenderChar[0].HP;

                if (defenderHealth <= 0 && enemyChars.length == 0 && playerHealth > 0) {
                        win = true;
                        clearRow($bottomRow);
                        $('body').off('click', '.enemy');
                        $('body').off('click', '.attack');
                        $('.attack').toggleClass('invisible');
                        promptWinOrLose(win);
                } else if (defenderHealth <= 0 && enemyChars.length == 0 && playerHealth < 0) {
                        win = true;
                        clearRow($topRow);
                        clearRow($bottomRow);
                        $('body').off('click', '.enemy');
                        $('body').off('click', '.attack');
                        $('.attack').toggleClass('invisible');
                        promptWinOrLose(win); /*so if player dies.. but kills enemy.. still a legend? maybe add promptHero()*/
                } else if (playerHealth <= 0) {
                        win = false;
                        clearRow($topRow);
                        playerChar = [];
                        $('body').off('click', '.enemy');
                        $('body').off('click', '.attack');
                        $('.attack').toggleClass('invisible');
                        yoda.reset();
                        leia.reset();
                        anakin.reset();
                        sheev.reset();
                        promptWinOrLose(win);
                } else if (defenderHealth <= 0) {
                        clearRow($bottomRow);
                        defenderChar = [];
                        alert("SAVAGE!");
                }
        }

        function promptWinOrLose(e) {

                (e === true) ? $audioWin.play() : $audioLose.play();
                (e === true) ? imgSrc = "./assets/images/you-win-oval.png" : imgSrc = "./assets/images/game-over-xs.png";
                (e === true) ? promptTxt = "PLAY AGAIN" : promptTxt = "CONTINUE";

                let $modal = $('<div id="modal">');
                let $prompt = $('<div>');
                let $restart = $('<div>');

                $modal.css({ "position": "fixed", "top": "0", "left": "0", "bottom": "0", "right": "0", "background-color": "rgba(0,0,0,0.85)", "z-index": "5" });
                $prompt.html(`'<img src="${imgSrc}" width="426px" height="220px">'`).css({ "position": "fixed", "top": "50vh", "left": "50vw", "transform": "translate(-50%, -50%)", "z-index": "100" })
                $restart.css({ "position": "fixed", "top": "80%", "left": "50%", "font-size": "2rem", "cursor": "pointer", "z-index": "20", "transform": "translate(-50%, -50%)" });
                $restart.html(`<h2>${promptTxt}</h2>`).addClass('restart');

                $('body').append($restart);
                $('body').append($modal);
                $('body').append($prompt);

                startFlicker();
                restartButtonOnClick();

                function startFlicker() {
                        restartBtnInterval = setInterval(appear, 1000);
                }

                function appear() {
                        console.log("every 1s");
                        $('.restart').toggleClass('restart-hidden');
                }

                function restartButtonOnClick() {
                        //RESTART BUTTON CLICK LISTENER ADDED UPON CREATION:
                        $restart.on('click', function () {
                                $modal.hide();
                                $prompt.hide();
                                $restart.hide();
                                clearInterval(restartBtnInterval);

                                $('.commentary').empty();

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

                                allChars = [yoda, leia, anakin, sheev];
                                cardsToBoard(allChars, $topRow);
                                chooseYourCharacter();
                                chooseDefender();
                        })
                }

        } /*end promptWinOrLose() */

        //GAME TOOLS: 

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
                };
        }

}) /*END OF DOCUMENT.READY*/
