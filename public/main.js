let value;

let results = {
  site: '',
  actOn: '',
  clickDimensions: '',
  google: '',
  marketo: '',
  pardot: '',
  sf: '',
  hubspot: ''
}

$('.submit').on("click", function () {
  value = $('.input').val();
  scriptCheck(value)
})

$('form').submit(function (evt) {
   evt.preventDefault(); //prevents the default action
});

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
  results.hubspot         = data.hubspot;
  $('.results-cont').html(htmlTemplate())
  checkTf();
}

function checkTf () {
 $('.tf').each(function (){
   if($(this).text() == 'true') {
     $(this).addClass('true')
   }else{
     $(this).addClass('false')
   }
 })
}

function htmlTemplate () {
  return `
    <div class="results">
    <p class="title is-4">Website: ${results.site}</p>
    <div class="companies">
      <p class="margin-bot"><span class="is-bold">Act-On:</span></p>
      <p class="margin-bot"><span class="is-bold">Click Dimensions: </span></p>
      <p class="margin-bot"><span class="is-bold">Google:</span></p>
      <p class="margin-bot"><span class="is-bold">Marketo:</span></p>
      <p class="margin-bot"><span class="is-bold">Pardot:</span></p>
      <p class="margin-bot"><span class="is-bold">Salesfusion:</span></p>
      <p class="margin-bot"><span class="is-bold">Hubspot:</span></p>
    </div>

    <div class="values-cont">
      <p class="tf">${results.actOn}</p>
      <p class="tf">${results.clickDimensions}</p>
      <p class="tf">${results.google}</p>
      <p class="tf">${results.marketo}</p>
      <p class="tf">${results.pardot}</p>
      <p class="tf">${results.sf}</p>
      <p class="tf">${results.hubspot}</p>
    </div>

    </div>
  `
}
// http://iheartcamo.com


// FAQ activation

$('.faq').on("click", function () {
  $('.modal').addClass("is-active");
})

$('.modal-background').on("click", function () {
  $('.modal').removeClass("is-active");
})

$('.delete').on("click", function () {
  $('.modal').removeClass("is-active");
})
