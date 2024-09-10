$(document).ready(function() {
    // Requisição GET quando a página é carregada
    $.get('https://roletahugo-b69e04045a85.herokuapp.com/valores', function(data) {
        console.log('Dados recebidos:', data);
        // Aqui você pode processar os dados recebidos e atualizar o array `items`
        // Exemplo de atualização, assumindo que a resposta seja um array de itens
        // items = data; // Atualize conforme a estrutura da resposta
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
const items = [
    ['Item 7', 10], // Peso alto para garantir maior chance de ser escolhido
    ['Item 14', 10],
    ['Item 17', 10],
];


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
