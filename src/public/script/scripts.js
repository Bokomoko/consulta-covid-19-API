const region = document.querySelector('#region')

function ufLocate(region) {

}

document.querySelector('button')
  .addEventListener('click', event => {
    let regionToUrl = region.value.replace(" ", "").toLocaleLowerCase()
    let uf = ufLocate(regionToUrl)
    const options = {
      method: 'GET',
      module: 'cors',
      cache: 'default'
    }
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`, options)
      .then(response => {
        response.json()
          .then(data=> console.log(data))
      })
      .catch(event => console.log('error'))
    // fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${uf}`, options)
    //   .then(response => {
    //     return response.json()
    //       .then(data => {
    //         console.log(data);
    //       })
    //   })
    //   .catch(event => console.log('error'))
  })