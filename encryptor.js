let method = 'cesar';

$('#cesar').click(function () {
    $(this).addClass('active');
    $('#mono').removeClass('active');
    $('#poli').removeClass('active');
    $('#lValue1').text('Spaces');
    method = 'cesar';
});

$('#mono').click(function () {
    $(this).addClass('active');
    $('#cesar').removeClass('active');
    $('#poli').removeClass('active');
    $('#lValue1').text('Key');
    method = 'mono';
});

$('#poli').click(function () {
    $(this).addClass('active');
    $('#mono').removeClass('active');
    $('#cesar').removeClass('active');
    $('#lValue1').text('Key');
    method = 'poli';
});

$('.send').click(function (ele) {

    if (validate()) {

        let value1 = $('#value1').val();
        let value2 = $('#value2').val();
        let radioValue = $("input[name='N']:checked").val();
        let type = $(this).text();
        let text = '';

        switch (method) {

            case 'cesar':
                text = 'Aun no esta implementado';
                break;

            case 'mono':
                text = monoEncryptor(radioValue, value1, value2, type);
                break;

            default://poli
                text = 'Aun no esta implementado';
                break;
        }

        $('#titleText').text('The encoded text is: ');
        $('#text').text(text);
    }
});

function validate() {

    let validation = true;

    $('.required').each(function () {

        if ($(this).val() == '') {

            swal({
                title: "",
                text: "El campo no puede estar vacio.",
                icon: "warning",
                dangerMode: true,
                buttons: { cancel: false, confirm: true, }
            }).then(() => { $(this).focus() });

            validation = false;
            return false;
        }
    })

    return validation;
}

function normalizeValue(type, value) {

    let data = [];

    if (type == 'withN') {
        value = value.toLowerCase().normalize('NFD').replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, '$1').normalize(); // delete diacriticos
        value = value.split('').filter((val) => /[a-zñ]/.test(val)).join(''); //only alphabet with ñ
        data['abc'] = 'abcdefghijklmnñopqrstuvwxyz';
    } else {
        value = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        value = value.split('').filter((val) => /[a-z]/.test(val)).join(''); //only alphabet without ñ
        data['abc'] = 'abcdefghijklmnopqrstuvwxyz';
    }

    value = value.split('').filter((val, idx, array) => array.indexOf(val) == idx).join(''); //returns the data where the character index corresponds to the index of the first coincidence
    data['key'] = value;
    data['lengthKey'] = value.length;

    return data;
}

function createAbc(data) {

    let regExp = new RegExp(`.{1,${data['lengthKey']}}`, 'g');
    let abc = data['key'] + data['abc'];
    abc = abc.split('').filter((val, idx, array) => array.indexOf(val) == idx).join('');

    let matrix = abc.match(regExp);
    let newAbc = '';

    for (i = 0; i < data['lengthKey']; i++) {

        matrix.forEach(function (element) {
            newAbc += (element[i] != undefined) ? element[i] : '';
        });
    }

    return newAbc;

}

function changeValues(abc, newAbc, text) {

    let charAbc = abc.split('');
    let charNewAbc = newAbc.split('');
    let regX = null;
    text = text.toLowerCase();
    let charText = text.split('');


    let newText = '';
    let index = null;

    charText.forEach(function (element) {
        index = charAbc.indexOf(element);
        newText += element.replace(charAbc[index], charNewAbc[index]);
    })

    return newText;
}

function monoEncryptor(radioValue, value1, value2, type) {

    let data = normalizeValue(radioValue, value1);
    let newAbc = createAbc(data);
    let text = (type == 'Encrypt') ? changeValues(data['abc'], newAbc, value2) : changeValues(newAbc, data['abc'], value2);

    return text;
}