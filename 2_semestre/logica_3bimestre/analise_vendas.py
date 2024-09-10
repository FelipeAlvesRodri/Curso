# Lista de vendas de cada produto
vendas = {
    "Kawasaki": [100, 150, 200, 250, 300, 350],
    "Ferrari": [200, 180, 160, 140, 120, 100],
    "Bis": [50,  200, 70, 60, 70, 80],
    "Porshe": [300, 310, 320, 330, 340, 350],
}

# Inicializa listas para armazenar os resultados
aumentando = []
diminuindo = []

# Laço para iterar sobre cada produto e suas vendas
for produto, vendas_mensais in vendas.items():
    aumento_continuo = True
    queda_continua = True

    # Laço para comparar as vendas mês a mês
    for i in range(1, len(vendas_mensais)):
        if vendas_mensais[i] <= vendas_mensais[i - 1]:
            aumento_continuo = False
        if vendas_mensais[i] >= vendas_mensais[i - 1]:
            queda_continua = False

    # Identifica a tendência e armazena nos resultados
    if aumento_continuo:
        aumentando.append(produto)
    elif queda_continua:
        diminuindo.append(produto)

# Exibe os resultados
print("Produtos com aumento contínuo nas vendas:", aumentando)
print("Produtos com queda contínua nas vendas:", diminuindo)
