let results = {
  site: '',
  actOn: '',
  clickDimensions: '',
  google: '',
  marketo: '',
  pardot: '',
  sf: '',
  hubspot: '',
  googleTag: '',
}

$('.submit').on("click", function() {
  let url = $('.input').val();
  if (url.indexOf("https") != -1) {
    var adjUrl = "http" + url.slice(5)
    scriptCheck(adjUrl);
  } else if (url.indexOf("http") != -1) {
    scriptCheck(url);
  } else {
    var adjUrl = "http://" + url
    scriptCheck(adjUrl)
  }
})

$('form').submit(function(evt) {
  evt.preventDefault(); //prevents the default action
});

function scriptCheck(url) {
  axios.post('https://powerful-island-56445.herokuapp.com/single-domain/', {
      domain: url
    })
    .catch(function (error) {
    // handle error
      alert(error);
    })
    .then(function(response) {
      return responseHandler(response);
    })
}

function responseHandler(response) {
  var data = response.data;
  results.site = data.site;
  results.actOn = data.actOn;
  results.clickDimensions = data.clickDimensions;
  results.google = data.google;
  results.marketo = data.marketo;
  results.pardot = data.pardot;
  results.sf = data.sf;
  results.hubspot = data.hubspot;
  results.googleTag = data.googleTag;
  $('.results-cont').html(htmlTemplate())
  checkTf();
}

function checkTf() {
  $('.tf').each(function() {
    if ($(this).text() == 'true') {
      $(this).addClass('true')
    } else {
      $(this).addClass('false')
    }
  })
}

function htmlTemplate() {
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
      <p class="margin-bot"><span class="is-bold">Injectors:</span></p>
    </div>

    <div class="values-cont">
      <p class="tf">${results.actOn}</p>
      <p class="tf">${results.clickDimensions}</p>
      <p class="tf">${results.google}</p>
      <p class="tf">${results.marketo}</p>
      <p class="tf">${results.pardot}</p>
      <p class="tf">${results.sf}</p>
      <p class="tf">${results.hubspot}</p>
      <p class="tf">${results.googleTag}</p>
    </div>

    <p class="margin-top"><span class="bold">NOTE:</span> If injectors is true script read-outs may default to a false value. This indicates the customer is using a script injector such as Google Tag Manger. If this is the case we cannot accurately determine what scripts the website is running.</p>

    </div>
  `
}

// FAQ activation

$('.faq').on("click", function() {
  $('.modal').addClass("is-active");
})

$('.modal-background').on("click", function() {
  $('.modal').removeClass("is-active");
})

$('.delete').on("click", function() {
  $('.modal').removeClass("is-active");
})
