

$(function(){


    function sendmsg(usr, msg){
        var url = 'http://localhost:3000/chat';

        var data = {
            usr:usr,
            msg:msg
        };

        var new_message = $.ajax({
                            type:"POST",
                            url:url,
                            data
                         });

        new_message.done(function(response){
            console.log("first!");
            console.log("postmsgYATA", response);
        });
    }

    function socketfunk(){

        console.log("in socketfunk");

        var socket = io('http://localhost:8080');
        socket.on('posts', function (data) {
            console.log("socketreturndata: ", data);
            //$('body').append('<p> usr: '+data.usr+' msg: '+data.msg+'</p>')

            $('.msgs').html(' ');


            for (var i=data.length-11;i<data.length;i++){
                 $(".msgs").append('<p> usr: '+data[i].usr+' msg: '+data[i].msg+'</p>')
            }

            // data.forEach(function(dot){
            //     $(".msgs").append('<p> usr: '+dot.usr+' msg: '+dot.msg+'</p>')
            // })

        });

    }


                        // <div class="msgs"></div>
                        // <textarea rows="4" cols="50" name="comment" form="msgform"> enter msg here </textarea>


    function main(){

        socketfunk();

        $(".msgform").keyup(function(event){
            console.log('1');
             if(event.keyCode == 13){
                console.log('2');
                    var usr = localStorage.getItem('username');
                    var msg = $('.msgform').val();
                    $('.msgform').val("");
                    console.log('usr ', usr, ' msg ', msg);
                    sendmsg(usr, msg);

             }
        });

    }
    main();

 });
