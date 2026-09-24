print("======================================")
print("       CALCULADORA DE MATRIZES")
print("======================================")

def converter_valor(valor):
    if "/" in valor:
        numerador, denominador = valor.split("/")
        return float(numerador) / float(denominador)
    else:
        return float(valor)

def criar_matriz(nome):
    linhas = int(input(f"\nDigite o número de linhas da matriz {nome}: "))
    colunas = int(input(f"Digite o número de colunas da matriz {nome}: "))

    matriz = []

    print(f"\nDigite os valores da matriz {nome}:")
    
    for i in range(linhas):
        linha = []

        for j in range(colunas):
            entrada = input(f"Digite o valor [{i+1}][{j+1}]: ")
            valor = converter_valor(entrada)
            linha.append(valor)
        matriz.append(linha)

    return matriz

def mostrar_matriz(matriz):
    for linha in matriz:
        for valor in linha:
            print(f"{valor:g}", end="\t")
        print()

def soma(A, B):
    resultado = []

    for i in range(len(A)):
        linha = []
        for j in range(len(A[0])):
            linha.append(A[i][j] + B[i][j])
        resultado.append(linha)
    return resultado

def subtracao(A, B):
    resultado = []

    for i in range(len(A)):
        linha = []
        for j in range(len(A[0])):
            linha.append(A[i][j] - B[i][j])
        resultado.append(linha)
    return resultado

def multiplicacao(A, B):
    resultado = []

    for i in range(len(A)):
        linha = []
        for j in range(len(B[0])):
            soma = 0
            for k in range(len(B)):
                soma += A[i][k] * B[k][j]
            linha.append(soma)
        resultado.append(linha)
    return resultado

def multiplicacao_escalar(A, escalar):
    resultado = []
    for i in range(len(A)):
        linha = []
        for j in range(len(A[0])):
            linha.append(A[i][j] * escalar)
        resultado.append(linha)
    return resultado

A = criar_matriz("A")
B = criar_matriz("B")

print("\n======================================")
print("MATRIZ A")
print("======================================")
mostrar_matriz(A)

print("\n======================================")
print("MATRIZ B")
print("======================================")
mostrar_matriz(B)

print("\nOrdem da matriz A:", len(A), "x", len(A[0]))
print("Ordem da matriz B:", len(B), "x", len(B[0]))

while True:

    print("\n======================================")
    print("             OPERAÇÕES")
    print("======================================")
    print("1 - Soma (A + B)")
    print("2 - Subtração (A - B)")
    print("3 - Multiplicação (A x B)")
    print("4 - Multiplicação de A por escalar")
    print("5 - Multiplicação de B por escalar")
    print("6 - Sair")
    print("======================================")

    opcao = int(input("Escolha uma opção: "))

    if opcao == 1:

        if len(A) == len(B) and len(A[0]) == len(B[0]):

            resultado = soma(A, B)

            print("\nResultado de A + B:")
            mostrar_matriz(resultado)

        else:
            print("\nNão é possível realizar a soma.")
            print("As matrizes precisam ter a mesma ordem.")

    elif opcao == 2:

        if len(A) == len(B) and len(A[0]) == len(B[0]):

            resultado = subtracao(A, B)

            print("\nResultado de A - B:")
            mostrar_matriz(resultado)

        else:
            print("\nNão é possível realizar a subtração.")
            print("As matrizes precisam ter a mesma ordem.")

    elif opcao == 3:

        if len(A[0]) == len(B):

            resultado = multiplicacao(A, B)
            print("\nResultado de A x B:")
            mostrar_matriz(resultado)
        else:
            print("\nNão é possível realizar a multiplicação.")
            print("O número de colunas da matriz A")
            print("deve ser igual ao número de linhas da matriz B.")
    elif opcao == 4:

        escalar = float(input("\nDigite o valor do escalar: "))

        resultado = multiplicacao_escalar(A, escalar)

        print("\nResultado de A x", escalar, ":")
        mostrar_matriz(resultado)

    elif opcao == 5:

        escalar = float(input("\nDigite o valor do escalar: "))

        resultado = multiplicacao_escalar(B, escalar)

        print("\nResultado de B x", escalar, ":")
        mostrar_matriz(resultado)

    elif opcao == 6:

        print("\nPrograma encerrado.")
        break
    else:
        print("\nOpção inválida!")
