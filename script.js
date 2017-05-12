$(function(){



	function logincheck(username, password){
		
		var url = 'https://sgoldgar.github.io/CharityProject_FrontEnd/login/';

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
				console.log("https://secret-peak-23167.herokuapp.com/"+response.goto+".html");
				var locationgo = "https://secret-peak-23167.herokuapp.com/"+response.goto+".html"
				window.location.href = locationgo;
			}
		});

	}

	function signup(username, password, type){
		var url = 'https://sgoldgar.github.io/CharityProject_FrontEnd/login/signup';

		var data = {
				username: username,
				password: password,
				type: type
			};

		var pushsignup = $.ajax({
							type:"POST",
							url:url,
							data
						 });

		pushsignup.done(function(response){
			//if (err) alert("that username is already taken - please choose another!");
			console.log("signupYATA", response);
			if (response.status==='ok'){
				alert('user succesfully added to the db');
			}
			if (response.status==='reject'){
				alert('username already taken, please choose another');
			}

		});
	}


	function setHandlers(){

		$('form.new_user').submit(function(e){
			e.preventDefault();

			if (($(".newuser_username").val() != "") && ($(".newuser_password").val() != "") && ($(".newuser_type").val() != "")){
				signup($(".newuser_username").val(), $(".newuser_password").val(), $(".newuser_type").val());
			}

		});

		$('form.log_in').submit(function(e){
			e.preventDefault();

			if (($(".login_username").val() != "") && ($(".login_password").val() != "") && ($(".login_type").val() != "")){
				logincheck($(".login_username").val(), $(".login_password").val(), $(".login_type").val());
    		}	

		});


	}


	function main(){
		setHandlers();
		//other non-handled calls to functions go below
	}
	main();

	
})
