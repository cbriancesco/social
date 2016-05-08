/** GENERIC SLIDER
 * @return the init function to start the module.
 */
prodi.ui.slider = (function () {
    
    var slider = {
        sliderClass: '.slider',
        listClass: '.slider__list',
        itemClass: '.slider__item',
        hideButtons: false,
        pos: 1,
        ajaxLoad: false,
        ajaxFile: 'data/video-list.json',
        maintainAspectRatio: true,
        youtubeEnable: false,
        navNext: '<a class="slider__next-button slider__button" href="#" data-direction="next">></a>',
        navPrev: '<a class="slider__prev-button slider__button" href="#" data-direction="prev"><</a>'
    };

    function pauseVideo(pos){
        $('.slider__item:nth-child('+ pos +') iframe')[0].contentWindow.postMessage('{'+'"event":"command",'+'"func":"stopVideo"'+',"args":""}','*');
    }

    function getSlides(){
        // LOAD JSON CONTENT
        json = $.getJSON(slider.ajaxFile, function(data){
            slider.videos = data;
            for(var i = 0, max = data.length; i < max; i += 1){
                $(slider.listClass).append('<li class="slider__item"><iframe src="https://www.youtube.com/embed/'+ data[i].videoID +'?enablejsapi=1" frameborder="0" allowfullscreen"></iframe></li>');
            }
        }).done(function(data) {
            // slider local variables
            showThemAll();
            
        }).fail(function() {
            console.log( 'json data error' );
        });
    }

    function showThemAll(){
        slider.length = $(slider.itemClass).length;

        if(slider.length > 1){
            $(slider.sliderClass).append(slider.navPrev).append(slider.navNext);
            sliderButtons();
            getDots();
        }

        setSize();
    }

    function resize(){
        setSize();

        $(slider.listClass).animate({
            left: -(getSize().width * (slider.pos - 1)),
        }, 0);
    }

    // get slider horizontal size
    function getSize(){
        return {width: $(slider.sliderClass).outerWidth(), height: $(slider.sliderClass).outerHeight()};
    }

    // set slider list & items size
    function setSize() {

        $(slider.listClass).css({
            'width': getSize().width * slider.length,
            'background' : 'black'
        });

        $(slider.itemClass).css({
            'width': getSize().width
        });
    }

    function getDots(){
        var dotsList = '<ul class="dots-list"></ul>';

        $(slider.sliderClass).append(dotsList);
        
        for(var i=0, max = slider.length; i < max; i += 1){
            $('.dots-list').append('<li class="dots-item" data-pos="' + (i) + '"></li>');
        }

        dotNav();
    }

    function dotNav(){
        $('.dots-item').on('click', function(){
            $('.dots-item').removeClass('active');
            $(this).addClass('active');
            getDotPos($(this).data('pos'));
        });

        $('.dots-item:first-child').addClass('active');
    }


    // activates buttons
    function sliderButtons(){
        if(slider.hideButtons){
            $('.slider__button').addClass('auto-hide');
        }
        
        $('.slider__button').on('click', function(e){
            e.preventDefault();

            if ($(this).data('direction') === 'next'){
                getNext();
            }

            if ($(this).data('direction') === 'prev'){
                getPrev();
            }
        });

        swipeEvents();
    }


    function swipeEvents(){
        $(slider.sliderClass).on('swipeleft', function(){
            getNext();
        });

        $(slider.sliderClass).on('swiperight', function(){
            getPrev();
        });
    }


    // get next slide
    function getDotPos(pos){
        if(slider.youtubeEnable){
            pauseVideo(slider.pos);  
        }
        
        slider.pos = pos + 1;

        $(slider.listClass).animate({
            left: -(getSize().width * pos),
        }, 500);
    }


    // get next slide
    function getNext(){
        if(slider.pos < (slider.length)){
            if(slider.youtubeEnable){
                pauseVideo(slider.pos);  
            }
            slider.pos += 1;

            $(slider.listClass).animate({
                left: '-=' + getSize().width,
            }, 500);
            $('.dots-item.active').removeClass('active').next().addClass('active');
        }
    }


    // get previous slide
    function getPrev(){
        if(slider.pos > 1){
            if(slider.youtubeEnable){
                pauseVideo(slider.pos);  
            }
            slider.pos -= 1;

            $(slider.listClass).animate({
                left: '+=' + getSize().width,
            }, 500);
            $('.dots-item.active').removeClass('active').prev().addClass('active');
        }
    }


    // init slider functions
    function init() {
        // get the videos from the json filie
        if(slider.ajaxLoad){
            getSlides();
        } else {
            showThemAll();
        }

        // on resize will update size of the elements and position of the items
        if(slider.maintainAspectRatio){
            $(window).resize(function() {
                resize();
            });
        }
    }

    return {
        init: init
    };

})();
