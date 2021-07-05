jQuery(document).ready(function($){
    //toggle  nac menu on button click
    var $root = $('html, body'),
        menu_toggle = $('.menu-toggle');

    menu_toggle.on('click', function() {
        var $this = $(this);

        $this.toggleClass('close');
        $('.menu, .menu-nav, .menu-nav-item').toggleClass('show');
    });
    //toggle nav menu on menu item click + smooth scrolling
    $('.menu-nav-item a').on('click', function() {
        var $this = $(this),
            href= $this.attr('href');

        //nav menu toggle
        menu_toggle.removeClass('close');
        $this.parents('.menu-nav-item, .menu-nav, .menu').removeClass('show');

        //smooth scroll
        $root.animate({
            scrollTop: $(href).offset().top - 100
        }, 500, function() {
            window.location.hash = href;
        });
        return false;
    });

    //attach a submit handler to the form 
    $(".contact-form").submit(function(event) {
        //stop normal submission
        event.preventDefault();
        //serialize submitted data and get action
        var $form = $(this);
        url = $form.attr("action");

        //send the data using POST
        var posting = $.post(url, $form.serialize());

        //put the results in a div
        posting.done(function(data) {
            var response = $.parseJSON(data),
                target = $('#status-messages');

            //add success/error messages
            if(response.status == 1) {
                target.removeClass('error');
                target.addClass('success');
            } else if(response.status == 0) {
                target.removeClass('success');
                target.addClass('error');
            }

            //append the message to the page
            target.empty().append(response.message).hide().fadeIn(400);
        });
    });
});
