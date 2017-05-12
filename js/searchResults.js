1. Get the values of the needs from the buttons and set to variable
2. Ajax data {
  needs : buttonVariableValue (food || shirts || )
}  -->will this get all the charities with those specific needs?
3. in for loop set charity name to variable charity name





$(document).ready(function(){

  //AJAX STUFF MISSING

  function charitySearchResults(){
      var getCharityResults = $.ajax({
      //   url : apiUrl + "forecast",
      //   method : 'GET',
      //   dataType : 'json',
      //   data : {
      //     charityName : 'city',
      //     appid : apiKey,
      //     units : 'imperial', //convert to farenheit
      //   }
      });

      getCharityResults.done(function(response){

        var charities = [];

        //loop through array of responses to query and append onto page
        for (var j=0; j<response.length; j++){
          charities.push(charity.name) //add charity to charities array
          /*Check to see if charity matches one already returned in results*/
          for (var k = 0; k < charities.length; k++) {
            /*If it matches move on*/
            if (charity.name === charities[k]){
              continue
            }
            /*Otherwise add it to search results*/
            else {
              $('.search-results-container').append(  //need to add search-results-container to HTML
                '<div class="result-container">' + //make a div to contain a single result
                  /*APPEND CHARITY NAME*/
                  '<h3 class="inner-title">' + /*var name of charity*/ +'</h3>' +
                  /*APPEND CHAIRITY LOGO*/
                  '<div class="col-md-4 col-sm-4 col-xs-4">' +
                    '<img class="charity-logo" src="' + /*var name of charity logo*/ +'" alt="' + /*charity name*/ + ' logo">' +
                  '</div>' +
                  /*APPEND CHARITY HOURS*/
                  '<div class="col-md-4 col-sm-4 col-xs-4">' +
                    '<div class="hours">' +
                      '<p>Hours:</p>' +
                      '<p>'+ /*var charity hours*/ + '</p>' +
                    '</div>' +
                  /*APPEND CHARITY ADDRESS*/
                    '<div class="address">' +
                      '<p>Address:</p>' +
                      '<p>' + /*var for charity address + city + state + zip */ + '</p>' +
                    '</div>' +
                  /*APPEND NEEDS*/
                    '<div class="needs-text">' +
                      '<ul class="needs">' +
                      '</ul>' +
                  /*APPEND EMAIL BUTTON*/
                  '<div class="col-md-4 col-sm-4 col-xs-4">' +
                      '<a href="mailto:'+charities.email+'"><img class="icon email-icon" src="assets/Mail Icon-14.png" alt="email icon"></a>' +
                  '</div>' +
                /*END CONTAINER*/
                '</div>'
                );

              //find the ul called needs text created in previous loop and append list items with needs
              for(var i=0; i<response.needs.length; i++){ //not sure if response.needs.length is correct call
                $(".needs-text").append(
                  '<li>' + response.needs[i] + '</li>'
                );
              }; //end ul for loop
            }; //end else statement
          }; //end charity for loop
        }; //end response for loop
      }); //end charitySearchResults.done

      getCharityResults.fail(function(error){
        console.log('fail', error);
      });
      //.always will always fire
      getCharityResults.always(function(){
        console.log('ajax working')
      })

    }

//end document.ready
)};
