
// 73 * 100 / 105

/**
 * @return the init function to start the module.
 */
prodi.ui.quizData = (function () {
    var quizData;
    var yesInt;
    var noInt;
    var freeButtons = true;

    function activateButtons(){
        $('.banner__button').on('click', function(e){
            e.preventDefault();
            
            if(freeButtons === true){
                var quiz = $(this).closest('.quiz').attr('id');
                var option = $(this).data('option');
                console.log(quiz + ' ' + option);

                // GO TO SEE THE DATA
                getData(quiz, option);
            }

            freeButtons = false;
        })
    }


    function getData(quiz, option){

        var jqxhr = $.getJSON('./data/data.json', function(data) {
            quizData = data;

            if(option){
                quizData[quiz].yes += 1;
            } else {
                quizData[quiz].no += 1;
            }
            
            saveData();

        }).done(function() {
            showResults(quiz, option);
        })
    }

    function showResults(quiz, option){
        var total = quizData[quiz].yes + quizData[quiz].no;
        var yes = Math.round((quizData[quiz].yes * 100) / total);
        var no = Math.round((quizData[quiz].no * 100) / total);
        var yesCur = 0;
        var noCur = 0;

        $('#' + quiz).addClass('answered');
        if(option){
            $('#' + quiz + ' .extra__text').addClass('visible');
        }

        yesInt = setInterval(function(){
            if(yesCur < yes){
                yesCur += 1;
                $('#' + quiz + ' .yes-bar .banner__quiz__value').text(yesCur + '%');
                $('#' + quiz + ' .yes-bar').css('width', yesCur+'%');
            } else {
                clearInterval(yesInt);
            }
        }, 10);


        noInt = setInterval(function(){
            if(noCur < no){
                noCur += 1;
                $('#' + quiz + ' .no-bar .banner__quiz__value').text(noCur + '%');
                $('#' + quiz + ' .no-bar').css('width', noCur+'%');
            } else {
                clearInterval(noInt);
            }
        }, 10);

        //console.log(quizData);

        reActiveButtons();
    }


    function reActiveButtons(){
        freeButtons = true;
        console.log('buttons free');
    }


    function saveData(){
        var data = new FormData();
        data.append("data" , JSON.stringify(quizData));
        //var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
        var xhr = new XMLHttpRequest();
        xhr.open( 'post', './data/quiz.php', true );
        xhr.send(data);
    }


    function init() {
        $.ajaxSetup({ cache: false });
        
        activateButtons();

        $('.test').on('click', function(){
            saveData();
        });
    }

    return {
        init: init
    };

})();
