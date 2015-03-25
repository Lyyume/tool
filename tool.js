var tool = function(){

    var public = {

        deBounce: function (fn,delay) {
            var timer = null;
            return function(){
                var context = this, args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function(){
                    fn.apply(context, args);
                }, delay);
            };
        },

        renderStyle: function(ele,css,num){
            num = num || false;
            if(num){
                return +window.getComputedStyle(ele,null)[css+''].match(/\d*/)[0];
            }
            else{
                return window.getComputedStyle(ele,null)[css+'']
            }
        },

        getImgSize: function(src,fn){
            var img = new Image(),
                height ,width;
            img.src = '../' + src;
            var check = function(){
                console.log('width:' + img.width + ',height:' + img.height);
                if(img.width>0 || img.height>0){
                    height = img.height;
                    width = img.width;
                    clearInterval(set);
                    fn(width,height);
                }
            };
            var set = setInterval(check,40);
        },

        touchWP: function(ele,type,fn,phase,del){
            del = del || false;
            function toWP(type){
                switch (type){
                    case 'touchstart':
                        return 'MSPointerDown';
                    case 'touchmove':
                        return 'MSPointerMove';
                    case 'touchend':
                        return 'MSPointerUp';
                }
                return '';
            }

            if(del){
                if (window.navigator.msPointerEnabled) {
                    ele.removeEventListener(toWP(type),fn,phase)
                }
                else {
                    ele.removeEventListener(type,fn,phase)
                }
            }
            else{
                if (window.navigator.msPointerEnabled) {
                    ele.addEventListener(toWP(type),fn,phase)
                }
                else {
                    ele.addEventListener(type,fn,phase)
                }
            }
        },

        cssAniEvent: function(ele,type,fn){
            ele.addEventListener('webkit' + type ,fn ,false);
            ele.addEventListener(type.toLowerCase() ,fn ,false)
        }
    };

    return public

}();