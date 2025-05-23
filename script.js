async function converter() {
  const valor = parseFloat(document.getElementById("valor").value);
  const moeda = document.getElementById("moeda").value;
  const resultado = document.getElementById("resultado");

  if (isNaN(valor) || valor <= 0) {
    resultado.textContent = "Digite um valor válido!";
    return;
  }

  try {
    const url = `https://api.exchangerate.host/latest?base=BRL&symbols=${moeda}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data || !data.rates || !data.rates[moeda]) {
      resultado.textContent = "Moeda não suportada.";
      return;
    }

    const taxa = data.rates[moeda];
    const valorConvertido = valor * taxa;

    resultado.textContent = `${valor.toFixed(2)} BRL = ${valorConvertido.toFixed(2)} ${moeda}`;
  } catch (error) {
    resultado.textContent = "Erro ao acessar a API.";
    console.error(error);
  }
}
