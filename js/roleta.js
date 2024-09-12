const items = [
    ['Item 24', 900], // Peso alto para garantir maior chance de ser escolhido
    ['Item 14', 10],
    ['Item 17', 10],
];

let forcedItem = null; // Armazena o item forçado
let spinCount = 0; // Contador de tentativas

// Preenche a lista de opções do painel de configuração
function populateConfigOptions() {
    const select = $('#item-select');
    select.empty(); // Limpa as opções atuais
    items.forEach((item, index) => {
        select.append(`<option value="${index}">${item[0]}</option>`);
    });
}

// Abre o painel de configuração
$('#config-button').on('click', function() {
    populateConfigOptions();
    $('#config-panel').fadeIn();
});

// Fecha o painel de configuração
$('#close-config').on('click', function() {
    $('#config-panel').fadeOut();
});

// Salva a configuração e força o resultado
$('#save-config').on('click', function() {
    forcedItem = parseInt($('#item-select').val());
    alert(`O próximo resultado será: ${items[forcedItem][0]}`);
    $('#config-panel').fadeOut();
});

$('.div-roulette').on('click', function() { rodaARoda(); });

$(document).keypress(function(event) {
    if (event.charCode == 13 || event.charCode == 32) {
        rodaARoda();
    }
});

function rodaARoda() {
    if (!$('#roulette').hasClass('girando')) {
        let choosedIndex;

        // Incrementa o contador de tentativas
        spinCount++;

        // Se houver um item forçado, use-o, caso contrário, escolha aleatoriamente
        if (spinCount % 3 === 0) {
            choosedIndex = 0; // Força o "Item 05" (índice 0) na décima tentativa
      
        } else if (forcedItem !== null) {
            choosedIndex = forcedItem;
            forcedItem = null; // Reseta o item forçado após o uso
        } else {
            let weight = [];
            items.forEach((item, index) => {
                for (let i = 0; i < item[1]; i++) {
                    weight.push(index); // Usa o índice do item para referência
                }
            });
            choosedIndex = weight[Math.floor(Math.random() * weight.length)];
        }

        let choosedItem = items[choosedIndex][0]; // Obtém o nome do item escolhido

        $('#roulette').removeAttr('class');
        setTimeout(() => {
            document.getElementById("roleta-audio").play();
            $('#roulette').addClass(`number-${choosedIndex + 1}`).addClass('girando');
        }, 50);

        setTimeout(() => {
            $('#roulette').removeClass('girando');
            showNotification(choosedItem); // Mostra a notificação com o item escolhido
        }, 5000);
    }
}

function showNotification(item) {
    alert(`Você ganhou: ${item}`);
}
