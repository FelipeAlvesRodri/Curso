class CalculadoraTarifas:
    @staticmethod
    def calcular_tarifa_base():
        return 5  # Tarifa base de R$ 5 para todas as contas

    @staticmethod
    def calcular_tarifa_transacao(numero_transacoes):
        if numero_transacoes > 10:
            return (numero_transacoes - 10) * 1.5  # R$ 1,50 por transação adicional
        else:
            return 0

    @staticmethod
    def calcular_tarifa_saldo(saldo):
        if saldo < 1000:
            return 10  # Tarifa de R$ 10 para saldos abaixo de R$ 1000
        else:
            return 0


class ContaBancaria:
    def __init__(self, numero_conta, saldo=0, numero_transacoes=0):
        self.__numero_conta = numero_conta  # Encapsulamento
        self.__saldo = saldo  # Encapsulamento
        self.__numero_transacoes = numero_transacoes  # Encapsulamento

    # Getters para acessar os atributos encapsulados
    def get_numero_conta(self):
        return self.__numero_conta

    def get_saldo(self):
        return self.__saldo

    def get_numero_transacoes(self):
        return self.__numero_transacoes

    # Métodos para modificar os valores encapsulados
    def depositar(self, valor):
        self.__saldo += valor
        self.__numero_transacoes += 1

    def sacar(self, valor):
        if valor <= self.__saldo:
            self.__saldo -= valor
            self.__numero_transacoes += 1
        else:
            print("Saldo insuficiente.")

    def calcular_tarifa(self):
        tarifa_base = CalculadoraTarifas.calcular_tarifa_base()
        tarifa_transacao = CalculadoraTarifas.calcular_tarifa_transacao(self.__numero_transacoes)
        tarifa_saldo = CalculadoraTarifas.calcular_tarifa_saldo(self.__saldo)
        return tarifa_base + tarifa_transacao + tarifa_saldo


# Conta universitária com tarifa gratuita
class ContaUniversitaria(ContaBancaria):
    def calcular_tarifa(self):
        return 0  # Conta universitária não paga tarifas


# Exemplo de uso
conta_comum = ContaBancaria(numero_conta=123, saldo=800, numero_transacoes=12)
conta_comum.depositar(200)
print(f"Tarifa da conta comum: R${conta_comum.calcular_tarifa()}")

conta_uni = ContaUniversitaria(numero_conta=456, saldo=500, numero_transacoes=5)
conta_uni.depositar(100)
print(f"Tarifa da conta universitária: R${conta_uni.calcular_tarifa()}")
