// bind da variável region com o input box
const region = document.querySelector('#region')

// opções para configuração do fetch que irá consultar a API
const options = {
      method: 'GET',
      module: 'cors',
      cache: 'default'
    }


// função para levar os dados para o doc html
async function mostraDados(numerosCovid) {
    document.getElementById("death").innerText = numerosCovid.deaths || "N/A"
    document.getElementById("cures").innerText = numerosCovid.cures || "N/A"
    document.getElementById("cases").innerText = numerosCovid.cases || "N/A"
    document.getElementById("sicks").innerText = numerosCovid.sick || "N/A"
    document.getElementById("uptodate").innerText = numerosCovid.datetime || "N/A"

}
//  função para obter a sigla de um estado a partir de seu nome
async function  fetchStates(aState) {
  // monta a url para buscar a lista de todos os estados
  const wurl = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
  // faz a consulta propriamente dita 
  const myResponse = await fetch(wurl,options)
  // converte a resposta para JSON
  const stateList = await myResponse.json()
  //  converte a lista de estados em um array
  const arrayOfStates = Array.from(stateList)
  // encontra o estado com aquele nome 
  const onlyOne = arrayOfStates.find( 
    // converte tudo para maiúsculas para a busca bater
      (est)=> est.nome.toUpperCase() == aState.toUpperCase()
    ) 
  // retorna a sigla do estado 
  return onlyOne.sigla
}


// função que busca os dados de casos dada a sigla do estado
async function  fetchCasos(umEstado) {
  // monta a url com a sigla usada como parâmetro 
  const wurl = `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${umEstado.toLowerCase()}`
  const myResponse = await fetch(wurl,options)
  // converte os dados recebidos para formato JSON
  const casos = await myResponse.json()
  // retorna os dados daquele estado
  return casos
}

// observe que a função usada para fiscar o evento click do botão é ASYNC 
document.querySelector('button')
  .addEventListener('click', async (event) => {
    // busca a sigla do estado, dado o nome 
    let uf = await  fetchStates(state.value)
    // busca os dados de covid19 dado a sigla da UF
    let dadosEstado = await fetchCasos(uf)
    // apresenta os dados no painel
    await mostraDados(dadosEstado)
  })
