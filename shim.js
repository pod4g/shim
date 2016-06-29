/**
 * ES5 & ES6 shim技术
 * Author  : liyanfeng
 * Date    : 2016-06-29
 * Email   : pod4dop@gmail.com
 * Licence : MIT
 * 
 * https://github.com/pod4g/shim
 */

 (function(root){
    
    'use strict';

    var arrayProto = Array.prototype;

    var slice = arrayProto.slice;

    var concat = arrayProto.concat;

    var push = arrayProto.push;

    var objectProto = Object.prototype;

    var toString = objectProto.toString;

    var hasOwn = objectProto.hasOwnProperty;

    var type = function( obj ){
        var t = typeof obj,s;
        if( obj == null ){
            return obj + '';
        }
        return t === 'object' ? toString.call(obj).slice(8,-1).toLowerCase() : t;
    };

    var IE = function(){
        if (window.VBArray) {
            // 能进到这里来，说明一定是IE
            // 取出IE的版本
            var mode = document.documentMode;
            // IE6、IE7 不支持documentMode，那就使用XMLHttpRequest，支持的就是IE7，否则就是IE6
            // 至于支持documentMode的IE，则直接return
            return mode ? mode : window.XMLHttpRequest ? 7 : 6;
        } else {
            return NaN;
        }
    };


    var hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString');
    var dontEnums = ['toString',
                     'toLocaleString',
                     'valueOf',
                     'hasOwnProperty',
                     'isPrototypeOf',
                     'propertyIsEnumerable',
                     'constructor'];
    var dontEnumsLength = dontEnums.length;        
    
    var isDev = false;

    var isFunction = function(fn){
        return type(fn) === 'function';
    }

    var notSupport = function(fn){
        if(isDev){
            return isFunction(fn);
        }else{
            return !isFunction(fn);
        }
    }

    // debugger;
    if(notSupport(Object.keys)){
        /**
         * [keys description]
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         * The Object.keys() method returns an array of a given object's own enumerable properties,
         * in the same order as that provided by a for...in loop (the difference being 
         * that a for-in loop enumerates properties in the prototype chain as well).
         */
        Object.keyss = function( obj ){

            console.log( obj );
            // debugger;
            var t =  type( obj );

            console.log(t);

            if( t !== 'object' && t !== 'function' ){
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [],prop,i = 0,every;

            for( prop in obj ){
                if( hasOwn.call( obj, prop ) ){
                    result.push( prop );
                }
            }

            if( hasDontEnumBug ){
                while( i < dontEnumsLength ){
                    every = dontEnums[ i++ ];
                    if( hasOwn.call( obj, every ) ){
                        result.push(every);
                    }
                }
            }

            return result;
        }

    }





 }(this));