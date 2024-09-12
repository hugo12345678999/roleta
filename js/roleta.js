const items = [
    ['Item 01'],
    ['Item 02'],
    ['Item 03'],
    ['Item 04'],
    ['Item 05'],
    ['Item 06'],
    ['Item 07'],
    ['Item 08'],
    ['Item 09'],
    ['Item 10'],
    ['Item 11'],
    ['Item 12'],
    ['Item 13'],
    ['Item 14'],
    ['Item 15'],
    ['Item 16'],
    ['Item 17'],
    ['Item 18'],
    ['Item 19'],
    ['Item 20'],
    ['Item 21'],
    ['Item 22'],
    ['Item 23'],
    ['Item 24']
];

let forcedItem = null; // Armazena o item forçado
let spinCount = 0; // Contador de tentativas
let playCount = new Array(items.length).fill(0); // Contador de jogadas por item
let jogadasParaGanhar = new Array(items.length).fill(10); // Padrão de jogadas para ganhar cada item

// Função para atualizar os valores de jogadas para cada item
function updateJogadasConfig(data) {
    const valores = data.valores.find(v => v.id === "1"); // Busca o objeto com id "1"
    if (valores) {
        items.forEach((item, index) => {
            const itemKey = `item${index + 1}`; // Gera a chave, como "item1", "item2", etc.
            if (valores[itemKey]) {
                jogadasParaGanhar[index] = parseInt(valores[itemKey]); // Atualiza o número de jogadas necessárias
            }
        });
    }
}

// Função para fazer a requisição GET e obter os valores de jogadas
function fetchJogadasConfig() {
    $.ajax({
        url: 'https://roletahugo-b69e04045a85.herokuapp.com/valores',
        method: 'GET',
        success: function(response) {
            updateJogadasConfig(response); // Atualiza os valores após obter a resposta
            alert('Configurações de jogadas atualizadas com sucesso!');
        },
        error: function(error) {
            console.error('Erro ao buscar os valores:', error);
            alert('Erro ao buscar os valores.');
        }
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
        fetchJogadasConfig(); // Faz a requisição GET ao apertar 'T'
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
                choosedIndex = i; // Força o item que atingiu o número de jogadas
                playCount[i] = 0; // Reseta o contador de jogadas para esse item
                break;
            }
        }

        if (choosedIndex === undefined) {
            // Se não atingiu o número de jogadas, seleciona aleatoriamente
            choosedIndex = Math.floor(Math.random() * items.length);
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
        }, 23000);
    }
}

function showNotification(item) {
    alert(`Você ganhou: ${item}`);
}
