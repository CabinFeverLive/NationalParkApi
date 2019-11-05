'use strict'

const apiKey = 'MZmerdcgQ4JnrzQ0cS0MIrQhFsuHx6d1LT0rsIjW';
const searchUrl = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params){
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&')
}

function displayResults(responseJson){
  let resultsArray = responseJson.data
  let html =`
    <ul>
  `
    console.log(resultsArray)
  for (const repo of resultsArray){
      console.log(repo)
      html += `
        <li>
            <h3>${repo.fullName}</h3>
            <p>${repo.description}</p>
            <p>${repo.url}</p>
        </li>
      `
  }

    html += `</ul>`
  $('#searchResults').html(html)

}

function getNatParkResults(query, maxResults=10){
 const params = {
     api_key: apiKey,
     q: query,
     part: 'snippet',
     maxResults,
     type: ''
    };
        const queryString = formatQueryParams(params);
        console.log(queryString)
        const url = searchUrl + '?' + queryString;

        console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        displayResults(response)
    })
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getNatParkResults(searchTerm, maxResults);
  });
}

$(watchForm);