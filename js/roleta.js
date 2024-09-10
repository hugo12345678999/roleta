const items = [
    ['Item 05', 1],
    ['Item 14', 1],
    ['Item 17', 1],
];

$('.div-roulette').on('click', function() { rodaARoda(); });

$(document).keypress(function(event) {
    if (event.charCode == 13 || event.charCode == 32) {
        rodaARoda();
    }
});

// Função para atualizar as probabilidades com base nos números recebidos
function atualizarProbabilidades(numeros) {
    // Zerar pesos existentes
    items.forEach(item => item[1] = 1);
    
    // Atualizar pesos com base nos números recebidos
    numeros.forEach(num => {
        if (num >= 1 && num <= items.length) {
            items[num - 1][1] += 10; // Ajuste o valor conforme necessário
        }
    });
}

// Adicionar evento para o botão invisível
$('#hidden-button').on('click', function() {
    $.get('/numeros', function(data) {
        // Espera-se que `data` seja um array de números recebidos
        atualizarProbabilidades(data);
    });
});

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
        }, 23000);
    }
}

function showNotification(item) {
    // Exemplo simples de notificação. Ajuste conforme necessário.
    alert(`Você ganhou: ${item}`);
}
