// Função para buscar os valores da API e atualizar os itens
function atualizarItens() {
    $.get('https://roletahugo-b69e04045a85.herokuapp.com/valores', function(data) {
        const valores = data.valores[0];
        // Atualize a lista de itens com base nos valores retornados
        items = [
            ['Item 01', 10],
            ['Item 02', valores.valor2],
            ['Item 03', valores.valor3],
            ['Item 04', valores.valor4],
            ['Item 05', valores.valor5],
        ];
    });
}

// Função para iniciar a roleta
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

// Função para mostrar uma notificação com o item escolhido
function showNotification(item) {
    // Exemplo simples de notificação. Ajuste conforme necessário.
    alert(`Você ganhou: ${item}`);
}

// Atualiza os itens ao carregar a página
$(document).ready(function() {
    atualizarItens();
    $('.div-roulette').on('click', function() { rodaARoda(); });

    $(document).keypress(function(event) {
        if (event.charCode == 13 || event.charCode == 32) {
            rodaARoda();
        }
    });
});
