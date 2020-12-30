const region = document.querySelector('#region')
const options = {
  method: 'GET',
  module: 'cors',
  cache: 'default'
}

async function  fetchStates(region) {
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
  const myResponse = await fetch(url)
  const stateList = await myResponse.json()
  const arrayOfStates = Array.from(stateList)
  const onlyOne = arrayOfStates.filter( (state)=> state.nome == region)
  return onlyOne[0].sigla
}


async function  fetchCasos(state) {
  const url = `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${state.toLowerCase()}`
  const myResponse = await fetch(url,options)
  const casos = await myResponse.json()
  return casos
}


document.querySelector('button')
  .addEventListener('click', async (event) => {
    let regionToUrl = region.value
    let uf = await  fetchStates(regionToUrl)
    let dataState = await fetchCasos(uf)
    console.log(dataState);
  })