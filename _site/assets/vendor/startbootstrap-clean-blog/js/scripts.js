/*!
* Start Bootstrap - Clean Blog v5.1.0 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
(function ($) {
    "use strict"; // Start of use strict

    // Floating label headings for the contact form
    $("body").on("input propertychange", ".floating-label-form-group", function (e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function () {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function () {
        $(this).removeClass("floating-label-form-group-with-focus");
    });

    // Show the navbar when the page is scrolled up
    var MQL = 992;

    if ($(window).width() > MQL) {
        $('#logo-aerix-black').removeClass('is-logo-visible');
        $('#logo-aerix-white').addClass('is-logo-visible');
    }
    if ($(window).width() < MQL) {
        $('#logo-aerix-white').removeClass('is-logo-visible');
        $('#logo-aerix-black').addClass('is-logo-visible');
    }

    $(window).resize(function() {
        if ($(window).width() > MQL) {
            $('#logo-aerix-black').removeClass('is-logo-visible');
            $('#logo-aerix-white').addClass('is-logo-visible');
        }
        if ($(window).width() < MQL) {
            $('#logo-aerix-white').removeClass('is-logo-visible');
            $('#logo-aerix-black').addClass('is-logo-visible');
        }
     });

    //primary navigation slide-in effect
        var headerHeight = $('#mainNav').height();
        $(window).on('scroll', {
                previousTop: 0
            },
            function () {
                if ($(window).width() > MQL) {
                var currentTop = $(window).scrollTop();
                //check if user is scrolling up
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('#mainNav').hasClass('is-fixed')) {
                        $('#mainNav').addClass('is-visible');
                    } else {
                        $('#logo-aerix-white').addClass('is-logo-visible');
                        $('#logo-aerix-black').removeClass('is-logo-visible');
                        $('#mainNav').removeClass('is-visible is-fixed');
                    }
                } else if (currentTop > this.previousTop) {
                    //if scrolling down...
                    // $('#mainNav').removeClass('is-visible');
                    $('#logo-aerix-white').removeClass('is-logo-visible');
                    $('#logo-aerix-black').addClass('is-logo-visible');
                    if (currentTop > headerHeight && !$('#mainNav').hasClass('is-fixed')) $('#mainNav').addClass('is-fixed is-visible');
                }
                this.previousTop = currentTop;
            }});

})(jQuery); // End of use strict