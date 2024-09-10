const apiUrl = 'https://roletahugo-b69e04045a85.herokuapp.com/valores';

$('.div-roulette').on('click', function() {
    rodaARoda();
});

$(document).keypress(function(event) {
    if (event.charCode == 13 || event.charCode == 32) {
        rodaARoda();
    }
});

function rodaARoda() {
    if (!$('#roulette').hasClass('girando')) {
        $.get(apiUrl, function(data) {
            const valores = data.valores; // Obter os valores do retorno
            const items = Object.keys(valores).map((key) => {
                return [`Item ${valores[key]}`, 10]; // Atualiza o array items com o nome e peso fixo
            });

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
        }).fail(function() {
            console.error('Erro ao obter os valores.');
        });
    }
}

function showNotification(item) {
    // Exemplo simples de notificação. Ajuste conforme necessário.
    alert(`Você ganhou: ${item}`);
}
