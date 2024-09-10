$(document).ready(function() {
    // Requisição GET quando a página é carregada
    $.get('https://roletahugo-b69e04045a85.herokuapp.com/valores', function(data) {
        console.log('Dados recebidos:', data);
        // Atualiza os itens com os valores recebidos
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

let items = [];

function updateItems(valores) {
    // Armazenando cada valor em uma variável correspondente de item1 a item23
    let item1 = valores.item1;
    let item2 = valores.item2;
    let item3 = valores.item3;
    let item4 = valores.item4;
    let item5 = valores.item5;
    let item6 = valores.item6;
    let item7 = valores.item7;
    let item8 = valores.item8;
    let item9 = valores.item9;
    let item10 = valores.item10;
    let item11 = valores.item11;
    let item12 = valores.item12;
    let item13 = valores.item13;
    let item14 = valores.item14;
    let item15 = valores.item15;
    let item16 = valores.item16;
    let item17 = valores.item17;
    let item18 = valores.item18;
    let item19 = valores.item19;
    let item20 = valores.item20;
    let item21 = valores.item21;
    let item22 = valores.item22;
    let item23 = valores.item23;

    // Atualizando o array de itens com os valores recebidos e pesos
    items = [
        ['Item 1', item1], // Peso alto para garantir maior chance de ser escolhido
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
