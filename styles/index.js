



$('#slide-point1').on('click', function () {
    $('#point1').show();
    $(this).hide();
})

$('#slide-point2').on('click', function () {
    $('.slide').hide();
    $('#point1').show();
})








$('#show').on('click', function () {
    $('.center').show();
    $(this).hide();
})

$('#close').on('click', function () {
    $('.center').hide();
    $('#show').show();
})
