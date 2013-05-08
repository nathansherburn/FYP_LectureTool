// Written by Shea Yuin Ng
// Created 2 May 2013
// Student add questions to ask lecturers

$.post("join_session.php", function(data){
//$.post("http://syngtest.myproject/join_session.php", function(data){
	
	var string = data.split('_');
	var name = string[0];
	var unit_code = string[1];
	var lec_uname = string[2];
	var socket = io.connect('http://melts.eng.monash.edu:8000');
	
	// at document read (runs only ones).
	 $(document).ready(function(){
		//$('#add_ques_submit').live('click',function(){
		$(document).on('click','#add_ques_submit', function(){
				
		   // get question title
			var ques_title = $("#ques_title").val();
			if (!ques_title) { alert('Please enter your title for the question.'); return false;} 
			ques_title = escape(ques_title);
			ques_title =ques_title.replace(/\+/g, "%2B");

			//get question
			var question = $("#question").val();
			if (!question) { alert('Please enter your question.'); return false; }
			question = escape(question);
			question = question.replace(/\+/g, "%2B");
		  
			//use jquery ajax to post data to php server
			$.ajax({
				//url: "http://syngtest.myproject/lec_question.php",
				url: "stu_add_ques.php",
				type: 'post',
				data: 'ques_title='+ques_title+'&question='+question,
				success: function (result) {
					if (result==""){
						$("#msg").text("Question submitted successfully.");
						
						socket.emit('stu_add_ques',{
							unit_code: unit_code,
						});//socket emit
						
						//clear the text spaces
						$("#ques_title").val('');
						$("#question").val('');
					}
					else{
						$("#msg").text(result);
					}	 
					

				},
				error: function(){	
					alert('There was an error submitting your question');	
				}
				
			});
		});
		
		// ask user to log in again if no username available.
		while (name == '') {
		   name = alert("Please log in!");
		   $.mobile.changePage($(document.location.href="index.html"), "slideup");
		}
	});//document ready
});//post join_session