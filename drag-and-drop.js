$(document).ready(function () {

    // menu a tendina
    $("li.dropdown").on("click", function () {
        // crea o rimuove la class attiva dall'ul 
        if ($(this).next("ul.dropdown-content").hasClass("active")) {
            $(this).next("ul.dropdown-content").removeClass("active")
        } else {
            $("ul.dropdown-content").removeClass("active")
            $("ul.dropdown-content").slideUp()
            $(this).next("ul.dropdown-content").addClass("active")
        }

        // slide toogle animazione
        $(this).next("ul.dropdown-content").slideToggle(400);
        // cambia immagine freccia
        if (!$(this).children().children(".arrow").hasClass("rotated")) {
            $(this).children().children(".arrow").addClass("rotated")
        } else {
            $(this).children().children(".arrow").removeClass("rotated")
        }

        return false
    });

    // click 3 puntini per creare menu item
    $(".dropdown-content").on("click", ".dots", function () {
        $($(this).parent().next()).css({ "visibility": "visible" })
        // toglie il sortable
        $(".dropdown-content").sortable("destroy");
        $(".dropdown-content li").removeClass('ui-state-default');
        $(".menu-item, .menu-item-folder").mouseleave(function () {
            $(".menu-item, .menu-item-folder").css({ "visibility": "hidden" })
            $(".dropdown-content, .folder-content").sortable({ // torna sortable
                revert: true
            });
        });
        $(".menu-item li, .menu-item-folder li").click(function () {
            $(".dropdown-content, .folder-content").sortable({ // torna sortable anche dopo il click
                revert: true
            });
        });

        return false
    });

    // menu a tendina CARTELLA
    $("ul").on("click", ".folder", function () {
        // aggiunge o rimuove classe attiva 
        // if ($(this).children(".folder-content").hasClass("active")) {
        //     $(this).children(".folder-content").removeClass("active")
        // } else {
        //     $(this).children(".folder-content").addClass("active")
        // }
        $(this).children(".folder-content").slideToggle(400);
        // TODO modificare icona cartella
        return false
    });

    // sortable
    $(".dropdown-content, .folder-content").sortable({
        connectWith: ".connectedSortable", 
        revert: true
    }).disableSelection();

    // ricerca
    $("#management-bar > input").on("keyup", function () {
        var value = $.trim($(this).val().toLowerCase());
        $("ul.dropdown-content > li, ul.dropdown-showAlways > li, .folder-content > li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            $(this).parent().css({ "display": "block" })
            $(this).parent().css({ "display": "block" })
            if ($("#management-bar > input").val().length == 0) {
                $("ul.dropdown-content").css({ "display": "none" })
            }
        });
    });

    // creare cartella
    $(".new-folder").click(function () {
        $("ul").find(".dropdown-content.active").append('<li class="folder"><a href="#"><img src="./source/Icon awesome-folder-open.svg" alt="immagine cartella aperta" width="16" height="16">Nuova Cartella<img src="./source/3-dots-horizontal-svgrepo-com.svg" alt="immagine 3 puntini" width="18" height="18" class="dots"></a><div class="menu-item-folder"><ul><li><a href="#">Copia in<img src="./source/right-arrow-svgrepo-com.svg" alt="immagine freccia destra" width="12" height="12" class="arrow-right"></a></li><hr><li><a href="#">Nuova cartella</a></li><hr><li class="rename"><a href="#">Rinomina</a></li><hr><li class="delete-element"><a href="#">Elimina</a></li></ul></div><ul class="folder-content connectedSortable"><li><a href="#"><img src="./source/Icon ionic-ios-videocam.svg" alt="immagine videocamera2" width="16" height="16">Sottocontenuto<img src="./source/3-dots-horizontal-svgrepo-com.svg" alt="immagine 3 puntini" width="18" height="18" class="dots"></a><div class="menu-item"><ul><li class="open-element"><a href="#">Apri</a></li><hr><li><a href="#">Copia in<img src="./source/right-arrow-svgrepo-com.svg" alt="immagine freccia destra" width="12" height="12" class="arrow-right"></a></li><hr><li class="show-info"><a href="#">Info</a></li><hr><li class="delete-element"><a href="#">Elimina</a></li></ul></div></li>')
    
        return false;
    })

    // elimina elemento
    $(".dropdown-content").on("click", ".delete-element", function () {
        $(this).parent().parent().parent().remove()

        return false
    })

    $(".dropdown-content").on("click", ".show-info", function () {
        alert("Mostra info")

        return false
    });


    $(".dropdown-content").on("click", ".open-element", function () {
        alert("Apri elemento")

        return false
    });

    // rename cartella
    $(".dropdown-content").on("click", ".rename", function () {
        // alert("Rinomina")
        console.log($(this).parent().parent().parent().children("a"))

        // $(this).parent().parent().parent().children().remove("a")
        // mostra input text per rinominare la cartella
        $(this).parent().parent().parent().children("a").html('<img src="./source/Icon awesome-folder-open.svg" alt="immagine cartella aperta" width="16" height="16"><input type"text"></input><img src="./source/3-dots-horizontal-svgrepo-com.svg" alt="immagine 3 puntini" class="dots" width="18" height="18">')
        $(this).parent().parent().parent().children("a").addClass("toModify")
        $("ul").off("click", ".folder") // rimuove il click event handlers
        $(".folder a > input").focus() // focus on input text
        // chiude il menù
        $(".menu-item, .menu-item-folder").css({ "visibility": "hidden" })
        $(".dropdown-content, .folder-content").sortable({
            revert: true
        });

        // quando viene premuto invio viene chiusa l'input text field e viene rinominata la cartella
        $(document).keypress(function (e) {
            if (e.which == 13) {
                var newNameFolder = $("a.toModify > input").val()
                $("a.toModify").html('<img src="./source/Icon awesome-folder-open.svg" alt="immagine cartella aperta" width="16" height="16">' + newNameFolder + '<img src="./source/3-dots-horizontal-svgrepo-com.svg" alt="immagine 3 puntini" width="18" height="18" class="dots">')
                $("a.toModify").removeClass("toModify")
                return false
            }
        });


        $(document).click(function () {
            if (!$('a.toModify').is(":focus")) {
                var newNameFolder = $("a.toModify > input").val()
                $("a.toModify").html('<img src="./source/Icon awesome-folder-open.svg" alt="immagine cartella aperta" width="16" height="16">' + newNameFolder + '<img src="./source/3-dots-horizontal-svgrepo-com.svg" alt="immagine 3 puntini" width="18" height="18" class="dots">')
                $("a.toModify").removeClass("toModify")
                return false
            }
        });

        return false
    });
});