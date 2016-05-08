/**
 * @return the init function to start the module.
 */
prodi.ui.generic = (function () {
    function goTopButton(){
        $('#GoTop').on('click tap', function(){
            $('html, body').animate({
                scrollTop: 0
            }, 1000);
        });
    }

    function init() {
        goTopButton();

        if(prodi.ui.constants.OS() === 'Mac'){
            $('body').addClass('mac');
        }
    }

    return {
        init: init
    };

})();
