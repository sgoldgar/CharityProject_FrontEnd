console.log('all ready');


$(function() {
    console.log( "test!");
    var databaseUrl= 'http:localhost:3000/charity_portal';
    var getNeeds = $.ajax({
    url: databaseUrl,
    image:
    name:
  });
  console.log(getNeedsData());
});
