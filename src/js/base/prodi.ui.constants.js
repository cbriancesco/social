var prodi = prodi || {ui:{}};
$.mobile.ajaxEnabled=false;
$.mobile.loading().hide();


/**
 * Constants used in all prodi.ui modules.
 * @type {Object}
 */
prodi.ui.constants = {
    TABLET_MAX_SIZE: 1024,
    TABLET_MIN_SIZE: 916,

    MOBILE_MAX_SIZE: 915,

    ACTIVE_CLASS: 'active',
    HIDE_CLASS: 'hide',
    LOADER_CLASS: 'loader',
    OS : function(){
        var os =  navigator.appVersion;

        if(os.indexOf('Mac') > 0){
            return 'Mac';
        } else if(os.indexOf('Win') > 0){
            return 'Win';
        } else {
            return os;
        }
    }
};


prodi.ui.constants.DEVICE = function(){
    var size = $(window).outerWidth(true);

    // DESKTOP
    if(size > this.TABLET_MAX_SIZE){
        return 'desktop';
    // TABLET
    } else if(size <= this.TABLET_MAX_SIZE && size > this.MOBILE_MAX_SIZE){
        return 'tablet';
    // MOBILE
    } else if(size <= this.MOBILE_MAX_SIZE){
        return 'mobile';
    }
}


document.addEventListener( 'DOMContentLoaded', function () {
    var keys = Object.keys(prodi.ui);
    for(var i = 1, max = keys.length; i < max; i+=1){
        // if 'autoInit' is declared on false will not load the module
        if(prodi.ui[keys[i]].autoInit || prodi.ui[keys[i]].autoInit === undefined){
            prodi.ui[keys[i]].init();
        }
    }
}, false );