(async () => {
  const cardapio = await init();

  const date = document.getElementById('data');
  date.max = new Date().toISOString().split('T')[0];
  console.log(date);
  date.addEventListener('change', async event => {
    const dataPesquisa = event.target.value;
    const part = await getCardapio(dataPesquisa.toString());
    cardapio.innerHTML = part.innerHTML;
  });
})();

async function init() {
  const [dia, mes, ano] = new Date().toLocaleDateString().split('/');
  const dataPesquisa = `${ano}-${mes}-${dia}`;
  const cardapio = document.getElementById('cardapio');

  const part = await getCardapio(dataPesquisa);
  cardapio.innerHTML = part.innerHTML;
  return cardapio;
}

async function getCardapio(dataPesquisa) {
  const response = await fetch(`https://ru.alegre.ufes.br/cardapio/${dataPesquisa}`);
  const data = await response.text();
  const html = new DOMParser().parseFromString(data, 'text/html');
  const retorno = html.querySelector('.view-content');
  [...retorno.children].forEach(item => item.classList.add('lugar-cardapio'));
  return retorno;
}
