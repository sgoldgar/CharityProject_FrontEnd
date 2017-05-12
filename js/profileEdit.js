// console.log('all ready');


// $(function() {
//     console.log( "test!");

// });

// // submitting form for profile

// $(".saveProfile").on('click', function(){

//   // event.preventDefault();

//   });


// // ajax call to database to show saved charity profile info

//   function update() {

//     var url= 'http:localhost:3000/charityprofile';
//     console.log('url', url);
//     data = {
//       profileManager : profileManger,
//       charityname : charityName,
//       adress : streetAddress,
//       email : email
//     };

//     var updateProfile = $.ajax({

//   function findCharity(needs) {

//     var url= 'http:localhost:3000/charity_profile/profile';
//     console.log('url', url);
//     data = {
//       needs: needs
//     };

//     var completeProfile = $.ajax({

//       url: url,
//       type: "GET",
//       data: data
//     }, console.log('url', url));


//     updateProfile.done(function(response){

//       console.log('find needs', response);
//     });


//   };

console.log('sanity check');

$(function(){

//need to populate the following fields

//Organization Name
//id orgName

//Organization Address
//id orgAddress

//City
//id city

//Zip Code
//id zip

//Phone Number
//id phoneNumber

//Hours of Operation
//id hours

//Companiy bio
//id bio

//Profile Manager
//id profileManager

//Email
//id email




function pushcharityinfo(){
  var url = 'http://localhost:3000/charityprofile/push';

  var organizationName = $("#orgName").val();
  var streetAddress    = $("#orgAddress").val();
  var city             = $("#city").val();
  var zip              = $("#zip").val();
  var phoneNumber      = $("#phoneNumber").val();
  var hours            = $("#hours").val();
  var bio              = $("#bio").val();
  var profileManager   = $("#profileManager").val();
  var email            = $("#emailInput").val();
  var LOCALEMAIL       = localStorage.getItem('username');

  console.log('email', email);

  var pushdata = {
    LOCALEMAIL: LOCALEMAIL,
    charityName: organizationName,
    bio: bio,
    phoneNumber: phoneNumber,
    profileManager: profileManager,
    streetAddress: streetAddress,
    city: city,
    zip: zip,
    hours: hours,
    email: email
  }

  var pushcharity = $.ajax({
    type:"PATCH",
    url:url,
    data:pushdata
  });

  pushcharity.done(function(response){
    console.log("pushYata", response);
    localStorage.setItem("username", email);
    //pullcharityinfo();
  });

}



function pullcharityinfo(){

    var url = 'http://localhost:3000/charityprofile/load';

    var email = localStorage.getItem("username");
    console.log("emailsend ", email);

    var pulldata = {
      email: email
    }

    var pullcharity = $.ajax({
        type:"POST",
        url:url,
        data: pulldata
    });

    pullcharity.done(function(response){
      console.log("responseYataLoad", response);
      $("#orgName").val(response[0].charityName);
      $("#orgAddress").val(response[0].streetAddress);
      $("#city").val(response[0].city);
      $("#zip").val(response[0].zip);
      $("#phoneNumber").val(response[0].phoneNumber);
      $("#hours").val(response[0].hours);
      $("#bio").val(response[0].bio);
      $("#profileManager").val(response[0].profileManager);
      $("#emailInput").val(localStorage.getItem("username"));
    });
}

// This changes the form borders and alerts user to changes in profile

$('#changesSaved').on('click', function(e){
  e.preventDefault();
  console.log('clicked');
  $('.saveInput').css('border', 'none');
  $('#changesSaved').text('Changes Saved').css("background-color", "#00B7D1")
});

function main(){

  pullcharityinfo();

  console.log("localStorage", localStorage.getItem("username"));


  $("form.profile-edit").on("submit", function(e){
    e.preventDefault();
    pushcharityinfo()
  });

}

main();






});
