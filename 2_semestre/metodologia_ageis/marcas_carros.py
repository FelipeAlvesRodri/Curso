# Criando a classe carros para poder puxar os dados dela

class Carros:
    def __init__(self, marca,ano,modelo,cor,preço):
        self.marca = marca
        self.ano = ano
        self.modelo = modelo
        self.cor = cor
        self.preço = preço
 #Puxando as informações
    def get_marca(self):
        return self.marca
    def get_ano(self):
        return self.ano
    def get_modelo(self):
        return self.modelo
    def get_cor(self):
        return self.cor
    def get_preço(self):
        return self.preço

    def set_novamarca(self,nova_marca):
        self.marca = nova_marca
    def set_ano(self,ano_novo):
        self.ano = ano_novo
    def set_modelo(self, novo_modelo):
        self.modelo = novo_modelo
    def set_cor(self, nova_cor):
        self.cor = nova_cor
    def set_preço(self, novo_preço):
        self.preço = novo_preço
    
# Defindo as variaveis
ano = int(input("Qual o ano da seu carro? "))
marca = input("Qual a marca do seu carro? ")
modelo = input("Qual o modelo do seu carro? ")
cor = input("Qual a cor do seu carro? ")
preço = float(input("Qual o preço do seu carro? "))
carro = Carros(marca,ano,modelo,cor,preço)

#Puxando as informações
print(f"O carro é {carro.get_marca()} e o ano é {carro.get_ano()}")
print(f"O modelo do carro é {carro.get_modelo()} e a cor é {carro.get_cor()}, além do preço ser {carro.get_preço()}")

#Alterando as informações
carro.set_novamarca("Fiat")
carro.set_ano(2020)
carro.set_modelo("Fiat Uno")
carro.set_cor("Azul")
carro.set_preço(20000.0)

#Puxando as informações
print(f"O carro é {carro.get_marca()} e o ano é {carro.get_ano()}")
print(f"O modelo do carro é {carro.get_modelo()} da cor {carro.get_cor()}")
print(f"O preço do carro foi de {carro.get_preço()}")