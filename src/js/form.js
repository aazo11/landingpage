(function ($) {
    //bot checker
    const hiddenInput = $('input[name=bot_checker]');
    let key = Date.now().toString().slice(0, -3);
    setTimeout(function () {
        hiddenInput.val(key);
    }, 3000);

    //form
    $("#submit").click(function() {
        const email = $('input[name=email]').val();
        const key = $('input[name=bot_checker]').val();

        $.ajax({
            url: 'post.php',
            type: 'post',
            dataType: 'json',
            data: {
                'email': email,
                'key' : key
            },
            success: function(data){
                $('.form-error').remove();
                $.each(data.result, function( id, value ) {
                    if (id === 'success') {
                        $('.form').html('<div class="col-12 thank-you-message"><p class="text-bold">' + value + '</p><p class="text">You can contact us at <a href="mailto:hello@reconnectinglabs.com">hello@reconnectinglabs.com</a> if you need additional assistance</p></div>');
                    } else {
                        $('#' + id).before('<div class="form-error">' + value + '</div>');
                    }
                });
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log(errorThrown);
            }
        });
    });
})(jQuery);
