async function converter() {
  const valor = parseFloat(document.getElementById("valor").value);
  const moeda = document.getElementById("moeda").value;
  const resultado = document.getElementById("resultado");

  if (isNaN(valor) || valor <= 0) {
    resultado.textContent = "Digite um valor válido!";
    return;
  }

  const access_key = "ac039828696a0865d678da7c1d6afd06";
  
  // Coloque todas as moedas possíveis aqui
  const moedasSuportadas = "BRL,USD,EUR,GBP,JPY,AUD,CAD";

  const url = `http://data.fixer.io/api/latest?access_key=${access_key}&symbols=${moedasSuportadas}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.success) {
      resultado.textContent = "Erro na API: " + data.error.info;
      return;
    }

    const taxaBRL = data.rates.BRL;
    const taxaMoeda = data.rates[moeda];

    if (!taxaBRL || !taxaMoeda) {
      resultado.textContent = "Moeda não suportada pela API.";
      return;
    }

    const valorEUR = valor / taxaBRL;
    const valorConvertido = valorEUR * taxaMoeda;

    resultado.textContent = `${valor.toFixed(2)} BRL = ${valorConvertido.toFixed(2)} ${moeda}`;
  } catch (error) {
    resultado.textContent = "Erro ao acessar a API.";
    console.error(error);
  }
}
