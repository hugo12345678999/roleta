$(document).ready(function() {
    // Requisição GET quando a página é carregada
    $.get('https://roletahugo-b69e04045a85.herokuapp.com/valores', function(data) {
        console.log('Dados recebidos:', data);

        // Verifica se a resposta contém o array `valores` e que ele tem itens
        if (data && data.valores && data.valores.length > 0) {
            updateItems(data.valores[0]); // Atualiza com o primeiro conjunto de valores
        } else {
            console.error('Estrutura de dados inesperada ou dados ausentes.');
            alert('Erro ao carregar dados. Estrutura inesperada ou dados ausentes.');
        }
    }).fail(function() {
        console.error('Erro ao carregar dados da API.');
        alert('Erro ao carregar dados da API.');
        updateItems(data.valores[0]); // Atualiza com o primeiro conjunto de valores
    });

    // Evento de clique na div-roulette
    $('.div-roulette').on('click', function() {
        rodaARoda();
    });

    // Evento de tecla pressionada
    $(document).keypress(function(event) {
        if (event.charCode == 13 || event.charCode == 32) {
            rodaARoda();
        }
    });
});

let items = [];

function updateItems(valores) {
    console.log('Atualizando itens com os valores:', valores);

    // Verifica se todos os valores existem antes de tentar atribuí-los
    let item1 = valores.item1 || 0;
    let item2 = valores.item2 || 0;
    let item3 = valores.item3 || 0;
    let item4 = valores.item4 || 0;
    let item5 = valores.item5 || 0;
    let item6 = valores.item6 || 0;
    let item7 = valores.item7 || 0;
    let item8 = valores.item8 || 0;
    let item9 = valores.item9 || 0;
    let item10 = valores.item10 || 0;
    let item11 = valores.item11 || 0;
    let item12 = valores.item12 || 0;
    let item13 = valores.item13 || 0;
    let item14 = valores.item14 || 0;
    let item15 = valores.item15 || 0;
    let item16 = valores.item16 || 0;
    let item17 = valores.item17 || 0;
    let item18 = valores.item18 || 0;
    let item19 = valores.item19 || 0;
    let item20 = valores.item20 || 0;
    let item21 = valores.item21 || 0;
    let item22 = valores.item22 || 0;
    let item23 = valores.item23 || 0;

    // Atualizando o array de itens com os valores recebidos e pesos
    items = [
        ['Item 1', item1],
        ['Item 2', item2],
        ['Item 3', item3],
        ['Item 4', item4],
        ['Item 5', item5],
        ['Item 6', item6],
        ['Item 7', item7],
        ['Item 8', item8],
        ['Item 9', item9],
        ['Item 10', item10],
        ['Item 11', item11],
        ['Item 12', item12],
        ['Item 13', item13],
        ['Item 14', item14],
        ['Item 15', item15],
        ['Item 16', item16],
        ['Item 17', item17],
        ['Item 18', item18],
        ['Item 19', item19],
        ['Item 20', item20],
        ['Item 21', item21],
        ['Item 22', item22],
        ['Item 23', item23],
    ];

    console.log('Itens atualizados:', items);

    // Exibir uma notificação quando os valores forem atualizados
    alert('Os valores dos itens foram atualizados!');
}

function rodaARoda() {
    if (!$('#roulette').hasClass('girando') && items.length > 0) {
        let weight = [];
        items.forEach((item, index) => {
            for (let i = 0; i < item[1]; i++) {
                weight.push(index); // Usa o índice do item para referência
            }
        });

        if (weight.length === 0) {
            alert('Nenhum item disponível para ser sorteado.');
            return;
        }

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
