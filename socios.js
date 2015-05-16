jQuery(document).ready(function() {
	$("#tabs").tabs();

	$.getJSON("json/noticias.json").done(function(data) {
		showMsg(data,"#tabs-1");	
	});

    $.getJSON("json/update.json").done(function(data) {
        $("<p>").text("Tienes "+data.length+" noticias nuevas").prependTo("#tabs-1").click(function() {
            showMsg(data, "#tabs-1");
            $(this).hide();
        });
    });

    $("#enviados").click(function() {
        $("#tabs-2").empty();
        $.getJSON("json/enviados.json").done(function(data) {
            showMsg(data,"#tabs-2");    
        }).fail(function(){ 
            $("<p>").text("No has publicado aún, anímate!").prependTo("#tabs-2");
        });
    });

    var i = 0;
	function showMsg(data, etiq) {
    	$.each(data, function(x, item) {
    		$("<div>").attr({class: "noticia", id: "Msg"+i}).prependTo(etiq);
    		$("<img>").attr("src", item["avatar"]).appendTo("#Msg"+i);
    		$("<p>").text("De: "+item["autor"]).appendTo("#Msg"+i);
    		$("<p>").text("Titulo: "+item["titulo"]).appendTo("#Msg"+i);
    		$("<button>").attr("class","ui-state-default ui-corner-all").text("Más").appendTo("#Msg"+i)
    		.click(function() {
    			if($(this).text() == "Más") {
    				$("<p>").attr("id","contenido").text(item["contenido"]).insertBefore(this);
    				$(this).text("Cerrar");
    			} else {
    				$("#contenido").remove();
    				$(this).text("Más");
    			}
    		});
            i+=1;
		});
	}

});

