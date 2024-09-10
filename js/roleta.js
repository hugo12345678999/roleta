$(document).ready(function() {
    // Requisição GET quando a página é carregada
    $.get('https://roletahugo-b69e04045a85.herokuapp.com/valores', function(data) {
        console.log('Dados recebidos:', data);
        // Atualize o array `items` com base nos valores recebidos
        updateItems(data.valores[0]);
    }).fail(function() {
        console.error('Erro ao carregar dados da API.');
    });

    // Evento de clique na div-roulette
    $('.div-roulette').on('click', function() { rodaARoda(); });

    // Evento de tecla pressionada
    $(document).keypress(function(event) {
        if (event.charCode == 13 || event.charCode == 32) {
            rodaARoda();
        }
    });
});

let items = []; // Inicialmente vazio, será preenchido pela API

function updateItems(data) {
    items = [];
    const itemCounts = {};

    // Contabiliza quantas vezes cada item aparece
    ['valor1', 'valor2', 'valor3', 'valor4', 'valor5'].forEach(key => {
        const itemNumber = data[key];
        if (itemNumber) {
            if (!itemCounts[itemNumber]) {
                itemCounts[itemNumber] = 0;
            }
            itemCounts[itemNumber]++;
        }
    });

    // Constrói o array `items` com base nas contagens
    for (let itemNumber in itemCounts) {
        items.push([`Item ${itemNumber}`, itemCounts[itemNumber]]);
    }
}

function rodaARoda() {
    if (!$('#roulette').hasClass('girando')) {
        let weight = [];
        items.forEach((item, index) => {
            for (let i = 0; i < item[1]; i++) {
                weight.push(index); // Usa o índice do item para referência
            }
        });

        let choosedIndex = weight[Math.floor(Math.random() * weight.length)];
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
    // Exemplo simples de notificação. Ajuste conforme necessário.
    alert(`Você ganhou: ${item}`);
}
