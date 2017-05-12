console.log('all ready');


$(function() {
   console.log( "test!");

});

//JS for search buttons
  $('.group-btns .btn').on('click',function(event){
   event.preventDefault();

   var self = $(this);

   if ( self.find(':checkbox').length > 0 )
   {
     console.log('btn clicked: ', self.find(':checkbox').length);
     //alert('checkbox clicked');

     if ( self.hasClass('selectit' ) )
     {
       console.log('has class: selectit');
       self.removeClass('selectit');
       self.addClass('btn-primary');
     }
     else
     {
       self.addClass('selectit');
       self.removeClass('btn-primary');

     }

     console.log(self);
     return;
   }


 if ( self.find(':radio').length > 0 )
 {
   //alert('radiobutton clicked');

   // CHANGE SELECTED ITEM TO GREEN

   self.siblings("label").addBack().each(function(index, value){
     $(this).removeClass("selectit");
     $(this).addClass("btn-primary");
   });

   //alert($(this).text());
   self.removeClass("btn-primary");
   self.addClass("selectit");

   return;
 }
});

// submitting button search parameters
$(".submitSearch").on('click', function(){
    // event.preventDefault();
    // var needSearch = [] ;
    needSearch = "";
    //  var myobj = JSON.parse('{ "hello":"world" }');
    // alert(myobj.hello); // 'world'
    $.each($(".selectit"), function(){

          //var myobj = JSON.parse('{ "addobject":"'+$(this).text()+'" }');
          //needSearch.push(myobj.addobject);

          if (needSearch == ""){
             needSearch = $(this).text()
          }else {
             needSearch = needSearch + "," + $(this).text();
          }

          console.log('need search', needSearch)

      });
      console.log('needSearch ', needSearch);
      findNeeds(needSearch);

  });

 //ajax call to match needs to database

function findNeeds(needs){
 var url = 'http://localhost:3000/charityportal/needs';
 console.log('inside findneeds');
   data = {
     needs
   };

 var patching = $.ajax({
   url:url,
   type:"POST",
   data: data
 }, console.log("data", data));

 patching.done(function(response){
   console.log("findneedsYATA ", response);

   /*Change background to match mockup when search button is clicked*/
  $('main').css({
      "background-color": "white",
      "background-image" : "none"
    });

  $('.search-items h3, .search-items p').css({
    "color" : "#00B7D1"
  })

  $('.group-btns').css({
    "box-shadow" : "2px 2px 2px 2px grey"
  })

  $('.search-results-container').html('');

  /*Create array of all unique charities*/
  var allCharities = [];

  for (var k=0; k<response.length; k++) {
    // if(k===0){
    //   allCharities.push(response[k]);
    //   console.log(allCharities);
    // } else {
    var foundResponseInAllCharities = false;
    for(var m=0; m<allCharities.length; m++){
      if (allCharities[m].name === response[k].name){
        foundResponseInAllCharities = true;
      }
    }
    if (!foundResponseInAllCharities){
      allCharities.push(response[k]);
    }
}

   //loop through array of charities and append onto page
   for (var j=0; j<allCharities.length; j++){
        // var needsArray = [];
        //
        // for(var i=0; i<allCharities[j].needs.length; i++){
        //   needsArray.push(allCharities[j].needs[i]);
        // }; //end ul for loop


       $('.search-results-container').append(  //need to add search-results-container to HTML
         '<div class="result-container">' + //make a div to contain a single result
           /*APPEND CHARITY NAME AND EMAIL ICON*/
           '<a href="charityProfile.html"><h3 class="inner-title">' + allCharities[j].name +'</a> <span class="email-icon"><a href="mailto:'+allCharities[j].email+'"><img class="icon email-icon" src="assets/Mail Icon-14.png" alt="email icon"></a></h3>' +
           /*APPEND CHAIRITY LOGO*/
           '<div class="col-md-4 col-sm-4 col-xs-4">' +

            '<a href=charityProfile.html>' +
             '<img class="charity-logo" src="' + allCharities[j].img +'" alt="' + allCharities[j].name + ' logo">' +
             '</a>' +
           '</div>' +
           /*APPEND CHARITY INFO*/
           '<div class="col-md-8 col-sm-8 col-xs-8">' +
              /*APPEND CHARITY HOURS*/
             '<div class="hours">' +
               '<p>Hours:</p>' +
               '<p>'+ allCharities[j].hours + '</p>' +
             '</div>' +
           /*APPEND CHARITY ADDRESS*/
             '<div class="address">' +
               '<p>Address:</p>' +
               '<p>' + allCharities[j].streetAddress + ', '+ allCharities[j].city + '<br>' + allCharities[j].state + ', ' + allCharities[j].zip + '</p>' +
             '</div>' +
           /*APPEND NEEDS*/
             '<div class="needs-text">' +
                '<h4> Needs </h4>' +
               '<ul class="needs">' +

               '</ul>' +
         /*END CONTAINER*/
         '</div>'
         );

         //find the ul called needs text created in previous loop and append list items with needs
         for(var i=0; i<allCharities[j].needs.length; i++){
           var needsText = $('.result-container').eq(j).find(".needs-text");
           needsText.append(
             '<li>' + allCharities[j].needs[i] + '</li>'
           );
         }; //end ul for loop

   }; //end response for loop
 }); //end charitySearchResults.done


};
