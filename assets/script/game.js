console.log("CONNECTED");

$('document').ready(function () {

        //INSTANTIATION FROM CONSTRUCTOR (BOTTOM OF SCRIPT):
        let yoda   = new CreateCharacter('Yoda', 'yoda', './assets/images/yoda-resized.jpg', 90, 6);
        let leia   = new CreateCharacter('Princess Leia', 'leia', './assets/images/princess-leia-resized.png', 100, 7);
        let anakin = new CreateCharacter('Young Anakin', 'anakin', './assets/images/young-anakin-resized.jpg', 140, 9);
        let sheev  = new CreateCharacter('Sheev Palpatine', 'sheev', './assets/images/sheev-palpatine-resized.png', 120, 13);

        let allChars   = [yoda, leia, anakin, sheev];
        let playerChar = [];
        let enemyChars = [];
        let defenderChar = [];

        //ROW TARGETS:
        let $topRow    = $('.top-row');
        let $middleRow = $('.middle-row');
        let $bottomRow = $('.bottom-row');

        cardsToBoard(allChars, $topRow);

        //CHOOSE CHARACTER CLICK LISTENERS:
        $('.yoda').one('click', function () {
                updateArrays(yoda, leia, anakin, sheev, null);
                clearRow($topRow);
                cardsToBoard(playerChar, $topRow);
                cardsToBoard(enemyChars, $middleRow);
                $('.yoda').addClass('selected player');
                $('.anakin').addClass('enemy');
                $('.sheev').addClass('enemy');
                $('.leia').addClass('enemy');
        });

        $('.leia').one('click', function () {
                updateArrays(leia, yoda, anakin, sheev, null);
                clearRow($topRow);
                cardsToBoard(playerChar, $topRow);
                cardsToBoard(enemyChars, $middleRow);
                $('.leia').addClass('player');
                $('.yoda').addClass('enemy');
                $('.anakin').addClass('enemy');
                $('.sheev').addClass('enemy');
        });

       $('.anakin').one('click', function () {
                updateArrays(anakin, yoda, leia, sheev, null);
                clearRow($topRow);
                cardsToBoard(playerChar, $topRow);
                cardsToBoard(enemyChars, $middleRow);
                $('.anakin').addClass('player');
                $('.leia').addClass('enemy');
                $('.yoda').addClass('enemy');
                $('.sheev').addClass('enemy');
        });

        $('.sheev').one('click', function () {
                updateArrays(sheev, leia, anakin, yoda, null);
                clearRow($topRow);
                cardsToBoard(playerChar, $topRow);
                cardsToBoard(enemyChars, $middleRow);
                $('.sheev').addClass('player');
                $('.anakin').addClass('enemy');
                $('.leia').addClass('enemy');
                $('.yoda').addClass('enemy');
        });

        //CHOOSE DEFENDER CLICK LISTENERS:

        $('body').on('click', '.enemy', function() {
                let htmlData = $(this).html();
                //no.1 YODA:
                if(htmlData.includes('yoda')){
                        if((defenderChar[0]) !== null){
                                console.log(defenderChar);
                                alert('DEFENDER IS READY FOR ATTACK!');
                        } else {
                                defenderChar = [];
                                $('.yoda').addClass('removed');
                                defenderChar.push(yoda);
                                clearRow($bottomRow);
                                cardsToBoard(defenderChar, $bottomRow);
                                $('.yoda').addClass('defender');
                                $('.attack').removeClass('invisible');
                        }
                } //no.2 ANAKIN:
                else if(htmlData.includes('anakin')){
                        if((defenderChar[0]) !== null){
                                console.log(defenderChar);
                                alert('DEFENDER IS READY FOR ATTACK!');
                        } else {
                                defenderChar = [];
                                $('.anakin').addClass('removed');
                                defenderChar.push(anakin);
                                clearRow($bottomRow);
                                cardsToBoard(defenderChar, $bottomRow);
                                $('.anakin').addClass('defender');
                                $('.attack').removeClass('invisible');
                        }
                } //no.3 LEIA: 
                else if(htmlData.includes('leia')){
                        if((defenderChar[0]) !== null){
                                console.log(defenderChar);
                                alert('DEFENDER IS READY FOR ATTACK!');
                        } else {
                                defenderChar = [];
                                $('.leia').addClass('removed');
                                defenderChar.push(leia);
                                clearRow($bottomRow);
                                cardsToBoard(defenderChar, $bottomRow);
                                $('.leia').addClass('defender');
                                $('.attack').removeClass('invisible');
                        }
                } //no.4 SHEEV:
                else if(htmlData.includes('sheev')){
                        if((defenderChar[0]) !== null){
                                console.log(defenderChar);
                                alert('DEFENDER IS READY FOR ATTACK!');
                        } else {
                                defenderChar = [];
                                $('.sheev').addClass('removed');
                                defenderChar.push(sheev);
                                clearRow($bottomRow);
                                cardsToBoard(defenderChar, $bottomRow);
                                $('.sheev').addClass('defender');
                                $('.attack').removeClass('invisible');
                        }
                } 
                        /* MUST BE SOME WAY TO USE SWITCH STATEMENT INSTEAD OF ABOVE: */
                        // switch(htmlData.toString()) {
                        //         case (htmlData.includes('yoda')):
                        //                 console.log('yoda');
                        //                 break;
                        //         case (htmlData.includes('leia')):
                        //                 console.log('leia');
                        //                 break;
                        //         case (htmlData.includes('sheev')):
                        //                 console.log('sheev');
                        //                 break;
                        //         case (htmlData.includes('anakin')):
                        //                 console.log('anakin');
                        //                 break;
                        // }
                }) /*end enemy click listener*/

        //USE JQUERY TO BUILD PLAYER CARDS ON SCREEN USING CHARACTER INSTANCES:
        //BUILD A FOR LOOP (OR FOR EACH?) THAT WILL ACCESS allChars[i] AND PLACE THE CARDS ON PAGE:

        function cardsToBoard(arr, target) {
                if (arr.length > 1) {
                        for (let i = 0; i < arr.length; i++) {
                                //BUILDING PLAYER CARD HTML AND APPLYING APPROPRIATE CLASSES:
                                let $playerCard = $('<div>').addClass('player-card ' + arr[i].className);
                                let $playerName = $('<div>').addClass('char-name').html(arr[i].name);
                                let $playerImage = $('<img>').attr('src', arr[i].imageURL);
                                let $playerHP = $('<div>').addClass('hp').html(arr[i].HP + 'HP');

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
                        let $playerHP = $('<div>').addClass('hp').html(arr[0].HP + 'HP');

                        //PLACE PLAYER CARDS ATTRIBUTES ON CARD:
                        $playerCard.append($playerName);
                        $playerCard.append($playerImage);
                        $playerCard.append($playerHP);

                        //APPEND CARDS TO BOARD AT TARGET:
                        target.append($playerCard);
                } else { console.log('EMPTY(?)');

                }
        }

        function updateArrays(player, enemyOne, enemyTwo, enemyThree, defender){
                playerChar   = [player];
                enemyChars   = [enemyOne, enemyTwo, enemyThree];
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
                this.greeting = function () {
                        console.log('Hi! I\'m ' + this.name + '. ' + 'My HP: ' + this.HP + ' My AP: ' + AP + ' ClassName: ' + this.className);
                }
        }


}) /*END OF DOCUMENT.READY*/
