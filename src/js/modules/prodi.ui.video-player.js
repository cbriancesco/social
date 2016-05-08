/**
 * @return the init function to start the module.
 */

function onYouTubePlayerAPIReady() {
    prodi.ui.videoPlayer.init();
}

prodi.ui.videoPlayer = (function () {

    var player;

    // Inject YouTube API script
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



    function onPlayerReady(event) {

        // bind events
        var playButton = document.querySelector('.play-button');
        
        playButton.addEventListener("click", function() {
            player.playVideo();
        });

    }

    function showVideo(){
        console.log('show video');
        $('.video__player__video').addClass('video-on');
    }

    function hideVideo(){
        console.log('hide video');
        $('.video__player__video').removeClass('video-on');
    }

    function onPlayerStateChange(event){
        if(event.data === 1 || event.data === 3){
            $('.video__player__video').addClass('video-on');
        } else {
            $('.video__player__video').removeClass('video-on');
        }
    }
    
    function init() {
        player = new YT.Player('video', {
            events: {
                // call this function when player is ready to use
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    return {
        init: init
    };

})();