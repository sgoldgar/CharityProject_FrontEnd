console.log('all ready');


$(function() {
   console.log( "test!");

});

//profile drop down
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
// function myFunction() {
//     $("#myDropdown").classList.toggle("show");
// }
// $('.drpbtn').hover(function(e){
//   $('#myDropdown').toggle();
// })
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

 // $('.signOut').on('click', function() {
 //   localStorage.clear();
 // });
//
// $('.drpbtn').hover(function(e){
//   $('#myDropdown').toggle()
//   if (!e.target.matches('.dropbtn')) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//
// }
// })
function charityLookup(){
  var urlCharity = 'http://localhost:3000/charitysidebar';
  var emailCharity = localStorage.getItem("username");
  console.log('email', emailCharity);
  var dataCharity = {
    email: emailCharity
   // img: img
  };


  var sidebarCharity = $.ajax({
         type: 'POST',
         url: urlCharity,
         data: dataCharity
       }, console.log("data: ", dataCharity));


  sidebarCharity.done(function(response){
      console.log('response: ', response);
      if (response.length != 0) {
        $('.charityProfileName').html("<p>"+response[0].charityName+"</p>");
        }
      //else if (response.length === 0){
      //   charityLookup();
      // }
   });

}
// personalize sidebar for donor
function personalizeProfile(){

    var url = 'http://localhost:3000/donorprofile';
    var email = localStorage.getItem("username");
    console.log('email', email);
    var data = {
     	email: email
     // img: img
   };


   var personalize = $.ajax({
           type: 'POST',
           url: url,
           data: data
         }, console.log("data: ", data));


    personalize.done(function(response){
        console.log('response: ', response);
        if (response.length != 0) {
          $('.donorName').html("<p>"+response[0].name+"</p>");
        } else if (response.length === 0){
          charityLookup();
        }
     });
};


    personalizeProfile();
