(function ($) {
    $.extend({
        //
        //
        /**
         * Convenience function for getScript without cache (Uses $.ajax() which allows for disabling cache)
         *
         * @usage $.getScriptCached( "blah.js" ).done(function( script, textStatus ) {console.log( textStatus );});
         *
         * @param url
         * @param options
         */
        getScriptCached: function( url, options ) {
            // Allow setting of any option except for dataType, cache, and url
            options = $.extend( options || {}, {
                dataType: "script",
                cache: true
            });

            var urls = [];
            var deferred = [];
            var i = 0;

            //handle single scripts, or an array of scripts
            if (typeof url === "string") {
                urls.push(url);
            } else {
                urls = url;
            }

            var length = urls.length;

            for ( ; i < length; i++ ) {
                options.url = urls[i];
                deferred.push($.ajax( options ));
            }

            // Return the jqXHR object so we can chain callbacks
            return $.when.apply( null, deferred );
        },

        /**
         * Load styles and script only when an element exists in html that requires it
         * note triggerElement can be an element, or a boolean (if true it will load script)
         *
         * @param parts object {triggerElement string|boolean, stylesheets array, scripts array}
         * @returns promise
         */
        loadOnDemand: function (parts) {
            if (!typeof parts === "object") {
                return;
            }

            if (typeof parts.triggerElement !== "undefined") {
                //console.log('loadOnDemand: %cElement does not exist:', 'color: orange', parts.triggerElement);
                //return immediately REJECTED promise (fail)
                if (typeof parts.triggerElement === "string" && !$(parts.triggerElement).length) {
                    return $.Deferred().reject('NO-ELEMENT').promise();
                } else if (typeof parts.triggerElement === "boolean" && !parts.triggerElement) {
                    return $.Deferred().reject('NO-VAR').promise();
                }
            }

            //console.log('loadOnDemand: %cElement exists:', 'color: lime', parts.triggerElement);

            if (parts.stylesheets && parts.stylesheets.length) {
                var length = parts.stylesheets.length;
                var i = 0;

                for ( ; i < length; i++ ) {
                    $('head').append('<link rel="stylesheet" type="text/css" href="' + parts.stylesheets[i] + '" />');
                }
            }

            if (parts.scripts && parts.scripts.length) {
                return $.getScriptCached(parts.scripts).done(function( script, textStatus ) {
                    //console.log( 'script loaded...', script, textStatus );
                });
            } else {
                //return immediately RESOLVED promise (done)
                return $.Deferred().resolve('NO-SCRIPTS').promise();
            }
        }
    });
})(jQuery);
