console.log("CONNECTED");

$('document').ready(function () {



        //INSTANTIATION FROM CONSTRUCTOR:
        let yoda   = new CreateCharacter('Yoda', 'yoda', './assets/images/yoda-resized.jpg', 90, 6);
        let leia   = new CreateCharacter('Princess Leia', 'leia', './assets/images/princess-leia-resized.png', 100, 7);
        let anakin = new CreateCharacter('Young Anakin', 'anakin', './assets/images/young-anakin-resized.jpg', 140, 9);
        let sheev  = new CreateCharacter('Sheev Palpatine', 'sheev', './assets/images/sheev-palpatine-resized.png', 120, 13);

        let allChars = [yoda, leia, anakin, sheev];
        let playerChar = [];
        let enemyChars = [];

        //ROW TARGETS:
        let $topRow = $('.top-row');
        let $middleRow = $('.middle-row');
        let $bottomRow = $('.bottom-row');

        cardsToBoard(allChars, $topRow);

        //CLICK LISTENERS:
        $('.yoda').on('click', function () {
                let playerChar = [yoda];
                let enemyChars = [leia, anakin, sheev];
                clearRow($topRow);
                cardsToBoard(playerChar, $topRow);
                cardsToBoard(enemyChars, $middleRow);
                $('.yoda').addClass('selected');
        });

        $('.leia').on('click', function () {
                let playerChar = [leia];
                let enemyChars = [yoda, anakin, sheev];
                clearRow($topRow);
                cardsToBoard(playerChar, $topRow);
                cardsToBoard(enemyChars, $middleRow);
                $('.leia').addClass('selected');
        });

       $('.anakin').on('click', function () {
                let playerChar = [anakin];
                let enemyChars = [yoda, leia, sheev];
                clearRow($topRow);
                cardsToBoard(playerChar, $topRow);
                cardsToBoard(enemyChars, $middleRow);
                $('.anakin').addClass('selected');
        });

        $('.sheev').on('click', function () {
                let playerChar = [sheev];
                let enemyChars = [leia, anakin, yoda];
                clearRow($topRow);
                cardsToBoard(playerChar, $topRow);
                cardsToBoard(enemyChars, $middleRow);
                $('.sheev').addClass('selected');
        });
        

        


        //USE JQUERY TO BUILD PLAYER CARDS ON SCREEN USING CHARACTER INSTANCES:
        //BUILD A FOR LOOP (OR FOR EACH?) THAT WILL ACCESS allChars[i] AND PLACE THE CARDS ON PAGE:
        function clearRow(target) {
                target.empty();
        }

        function cardsToBoard(arr, target) {
                if (arr.length > 1) {
                        for (let i = 0; i < arr.length; i++) {
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
                } else {
                        let $playerCard = $('<div>').addClass('player-card ' + arr[0].className);
                        let $playerName = $('<div>').addClass('char-name').html(arr[0].name.toUpperCase());
                        let $playerImage = $('<img>').attr('src', arr[0].imageURL);
                        let $playerHP = $('<div>').addClass('hp').html(arr[0].HP + 'HP');

                        //PLACE PLAYER CARDS ATTRIBUTES ON CARD:
                        $playerCard.append($playerName);
                        $playerCard.append($playerImage);
                        $playerCard.append($playerHP);

                        //APPEND CARDS TO BOARD AT TARGET:
                        target.append($playerCard);
                }
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
                };
        }


}) /*END OF DOCUMENT.READY*/
