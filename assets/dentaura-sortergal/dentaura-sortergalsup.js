$(function() {
 
    $('.filter-button').on('click', function(e) {
        $('.btn.active').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
});