(function (doc) {


    function checkValidity() {
        telefono = $('#telefonoLlamar').val();
        if (telefono) {
            check01 = true;
        } else {
            check01 = false;
            $('.errorbox .telefono').css('display', 'block');
        }
        if ($('#checkAceptollamadas').is(":checked")) {
            check02 = true;
        } else {
            check02 = false;
            $('.errorbox .terminos').css('display', 'block');
        }
        if (check01 && check02) {
            check03 = true;
        } else {
            check03 = false;
        };
        return check03;
    };

    $(document).ready(function () {
        $('#telefonoLlamar').change(function () {
            $('.errorbox .telefono').css('display', 'none');
        });
        $('#checkAceptollamadas').change(function () {
            $('.errorbox .terminos').css('display', 'none');
        });

        $("#form-llamar").submit(function (event) {
            event.preventDefault();
            checkValidity();
            if (checkValidity()) {
                event.preventDefault();
                var teleContacto = $("#telefonoLlamar").val();

                var laurl = window.location.href;
                var slug = laurl.match(/[^/]*(?=(\/)?$)/)[0];

                var serie = JSON.stringify({ numero: teleContacto });
                console.log(serie);
                $.ajax({
                    type: "POST",
                    url: 'https://so05.kerberusipbx.com:625/api/v0.1/callback',
                    headers: {
                        'authorization': 'AAAA-SO',
                        'Content-Type': 'application/json'
                    },
                    dataType: 'json',
                    data: serie,
                    processData: false,
                    success: function (msg) {
                        console.log(msg)
                        window.location = '/gracias';
                        //  $("#results").append("The result =" + StringifyPretty(msg));
                    }
                });

            } else {
                event.preventDefault();
            }
        });


        $("#form-llamarlo").click(function (event) {
            event.preventDefault();
            checkValidity();
            if (checkValidity()) {
                event.preventDefault();
                
                var teleContacto = $("#telefonoLlamar").val();
               
                console.log("telefono: " + teleContacto);

                var laurl = window.location.href;
                var slug = laurl.match(/[^/]*(?=(\/)?$)/)[0];

                var serie = JSON.stringify({ numero: teleContacto });
                console.log(serie);
                $.ajax({
                    type: "POST",
                    url: 'https://so05.kerberusipbx.com:625/api/v0.1/callback',
                    headers: {
                        'authorization': 'AAAA-SO',
                        'Content-Type': 'application/json'
                    },
                    dataType: 'json',
                    data: serie,
                    processData: false,
                    success: function (msg) {
                        console.log(msg)
                        window.location = '/gracias';
                        //  $("#results").append("The result =" + StringifyPretty(msg));
                    }
                });

            } else {
                event.preventDefault();
            }
        });
        document.addEventListener( 'wpcf7submit', function( event ) {
            var teleContacto = $("#Telefono").val();
               
                console.log("Telefono: " + teleContacto);

                var laurl = window.location.href;
                var slug = laurl.match(/[^/]*(?=(\/)?$)/)[0];

                var serie = JSON.stringify({ numero: teleContacto });
                console.log(serie);
                $.ajax({
                    type: "POST",
                    url: 'https://so05.kerberusipbx.com:625/api/v0.1/callback',
                    headers: {
                        'authorization': 'AAAA-SO',
                        'Content-Type': 'application/json'
                    },
                    dataType: 'json',
                    data: serie,
                    processData: false,
                    success: function (msg) {
                        console.log(msg)
                    }
                });
        }, false );

        
    });
    
    $(document).ready(function () {

    });
    


})(document);

function openModal(modal) {
    $(".boxTeLlamamos").empty();
    //return false // →→ Desactivado
    var modalDOM = $(modal);
    modalDOM.fadeIn();
    $('.modal__back').fadeIn();
}
function closeModal() {
    $('.modal').fadeOut();
    $('.modal__back').fadeOut();
    location.reload();
}
function openModalx(modal) {
    var modalDOM = $(modal);
    modalDOM.fadeIn();
    $('.modal__backx').fadeIn();
}
function closeModalx() {
    $('.modal--usodatos').fadeOut();
    $('.modal__backx').fadeOut();
}
$(document).ready(function () {

});

