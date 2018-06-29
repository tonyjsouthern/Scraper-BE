let value;

let results = {
  site: '',
  actOn: '',
  clickDimensions: '',
  google: '',
  marketo: '',
  pardot: '',
  sf: ''
}

$('.submit').on("click", function () {
  value = $('.input').val();
  scriptCheck(value)
console.log("running")
})


function scriptCheck (url) {
  axios.post('https://powerful-island-56445.herokuapp.com/single-domain/', {
  domain: url
})
.then(function (response) {
  return responseHandler(response);
})
}

function responseHandler (response) {
  var data                = response.data;
  results.site            = data.site;
  results.actOn           = data.actOn;
  results.clickDimensions = data.clickDimensions;
  results.google          = data.google;
  results.marketo         = data.marketo;
  results.pardot          = data.pardot;
  results.sf              = data.sf;
  console.log(results)
  $('.results-cont').removeClass("hidden")
  $('.results-cont').html(htmlTemplate())
}

function htmlTemplate () {
  return `
    <div class="results">
    <p class="title is-4">Website: ${results.site}</p>
    <p><span class="is-bold">Act-On:</span> ${results.actOn}</p>
    <p><span class="is-bold">Click Dimensions:</span> ${results.clickDimensions}</p>
    <p><span class="is-bold">Google:</span> ${results.google}</p>
    <p><span class="is-bold">Marketo:</span> ${results.marketo}</p>
    <p><span class="is-bold">Pardot:</span> ${results.pardot}</p>
    <p><span class="is-bold">Salesfusion:</span> ${results.sf}</p>
  `
}
// http://iheartcamo.com
