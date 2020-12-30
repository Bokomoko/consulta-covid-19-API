// bind da variável region com o input box
const region = document.querySelector('#region')

// opções para configuração do fetch que irá consultar a API
const options = {
      method: 'GET',
      module: 'cors',
      cache: 'default'
    }

//  função para retornar nome do estado com properCase
async function  fetchStates(aState) {
  // monta a url para buscar 
  const wurl = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
  // faz a consulta propriamente dita 
  const myResponse = await fetch(wurl,options)
  // converte a resposta para JSON
  const stateList = await myResponse.json()
  const arrayOfStates = Array.from(stateList)
  const onlyOne = arrayOfStates.find( 
      (est)=> est.nome.toUpperCase() == aState.toUpperCase()
    ) 
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


document.querySelector('button')
  .addEventListener('click', async (event) => {
    // busca a sigla do estado, dado o nome 
    let uf = await  fetchStates(state.value)
    // busca os dados de covid19 dado a sigla da UF
    let dadosEstado = await fetchCasos(uf)
    // apresenta os dados no painel
    document.getElementById("death").innerText = dadosEstado.deaths || "N/A"
    document.getElementById("cures").innerText = dadosEstado.cures || "N/A"
    document.getElementById("cases").innerText = dadosEstado.cases || "N/A"
    document.getElementById("sicks").innerText = dadosEstado.sick || "N/A"
    document.getElementById("uptodate").innerText = dadosEstado.datetime || "N/A"


  })
