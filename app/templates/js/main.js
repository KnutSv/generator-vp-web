// Global variables attached to object namespace to avoid conflicts
// Remember to use CamelCase to name attributes
//
// var mainVars = {
//   exampleOption: 'example value'
// };
//
// Retrieve value like this:
// mainVars.exampleOption

var mainVars = {
  shareLink: '.js--share-link-popup'
};

// Enclosed function that prevents conflicts with the global namespace
// All variables used in the function need to be fed in through the last parenthesis
// and added to the function parameteres in the same order

(function($, mainVars) {
  'use strict';

  $(document).ready(function(){

    // Add code here that you want to run when the DOM is ready



    // SOCIAL MEDIA
    // Lauch share links in pop-up-window
    $( hihmVars.shareLink ).click( function( event ){
      event.preventDefault();
      window.open(
        $( this ).attr( 'href' ),
        'share-box__link',
        'width=626,height=436'
      );
    });

  });

})(jQuery, mainVars);


// Use code bellow to create a simple jQuery plugin
// Create code to run for each element match where options are kept separately for each instance
// Replace 'Example/mainExample ...' in the example with a more relevant name

// (function($, mainVars) {
//   'use strict';
  
//   function Example(el, options) {

//     // Bind element argument to object element
//     this.el = el;

//     // Extends defaults-options with user defined options
//     this.options = $.extend( this.defaults, options || {} );

//     // Let the fun begin!
//     this._init();
//   };

//   Example.prototype = {
//     // Default options
//     // Override in call "$(selector).example({option1: value1, option2: value2});" or "new mainExample($(selector),{option1: value1, option2: value2});"
//     defaults : {
//       //optionName: 'option value'
//     },

//     _init : function() {
//       // Var to keep tab this-reference
//       // Var shortcut to element
//       var example = this,
//           exampleElm = $(courseList.el);

//       // Add code to run on init
//       // Add and call additional methods to abstract code and make it more readable
//       // For example:
//       // example._otherMethod();
      
//     },
//     _otherMethod : function() {
//       var example = this;
      
//       // Add method code here
//       // Add as many other methods as necessary to keep code simple and efficient

//     }

//   };

//   // Add object to global namespace
//   // This makes it accessible outside the function
//   // We can prefix this value to prevent name conflicts
//   window.mainExample = Example;
// })(jQuery, mainVars);

// // Create a jquery method which creates a new mainExample object for each instance
// (function($) {
//   'use strict';

//   $.fn.example = function( options ) {
//     return this.each( function() {
//       new mainExample($(this), options);
//     });
//   };
// })(jQuery);

// // Call the function on one or more selectors
// $('.example').example();

// // You can also use the function without jQuery
// new mainExample( document.querySelector( '.example' ) );