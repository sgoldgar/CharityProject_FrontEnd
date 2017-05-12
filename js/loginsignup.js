$(function(){

	console.log("sanity check");

    function logincheck(username, password){
		var url = 'http://localhost:3000/login/';

		console.log('username', username);
		console.log('password', password);

		var data = {
				username: username,
				password: password
			};

		var pushlogin = $.ajax({
							type:"POST",
							url:url,
							data
						 });

		pushlogin.done(function(response){
			console.log("loginYATA", response.goto);


			if (response.goto==="passwordsdontmatch"){
				alert("password or username is not correct");
			}else{
				//the following localstorage set is to identify users in chat
				localStorage.setItem('username', username);

				if (response.goto==='charityportal'){
					window.location.href = 'profileEdit.html';
				}else if (response.goto==='donatorportal'){
					window.location.href = 'donorProfile.html';
				}
			}
		});

	}



	function pushdonatorinfo(){
		console.log('got to pushdonatorinfo');
		var url = 'http://localhost:3000/login/signup/donatorpost';

		var name = $('.donorname').val();
		var username = $('.donoremail').val();
		var email = $('.donoremail').val();

		var data3 = {
			name: name,
			username: username,
			email: email
		}

		var pushdonator = $.ajax({
    		type:"POST",
    		url:url,
    		data: data3
    	},
   		console.log(data3));

		pushdonator.done(function(response){
			//console.log('donatorpushYATA ', response);
			window.location.href='donorProfile.html';
		});

	}




    function pushcharityinfo(){
    	var url = 'http://localhost:3000/login/signup/charitypost';

    	var profileManager = $(".profileManager").val();
    	var streetAddress = $(".charityaddress").val();
    	var charityName = $(".charityorginizationname").val();
		var email = $('.charityemail').val();

    	console.log(" name ", charityName, " address ", streetAddress);

    	var data2 = {
    		//bio: name,
    		profileManager: profileManager,
				email: email,
    		streetAddress: streetAddress,
    		charityName: charityName
    	};

    	var pushcharity = $.ajax({
    		type:"POST",
    		url:url,
    		data: data2
    	},
   		console.log(data2));

    	pushcharity.done(function(response){
    		console.log("charitypushYATA ", response);
    		window.location.href = 'profileEdit.html'
    	});
    }



	function signup(username, password, type){
		var url = 'http://localhost:3000/login/signup';

		var data = {
				username: username,
				password: password,
				type: type
			};

		var pushsignup = $.ajax({
							type:"POST",
							url:url,
							data:data
						 });

		pushsignup.done(function(response){
			console.log("signupYATA", response);
			if (response.status==='ok'){

				localStorage.setItem('username', username);

				alert('user succesfully added to the db');
				if (type === "charity"){
					pushcharityinfo();
				}else if (type === "donator"){
					pushdonatorinfo();
				}

			}
			if (response.status==='reject'){
				alert('username already taken, please choose another');
			}

		});
	}

	$("#USERlogin").submit(function(){

			//NOTE: can't add passwords to database manually and check - the passwords need to be hashed to be properly searched!

			if (($(".USERusernamesignin").val() != "") && ($(".USERpasswordsignin").val() != "")){
				console.log("USERusernamesignin ", $(".USERusernamesignin").val());
				console.log("USERpasswordsignin ", $(".USERpasswordsignin").val());
				logincheck($(".USERusernamesignin").val(), $(".USERpasswordsignin").val());
			}
		return false;
	});


	$("#charitysignup").on("submit", function(e){
		e.preventDefault();
			if($(".charitypassword").val()===$(".charityconfirmpassword").val() && $(".charityemail").val()!="" && $(".charitypassword").val()!=""){
				signup($(".charityemail").val(), $(".charitypassword").val(), "charity");
			}
	});

	$('#donorsubmitform').on("submit", function(e){
		e.preventDefault();
			if($('.donorpassword').val()===$('.donorconfirmpassword').val() && $('.donoremail').val()!="" && $('.donorconfirmpassword').val()!=""){
				signup($(".donoremail").val(), $(".donorpassword").val(), "donator");
			}
	});
})
