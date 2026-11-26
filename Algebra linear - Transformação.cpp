#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

const int N = 5;  // número de funcionários

// Matriz da transformação linear T(x, y) = A * [x y]^T
const long long A[2][2] = {
    {  2, 1 },
    { -1, 3 }
};

long long mdc(long long a, long long b) {
    if (a < 0) a = -a;
    if (b < 0) b = -b;
    while (b != 0) {
        long long t = a % b;
        a = b;
        b = t;
    }
    return a;
}

// Número racional exato (evita erros de arredondamento nas contas)
struct Fracao {
    long long num, den;

    Fracao(long long n = 0, long long d = 1) {
        if (d < 0) { n = -n; d = -d; }
        long long g = mdc(n, d);
        if (g == 0) g = 1;
        num = n / g;
        den = d / g;
    }

    double valor() const { return (double)num / (double)den; }

    string texto() const {
        if (den == 1) return to_string(num);
        return to_string(num) + "/" + to_string(den);
    }
};

Fracao operator+(const Fracao& a, const Fracao& b) {
    return Fracao(a.num * b.den + b.num * a.den, a.den * b.den);
}

Fracao operator*(long long k, const Fracao& a) {
    return Fracao(k * a.num, a.den);
}

Fracao operator/(const Fracao& a, const Fracao& b) {
    return Fracao(a.num * b.den, a.den * b.num);
}

// Lê um decimal como "2.5", "2,5", "-3" ou ".75" e converte para fração exata
bool lerDecimal(const string& s, Fracao& r) {
    size_t i = 0;
    bool negativo = false;
    if (i < s.size() && (s[i] == '+' || s[i] == '-')) {
        negativo = (s[i] == '-');
        i++;
    }

    long long num = 0, den = 1;
    int digitos = 0;
    bool viuPonto = false;

    for (; i < s.size(); i++) {
        char c = s[i];
        if (c == '.' || c == ',') {
            if (viuPonto) return false;
            viuPonto = true;
        } else if (c >= '0' && c <= '9') {
            if (++digitos > 15) return false;  // evita estouro
            num = num * 10 + (c - '0');
            if (viuPonto) den *= 10;
        } else {
            return false;
        }
    }
    if (digitos == 0) return false;

    r = Fracao(negativo ? -num : num, den);
    return true;
}

// Aceita decimal ("2.5", "2,5") ou fração ("3/4", "-1/2", "0.5/2")
bool lerNumero(const string& entrada, Fracao& r) {
    string s;
    for (char c : entrada)
        if (c != ' ' && c != '\t') s += c;  // remove espaços

    size_t barra = s.find('/');
    if (barra == string::npos) return lerDecimal(s, r);

    Fracao n, d;
    if (!lerDecimal(s.substr(0, barra), n)) return false;
    if (!lerDecimal(s.substr(barra + 1), d)) return false;
    if (d.num == 0) return false;  // divisão por zero

    r = n / d;
    return true;
}

Fracao pedirValor(const string& rotulo) {
    Fracao v;
    string linha;
    while (true) {
        cout << "  " << rotulo << ": ";
        getline(cin, linha);
        if (lerNumero(linha, v)) return v;
        cout << "  Valor invalido! Use decimal (2.5 ou 2,5) ou fracao (3/4).\n";
    }
}

void mostrar(const Fracao& f) {
    cout << f.texto() << " (" << f.valor() << ")";
}

int main() {
    // 2) Dados armazenados em vetores
    Fracao x[N], y[N];    // valores originais (produtividade, qualidade)
    Fracao tx[N], ty[N];  // valores transformados

    cout << fixed << setprecision(4);

    // 1) Cadastro dos indicadores dos cinco funcionários
    cout << "=== Cadastro de indicadores ===\n";
    cout << "(aceita decimais como 2.5 ou 2,5 e fracoes como 3/4)\n";
    for (int i = 0; i < N; i++) {
        cout << "\nFuncionario " << i + 1 << ":\n";
        x[i] = pedirValor("Produtividade (x)");
        y[i] = pedirValor("Qualidade     (y)");
    }

    // 3) Aplicação da transformação linear em cada funcionário
    for (int i = 0; i < N; i++) {
        tx[i] = A[0][0] * x[i] + A[0][1] * y[i];  //  2x + 1y
        ty[i] = A[1][0] * x[i] + A[1][1] * y[i];  // -1x + 3y
    }

    // 4) Resultados individuais
    cout << "\n=== Resultados individuais ===\n";
    for (int i = 0; i < N; i++) {
        cout << "\nFuncionario " << i + 1 << ":\n";
        cout << "  Original:     (";
        mostrar(x[i]); cout << ", "; mostrar(y[i]); cout << ")\n";
        cout << "  Transformado: (";
        mostrar(tx[i]); cout << ", "; mostrar(ty[i]); cout << ")\n";
    }

    // 5) Médias dos valores originais e transformados
    Fracao somaX, somaY, somaTX, somaTY;
    for (int i = 0; i < N; i++) {
        somaX  = somaX  + x[i];
        somaY  = somaY  + y[i];
        somaTX = somaTX + tx[i];
        somaTY = somaTY + ty[i];
    }
    Fracao n(N);

    cout << "\n=== Medias ===\n";
    cout << "Originais:\n";
    cout << "  x = "; mostrar(somaX / n);  cout << "\n";
    cout << "  y = "; mostrar(somaY / n);  cout << "\n";
    cout << "Transformados:\n";
    cout << "  x = "; mostrar(somaTX / n); cout << "\n";
    cout << "  y = "; mostrar(somaTY / n); cout << "\n";

    return 0;
}
