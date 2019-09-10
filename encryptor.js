$('#cesar').click(function () {
    $(this).addClass('active');
    $('#mono').removeClass('active');
    $('#poli').removeClass('active');
    $('#lValue1').text('Spaces');
});

$('#mono').click(function () {
    $(this).addClass('active');
    $('#cesar').removeClass('active');
    $('#poli').removeClass('active');
    $('#lValue1').text('Key');
});

$('#poli').click(function () {
    $(this).addClass('active');
    $('#mono').removeClass('active');
    $('#cesar').removeClass('active');
    $('#lValue1').text('Key');
});

$('#encrypt').click(function () {
    let value2 = $('#value2').val();
    value2 = value2.replace(/ /g, ''); //global replace
    value2 = value2.split('').filter((val, ind, array) => array.indexOf(val) == ind).join(''); //returns the data where the character index corresponds to the index of the first coincidence
$('#text').text(value2);
});

$('#decrypt').click(function () {

});