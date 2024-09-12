const items = [
    ['Item 01', 1],
    ['Item 02', 1],
    ['Item 03', 1],
    ['Item 04', 1],
    ['Item 05', 1],
    ['Item 06', 1],
    ['Item 07', 1],
    ['Item 08', 1],
    ['Item 09', 1],
    ['Item 10', 1],
    ['Item 11', 1],
    ['Item 12', 1],
    ['Item 13', 1],
    ['Item 14', 1],
    ['Item 15', 1],
    ['Item 16', 1],
    ['Item 17', 1],
    ['Item 18', 1],
    ['Item 19', 1],
    ['Item 20', 1],
    ['Item 21', 1],
    ['Item 22', 1],
    ['Item 23', 1],
    ['Item 24', 1]
];

let forcedItem = null; // Armazena o item forçado
let spinCount = 0; // Contador de tentativas
let playCount = new Array(items.length).fill(0); // Contador de jogadas por item
let jogadasParaGanhar = new Array(items.length).fill(10); // Padrão de jogadas para ganhar cada item

// Função para atualizar os pesos dos itens
function updateItemWeights(data) {
    const valores = data.valores.find(v => v.id === "1"); // Busca o objeto com id "1"
    if (valores) {
        items.forEach((item, index) => {
            item[1] = parseInt(valores[`item${index + 1}`]); // Atualiza o peso de cada item
        });
    }
}

// Função para fazer a requisição GET e obter os valores
function fetchItemWeights() {
    $.ajax({
        url: 'https://roletahugo-b69e04045a85.herokuapp.com/valores',
        method: 'GET',
        success: function(response) {
            updateItemWeights(response); // Atualiza os pesos após obter a resposta
            alert('Pesos dos itens atualizados com sucesso!');
        },
        error: function(error) {
            console.error('Erro ao buscar os valores:', error);
            alert('Erro ao buscar os valores.');
        }
    });
}

// Preenche a lista de opções do painel de configuração
function populateConfigOptions() {
    const select = $('#item-select');
    select.empty();
    items.forEach((item, index) => {
        select.append(`<option value="${index}">${item[0]}</option>`);
    });
}

// Preenche o formulário de jogadas para ganhar
function populatePlayConfig() {
    const form = $('#play-form');
    form.empty();
    items.forEach((item, index) => {
        form.append(`
            <div>
                <label for="jogadas-item-${index}">${item[0]}: </label>
                <input type="number" id="jogadas-item-${index}" value="${jogadasParaGanhar[index]}" min="1">
            </div>
        `);
    });
}

// Abre o painel de configuração de jogadas e faz a requisição GET
$(document).keypress(function(event) {
    if (event.key === 't' || event.key === 'T') {
        fetchItemWeights(); // Faz a requisição GET ao apertar 'T'
        populatePlayConfig();
        $('#play-config-panel').fadeIn();
    }
});

// Fecha o painel de configuração de jogadas
$('#close-play-config').on('click', function() {
    $('#play-config-panel').fadeOut();
});

// Salva as configurações de jogadas
$('#save-play-config').on('click', function() {
    items.forEach((item, index) => {
        jogadasParaGanhar[index] = parseInt($(`#jogadas-item-${index}`).val());
    });
    alert('Configurações de jogadas salvas!');
    $('#play-config-panel').fadeOut();
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
        spinCount++;

        // Verifica se algum item atingiu o número de jogadas configurado
        for (let i = 0; i < playCount.length; i++) {
            if (playCount[i] >= jogadasParaGanhar[i]) {
                choosedIndex = i;
                playCount[i] = 0; // Reseta o contador do item após ele ser escolhido
                break;
            }
        }

        if (typeof choosedIndex === 'undefined') {
            // Se não houver item configurado, escolhe aleatoriamente
            if (forcedItem !== null) {
                choosedIndex = forcedItem;
                forcedItem = null; // Reseta o item forçado após o uso
            } else {
                let weight = [];
                items.forEach((item, index) => {
                    for (let i = 0; i < item[1]; i++) {
                        weight.push(index); // Usa o peso do item para determinar a chance de ser escolhido
                    }
                });
                choosedIndex = weight[Math.floor(Math.random() * weight.length)];
            }
        }

        // Incrementa o contador de jogadas para cada item
        playCount = playCount.map((count, index) => (index === choosedIndex ? 0 : count + 1));

        let choosedItem = items[choosedIndex][0];

        $('#roulette').removeAttr('class');
        setTimeout(() => {
            document.getElementById("roleta-audio").play();
            $('#roulette').addClass(`number-${choosedIndex + 1}`).addClass('girando');
        }, 50);

        setTimeout(() => {
            $('#roulette').removeClass('girando');
            showNotification(choosedItem);
        }, 23000);
    }
}

function showNotification(item) {
    alert(`Você ganhou: ${item}`);
}
