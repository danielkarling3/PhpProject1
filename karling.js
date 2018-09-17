//#################################################### FUNCAO GENERICA PARA ENVIR FORMULARIO POR POST COM JQUERY VERIFICANDO a lista de INPUTs OBRIGATORIOs
//os dados devem ser recebidos pelo NAME dos INPUT do form

//CHAMADA DA FUNCAO PARA ENVIOR FORMULARIO 
//<input type="button" onclick="enviarFormulario('myForm1', 'formulario.php', 'POST', []);" value="ok"/><br>
//<input type="button" onclick="enviarFormulario('myForm1', 'formulario.php', 'POST',['nome']);" value="ok verificando nome"/><br>
//<input type="button" onclick="enviarFormulario('myForm1', 'formulario.php', 'POST',['cpf']);" value="ok verificando cpf"/><br>
//<input type="button" onclick="enviarFormulario('myForm1', 'formulario.php', 'POST',['cpf', 'nome']);" value="ok verificando cpf e nome"/>

//enviarFormulario('idFormulario', 'urlEnvio','metodoEnvio',['name_input1','name_input2',...,'name_inputN'])
function enviarFormulario(idForm, url, metodo, obrigatorios) {
    //pega vetor com name e value em form
    erro = 0;
    vetorDados = $('#' + idForm).serializeArray();
    jQuery.each(vetorDados, function (i, vetorDados) {
        jQuery.each(obrigatorios, function (i, obrigatorios) {
            if ((vetorDados.name == obrigatorios) && (vetorDados.value == "") && (erro == 0)) {
                alert("Campo " + obrigatorios + " deve ser preenchido");
                erro = 1;
            }
        });
    });
    if (erro == 0) {
        $.ajax({
            type: '' + metodo,
            url: '' + url,
            //envia o vetor
            data: vetorDados
        }).done(function (data) {
            alert(data);
            return data
        });

    }
}

//enviarFormularioComMensagem('idFormulario', 'urlEnvio','metodoEnvio',['name_input1','name_input2',...,'name_inputN'], 'idDivAviso')
//div de aviso serve para imprimir mensagem de retorno Sucesso ou Erro
function enviarFormularioComMensagem(idForm, url, metodo, obrigatorios, idAviso) {
    //pega vetor com name e value em form
    erro = 0;
    vetorDados = $('#' + idForm).serializeArray();
    jQuery.each(vetorDados, function (i, vetorDados) {
        jQuery.each(obrigatorios, function (i, obrigatorios) {
            if ((vetorDados.name == obrigatorios) && (vetorDados.value == "") && (erro == 0)) {
                alert("Campo " + obrigatorios + " deve ser preenchido");
                erro = 1;
            }
        });
    });
    if (erro == 0) {
        $.ajax({
            type: '' + metodo,
            url: '' + url,
            //envia o vetor
            data: vetorDados,
            beforeSend: function () {
                $("#" + idAviso).removeClass();
                $("#" + idAviso).html('Enviando...');
            }
        }).done(function (data) {
            if ($.trim(data) == "Sucesso") {
                $("#" + idAviso).removeClass('alert-danger').addClass('alert-info');
                $("#" + idAviso).html(data);
                //subPainel(1);
            } else {
                $("#" + idAviso).removeClass('alert-info').addClass('alert-danger');
                $("#" + idAviso).html(data);
            }
        });

    }
}
//############################ funcao de filtro por AJAX
//OBS, a identificacao do valor passado para pagina php url deve ser 'filtro'
//buscaPorAjax(valor que vai ser usado na pesquisa, id do input cujo value sera alterado, o caminho do arquivo que vai processar o AJAX, metodo de envio)
function buscaPorAjax(valorFiltro, idAlvo, url, metodo) {
    $.ajax({
        type: '' + metodo,
        url: '' + url,
        data: {filtro: '' + valorFiltro}
    }).done(function (data) {
        $("#" + idAlvo).val(data);
    });

}

//########################## FUNCAO FILTRA, ASSIM COMO A ANTERIOR, MAS SUBSTITUI TODA  INFORMACAO DENTRO DO SELECT. 
//UTILIZA O .HTML() . LOGO, NA 'URL' DESTINO, DEVEM SER IMPRESSOS O VALORES OPTION 
function buscaSelectPorAjax(valorFiltro, idAlvo, url, metodo) {
    $.ajax({
        type: '' + metodo,
        url: '' + url,
        data: {filtro: '' + valorFiltro}
    }).done(function (data) {
        $("#" + idAlvo).html(data);
        $("#" + idAlvo).focus();

    });

}


//############ funcao para mostrar ou ocultar uma div
//mostrarDiv(#id da div 09 .class da div, 0 para ocultar e 1 para mostrar, tempo do efeito)
function mostrarDiv(idDiv, num, tempo) {
    if (num == 0) {
        $("" + idDiv).hide(tempo);
    } else {
        $("" + idDiv).show(tempo);
    }
}
//mostrarDiv(#id da div 09 .class da div, 0 para ocultar e 1 para mostrar, tempo do efeito)




