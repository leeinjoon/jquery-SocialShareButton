/* ====================================
 SNS： TwitterとFacebookのシェアボタン
       https://twitter.com/intent/tweet?url=&original_referer=
       https://www.facebook.com/share.php
 =====================================*/
 (function( $ ){

   var methods = {

     init : function( options ) {

       return this.on( 'click', options, methods.shareEvent );

     },

     shareEvent : function( e ) {

       e.preventDefault();

       w  = ( ! e.data.w ) ?  w = "width=" + 560 : w = "width=" + e.data.w;
       h  = ( ! e.data.h ) ?  h = "height=" + 450 : h = "height=" + e.data.h;
       t  = ( ! e.data.tag ) ?  tag = "" : tag = e.data.tag;

       var resultUrl,
           pageUrl = window.location.href,
           metaTwitterUrl = $('meta[name="twitter:url"]').attr('content'),
           metaTwitterDescription = $('meta[name="twitter:description"]').attr('content'),
           metaTwitterSite = $('meta[name="twitter:site"]').attr('content').replace('@', '');
           metaOgUrl = $('meta[property="og:url"]').attr('content');

       var snsObj = {
             twitterLink  : 'https://twitter.com/share?',
             facebookLink : 'https://www.facebook.com/share.php?'
           }

       switch (e.data.sns) {

          case 'twitter':
              if( ! metaOgUrl ) {	metaOgUrl = pageUrl; }
              resultUrl = snsObj.twitterLink +
                         'url=' + encodeURIComponent(metaTwitterUrl) +
                         '&text=' + encodeURIComponent(metaTwitterDescription) +
                         '&original_referer=' + encodeURIComponent(metaOgUrl) +
                         '&via=' + encodeURIComponent(metaTwitterSite) +
                         '&hashtags=' + encodeURIComponent(tag);
            　window.open(resultUrl, 'window', w + ',' + h + ',' + 'personalbar=0, toolbar=0, scrollbars=1, resizable=1');
              break;

          case 'facebook' :
              if( ! metaOgUrl ) {	metaOgUrl = pageUrl; }
              resultUrl = snsObj.facebookLink +
                          'u=' + encodeURIComponent(metaOgUrl);
              window.open(resultUrl, 'window', w + ',' + h + ',' + 'personalbar=0, toolbar=0, scrollbars=1, resizable=1');
              break;

       }
     }

   };

   $.fn.shareButton = function( method ) {

     if ( methods[method] ) {
       return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
     } else if ( typeof method === 'object' || ! method ) {
       return methods.init.apply( this, arguments );
     } else {
       $.error( 'Method ' +  method + ' does not exist on jQuery.shareButton' );
     }

   };

})( jQuery );
