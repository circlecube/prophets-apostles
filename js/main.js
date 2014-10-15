if (!window.console) console = {log: function() {}};
/*

*/
var gaPlugin;
var activity_log = [];
var completed = [];
var touching = false;
var keep_log = true;
var clicked;
var has_class_no_touch = false;
var num_total = 0;
var num_correct = 0;
var num_incorrect = 0;
var score_percent = 0;
var level = 0;
var num_levels = 4;
var mode = 'learn';// learn/test
var subject = 'living'; //living/past
var levels = [
//'slug, Title, fa-icon'
    ['face', 'Faces', 'user'],
    ['face2', 'Young Faces', 'child'],
    ['initial', 'Initial', 'font'],
    ['hometown', 'Hometown', 'map-marker'],
    ['bday', 'Birthday', 'birthday-cake'],
    // ['talks', 'Conference Talks', 'comment'],
    // ['education', 'Education', 'graduation-cap'],
    // ['profession', 'Professtion', 'briefcase'],
    // ['miliraty', 'Military Service', 'star-o'],
    // ['seniority', 'Seniority', 'site-map']
    //fa-institution
    //fa-microphone
];
var free_version = false;

var start_time = new Date();
var end_time = new Date();
var seconds = 0; // (start_time - end_time)/-1000;
var delay_time = 900;
var perfect = ['Perfect!', 'Thou art the Man!', 'Flawless!', 'Amazing!', 'On a Roll!', 'Impeccable!', 'Inspired!', 'Superb!', 'Unblemished!', '=D'];
var kudos =  ['Great!', 'Awesome!', 'Well done,', 'You\'re Smart,', 'Crazy Good!', 'Feelin\' it!', 'Dynamite!', 'Gold Star!', 'Impressive!', 'Exactly!', 'Correct!', '=)', 'Bingo!', 'On the nose!', 'Right!', 'Right on!', 'Righteous!', '', 'Inspiring!', 'Precisely!', 'Exactly!', 'Right as Rain!', ''];
var banter = ['Ouch!', 'Doh!', 'Focus, only', 'Finger Slip?', 'Don\'t Give Up!', 'Good Grief!', 'Embarrasing!', 'Wrong!', 'Guessing?', 'Nobody\'s Perfect', 'Incorrect!', '=(', 'You Blew It!', 'Negative!', 'You Must Be Joking!', 'Woah!', 'Need Help?', 'Try Studying,', 'Incorrect!', 'False!', 'Make sure to keep your eyes open.', 'Try Again,', 'Two wrongs does not make a right.', 'Nice try, '];


var active_team = living_general_authorities;
var active_team_title = 'Living Apostles';
var list_player;
var list_player_template;

jQuery(document).ready(function($) {

	function init(){
		document.addEventListener("deviceready", onDeviceReady, false);
		document.addEventListener("menubutton", onMenuKeyDown, false);
		document.addEventListener("backbutton", onBackKeyDown, false);
		

		
		set_levels();
		
		if (free_version) {
			update_free();
		}

		//get local storage settings
		if (localStorage.activity_log){
			activity_log = JSON.parse(localStorage.activity_log);
		}
		if (localStorage.level){
			level = localStorage.level;
			$('.quiz .quiz').parent().removeClass('active');
			$('.quiz .quiz[data-index="'+level+'"]').parent().addClass('active');
		}
		if (localStorage.mode){
			mode = localStorage.mode;
			$('.mode').parent().removeClass('active');
			$('.mode[data-mode="'+mode+'"]').parent().addClass('active');
		}
		if (localStorage.subject){
			subject = localStorage.subject;
			$('.subject').parent().removeClass('active');
			$('.subject[data-subject="'+subject+'"]').parent().addClass('active');
		}

		set_ages();

		has_class_no_touch = $('html').hasClass('no-touch');
		//reset log
		//activity_log = [];

		$('body').attr('class', '');

		//setup handlebars
		list_player = $("#list_player").html();
		list_player_template = Handlebars.compile(list_player);

		game_players();
	}

	function set_levels(){
		var quiz_levels = '';
		for (var i = 0; i < levels.length; i++){
			quiz_levels += '<li><a href="#" class="quiz quiz_number" data-index="'+i+'" data-value="'+levels[i][0]+'">';
			quiz_levels += '<i class="fa fa-'+levels[i][2]+'"></i> '+levels[i][1]+'</a>';
			quiz_levels += '</li>';
		}
		$('.quiz_type').html(quiz_levels);
	}

	function update_free(){
		//set attributes/classes on top level quiz
		$('.quiz_begin').addClass('quiz').addClass('quiz_face');
		$('.quiz_begin').attr('data-index', 0);
		$('.quiz_begin').attr('data-value', 'face');
		//remove levels
		$('.quiz_type').remove();
		$('.quiz .mm-subopen').remove();

		//add upgrade link
		$('.menu .share').parent().after('<li><a href="market://details?id=com.circlecube.ldsquizpro" class="about">Upgrade</a></li>');
		//remove list all link
		// $('.list_all').parent().remove();
		//
	}
	function set_ages(){
		for ( var i = 0; i < active_team.length; i++){
			active_team[i].age = get_age(active_team[i].birthdate);
		}
		// for ( var i = 0; i < usmnt_coaches.length; i++){
		// 	usmnt_coaches[i].age = get_age(usmnt_coaches[i].birthdate);
		// }
	}
	function get_age(dateString) {
	    var today = new Date();
	    var birthDate = new Date(dateString);
	    var age = today.getFullYear() - birthDate.getFullYear();
	    var m = today.getMonth() - birthDate.getMonth();
	    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
	        age--;
	    }
	    return age;
	}
	function onDeviceReady() {
		//https://github.com/phonegap-build/GAPlugin/blob/c928e353feb1eb75ca3979b129b10b216a27ad59/README.md
		//gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Button", "Click", "event only", 1);
	    gaPlugin = window.plugins.gaPlugin;
	    gaPlugin.init(nativePluginResultHandler, nativePluginErrorHandler, "UA-1466312-14", 10);

		gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "App", "Begin");
	}
	

	function onMenuKeyDown() {
	    // Handle the menu button
	    $('.menu-toggle').trigger('click');
	}

	function onBackKeyDown() {
	    // Handle the back button
	    // do nothing
	}

	$('#mmenu').mmenu({
		slidingSubmenus: false,
		onClick: {
			setSeleted: false,
			preventDefault: null,
			close: true
		}
	});

	function game_players(){
		$('.score').html('');
		completed = [];
		num_total = 0;
		num_correct = 0;
		num_incorrect = 0;
		score_percent = 0;
		new_question();
	}

	function list_players(){
		var players = '';

		for ( var i = 0; i < active_team.length; i++){
			players += list_player_template(
						{
							index: i, 
							player: active_team[i]
						});
		}
		/*for ( var i = 0; i < usmnt_coaches.length; i++){
			players += list_player_template(
						{
							index: i, 
							player: usmnt_coaches[i]
						});
		}*/
		// $('.title').text( 'USMNT Roster' );
		$('.content').html(players);

		$('article dd').each(function(idx,e){
			//$(this).slideUp();
		});
		$('.score').html('');
	}

	function new_question(){
	    
	    make_question(active_team, get_random_groupindex(active_team));

	}
	/*
    ['face'],
    ['bday'],
    ['face2'],
    ['talks'],
    ['initial'],
    ['hometown']
    */
	function make_question(group, answer_index){
	    //get mc answers
	    var mc_answers = get_random_mc_answers(group, answer_index);
	    // console.log(level, levels[level][0]);
	    switch(levels[level][0]) {
	        case 'hometown': //photo
	            $('.content').html('<h2 data-answer="' + group[answer_index].name + '" class="question question_bio">From ' + group[answer_index].hometown + '</h2>');
	            for (var i = 0; i < 4; i++){
	                $('.content').append(get_answer_div(group,mc_answers,i,2));
	            } 
	          break;
	        case 'talks': //photo
	            $('.content').html('<h2 data-answer="' + group[answer_index].name + '" class="question">' + group[answer_index].conference_talks + ' Conference Talks</h2>');
	            for (var i = 0; i < 4; i++){
	                $('.content').append(get_answer_div(group,mc_answers,i,2));
	            } 
	          break;
	        case 'initial': //middle initial/name
	        	var html = '<h2 data-answer="' + group[answer_index][group[answer_index].initial] + '" class="question">';
	        	if ( group[answer_index][group[answer_index].initial] != undefined ) {
	        		html += group[answer_index][group[answer_index].initial];
	        	}
	        	else {
	        		html += 'No Initial';
	        	}
	        	html += '</h2>';
	            $('.content').html(html);
	            for (var i = 0; i < 4; i++){
	                $('.content').append(get_answer_div(group,mc_answers,i,1));
	            }
	          break;
	        case 'bday': //birthdate
	            $('.content').html('<h2 data-answer="' + group[answer_index].name + '" class="question">' + group[answer_index].birthdate + ' (' + group[answer_index].age + ')</h2>');
	            for (var i = 0; i < 4; i++){
	                $('.content').append(get_answer_div(group,mc_answers,i,1));
	            }
	          break;
	        case 'Who Came First': //order
	            $('.content').html('<h2 data-answer="' + group[answer_index].name + '" class="question">Called ' + group[answer_index].ordinal +  '</h2>');
	            for (var i = 0; i < 4; i++){
	                $('.content').append(get_answer_div(group,mc_answers,i,0));
	            }
	          break;
	        case 'name': //name
	            $('.content').html('<div data-answer="' + group[answer_index].name + '" class="question"><span class="img"><img src="img/' + group[answer_index].img + '" alt="guess my name" /></span></div>');
	            var answers = '<div class="answers">';
	            for (var i = 0; i < 4; i++){
	                answers += get_answer_div(group,mc_answers,i,0);
	            }
	            $('.content').append( answers +'</div>');
	          break;
	        default: //face, face2
	            $('.content').html('<h2 data-answer="' + group[answer_index].name + '" class="question">' + group[answer_index].name + '</h2>');
	            for (var i = 0; i < 4; i++){
	                $('.content').append(get_answer_div(group,mc_answers,i,2));
	            } 
	          //error
	    }
	    

	    // var correct = $.inArray(answer_index, mc_answers);
	    // $('.answer_'+correct).addClass('correct');
	    $('.answer').each(function(idx, ele){
	    	// console.log( $(this).data('answer'), $('.question').data('answer') );
	    	if ( $(this).data('answer') == $('.question').data('answer') ) {
	    		$(this).addClass('correct');
		    }
	    });
	}
	function get_answer_div(group, mc_answers, index, img){
	    var answer_div = "";
	    switch(levels[level][0]) {
	        //photo and young photo as default
	        case 'name': //name
	            answer_div = '<div data-answer="' + group[mc_answers[index]].name + '" class="answer answer_' + index + '" data-id="' + mc_answers[index] + '"><p class="answer_' + index + ' label">' + group[mc_answers[index]].name + '</p></div>';
	          break;
	        case 'talks': //number
	        	answer_div = '<div data-answer="' + group[mc_answers[index]].name + '" class="answer answer_' + index + '" data-id="' + mc_answers[index] + '" style="background-image: url(img/' + group[mc_answers[index]].img + '); background-position:'+ group[mc_answers[index]].img_pos + ';" data-alt="' + group[mc_answers[index]].name + ' #' + group[mc_answers[index]].conference_talks + '"></div>';
	          break;
	        case 'initial': //initial
	        	answer_div = '<div data-answer="' + group[mc_answers[index]][group[mc_answers[index]].initial] + '" class="answer answer_' + index + '" data-id="' + mc_answers[index] + '" style="background-image: url(img/' + group[mc_answers[index]].img + '); background-position:'+ group[mc_answers[index]].img_pos + ';" data-alt="' + group[mc_answers[index]].name + '"></div>';
	          break;
	        case 'face2': //name
	        	answer_div = '<div data-answer="' + group[mc_answers[index]].name + '" class="answer answer_' + index + '" data-id="' + mc_answers[index] + '" style="background-image: url(img/' + group[mc_answers[index]].img_young + '); background-position:'+ group[mc_answers[index]].img2_pos + ';" data-alt="' + group[mc_answers[index]].name + '"></div>';
	          break;
	        default: //face, bio
	            answer_div = '<div data-answer="' + group[mc_answers[index]].name + '" class="answer answer_' + index + '" data-id="' + mc_answers[index] + '" style="background-image: url(img/' + group[mc_answers[index]].img + '); background-position:'+ group[mc_answers[index]].img_pos + ';" data-alt="' + group[mc_answers[index]].name + '"></div>';
	          //error
	    }
	    return answer_div;
	}

	function get_random_mc_answers(group, correct){
	    var generated = [];
	    generated.push(correct);
	    for (var i = 1; i < 4; i++) {
	        while(true){
	            var next = Math.floor(Math.random()*group.length);
	            if (0 > $.inArray(next, generated)) {
	                // Done for this iteration
	                generated.push(next);
	                break;
	            }
	        }
	    }
	    randomize(generated);
	    return generated;
	}
	function get_random_groupindex(group){
	    var random_index = Math.floor(Math.random()*group.length);
		// console.log(completed);
	    //console.log(completed.toString(), random_index, $.inArray(random_index, completed));
	    if ( $.inArray(random_index, completed) < 0 ){
	        //console.log('unique found');
	        return random_index;
	    }
	    else if( completed.length == group.length ){
	        completed = [];
	        return random_index;
	    }
	    else{
	        //console.log('repeat found');
	        return get_random_groupindex(group);
	    }
	}
	function get_random_index(group){
	    var random_index = Math.floor(Math.random()*group.length);
	    return random_index;
	}
	function randomize(myArray) {
	  var i = myArray.length, j, tempi, tempj;
	  if ( i == 0 ) return false;
	  while ( --i ) {
	     j = Math.floor( Math.random() * ( i + 1 ) );
	     tempi = myArray[i];
	     tempj = myArray[j];
	     myArray[i] = tempj;
	     myArray[j] = tempi;
	   }
	}


	$('.content').on('click', '.answer', function(e){
		//console.log('clicked',$(this).attr('data-id'));
		
		// LEARN MODE
		if (mode == 'learn' ){
			
		    $(this).addClass('clicked');
		    var is_correct = false;
		        // end_time = new Date();
		        // time = start_time - end_time;

		    if ( $(this).hasClass('correct') ){
		        is_correct = true;
		        //calculate total clicked answers for this question
		        var num_clicked = $('.clicked').length;

		        if ( num_clicked == 1 ){
		        	completed.push( parseInt($(this).attr('data-id')) );
		            num_correct++;
		        }
		    }
		    
		    if( $(this).data('alt') != undefined ) {
		        $(this).prepend( '<p class="label">' + $(this).data('alt') +'</p>' );
		    }

		        // end_time = new Date();
		        // seconds = Math.floor( (start_time - end_time ) / -1000);
		        // var correct_per_minute = Math.round( (num_correct / seconds ) * 60 );
		    //console.log( correct_per_minute );
		    //update score + feedback
		    $('.score').html('');

		    //if round complete
		    //console.log(is_correct, num_correct, active_team.length, num_total);
		    if( is_correct && num_correct == active_team.length ) {
		        if (gaPlugin) {
		        	gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Answer", "Correct", $(this).data('alt') );
		        	gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Round", "End", levels[level][0] + ' ' + mode, parseInt(num_correct / (num_total+1)*100 ) );
		        }
		        $('.score').html(kudos[get_random_index(kudos)] + ' You Know All ' + active_team.length + '! ');
		        $('.score').append( score_percent + '% Accuracy! ');
		        //$('.score').append('That\'s a rate of '+ correct_per_minute + ' correct answers a minute!');
		        completed.length = 0;
		        num_total = -1;
		        num_correct = 0;
		        is_correct = false;
		        $('.score').append('<br />Play another level?');
		        
		        $('.content').html('');
		    }
		    //perfect score
		    else if ( is_correct && num_correct > num_total ){
		        $('.score').append(perfect[get_random_index(perfect)]);
		        $('.score').append(' You know ' + num_correct + ' ' + active_team_title + ' player' );
		        if (num_correct > 1){ $('.score').append('s'); }
		        $('.score').append( '! ' + parseInt(active_team.length - completed.length)  + ' left. ');
		        //$('.score').append( seconds + ' seconds! ');
		        if (gaPlugin) {
					gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Answer", "Correct", $(this).data('alt') );
				}
		    }
		    //correct answer
		    else if (is_correct){
		        $('.score').append(kudos[get_random_index(kudos)]);
		        $('.score').append(' You know ' + num_correct + ' ' + active_team_title + ' player' );
		        if (num_correct > 1){ $('.score').append('s'); }
		        $('.score').append( '! ' + parseInt(active_team.length - completed.length)  + ' left. ');
		        //$('.score').append( seconds + ' seconds! ');
		        if (gaPlugin) {
			        gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Answer", "Correct", $(this).data('alt') );
			    }
		    }
		    //incorrect answer
		    else{
		        $('.score').append(banter[get_random_index(banter)]);
		        $('.score').append(' You know ' + num_correct + ' ' + active_team_title + ' player' );
		        if (num_correct > 1){ $('.score').append('s'); }
		        $('.score').append( '! ' + parseInt(active_team.length - completed.length)  + ' left. ');
		        //$('.score').append( seconds + ' seconds! ');
		        if (gaPlugin) {
		        	gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Answer", "Incorrect", $(this).parent().find('.correct').data('alt') );
				}
		    }

		    //share
		    score_percent = parseInt(num_correct / (num_total+1)*100 );
		    $('.score').append('<div class="share_button" data-score="' + score_percent + '">Share your score!</div>');

		    num_total++;

		    if( is_correct ){
		        //num_total++;
		        //advance to next question
		        setTimeout(function() {
		            new_question();
		        }, delay_time);
		    }
		}
		
		//TEST MODE
		else if( mode == 'test'){

		    $(this).addClass('clicked');
		    var is_correct = false;
		        // end_time = new Date();
		        // time = start_time - end_time;

		    if ( $(this).hasClass('correct') ){
		        is_correct = true;
		        //calculate total clicked answers for this question
		        var num_clicked = $('.clicked').length;
		        if ( num_clicked == 1 ){
		            num_correct++;
		        }
		    }
		    else{
		    	num_incorrect++;
		    }
		    //console.log('pushing to complete list: '+$('.correct').attr('data-id'), $('.correct').data('alt') );
		    completed.push( parseInt($('.correct').attr('data-id')) );
		    
		    if( $(this).data('alt') != undefined ) {
		        $(this).prepend( '<p class="label">' + $(this).data('alt') +'</p>' );
		    }

		        // end_time = new Date();
		        // seconds = Math.floor( (start_time - end_time ) / -1000);
		        // var correct_per_minute = Math.round( (num_correct / seconds ) * 60 );
		    //console.log( correct_per_minute );
		    //update score + feedback
		    $('.score').html('');

		    //round complete
		    if( parseInt(active_team.length - completed.length) <= 0 ) {
		        if (gaPlugin) {
		        	gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Answer", "Correct", $(this).data('alt') );
		        	gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Round", "End", levels[level][0] + ' ' + mode, parseInt(num_correct / (num_total+1)*100 ) );
		        }
		        $('.score').html('Test Complete. You Know ' + num_correct + ' of ' + active_team.length + ' players! ');
		        $('.score').append( score_percent + '% Accuracy! ');
		        //$('.score').append('That\'s a rate of '+ correct_per_minute + ' correct answers a minute!');
		        completed.length = 0;
		        num_total = -1;
		        num_correct = 0;
		        is_correct = false;
		        $('.score').append('<br />Play another level?');
		        
		        $('.content').html('');
		    }
		    //not yet complete
		    else{
			    //perfect score
			    if ( is_correct && num_correct > num_total ){
			        $('.score').append(perfect[get_random_index(perfect)]);
			        $('.score').append(' You know ' + num_correct + ' of ' + completed.length + ' ' + active_team_title + ' players' );
			        // if (num_correct > 1){ $('.score').append('s'); }
			        $('.score').append( '! ' + parseInt(active_team.length - completed.length)  + ' left. ');
			        //$('.score').append( seconds + ' seconds! ');
			        if (gaPlugin) {
			        	gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Answer", "Correct", $(this).data('alt'));
			        }
			    }
			    //correct answer
			    else if (is_correct){
			        $('.score').append(kudos[get_random_index(kudos)]);
			        $('.score').append(' You know ' + num_correct + ' of ' + completed.length + ' ' + active_team_title + ' players' );
			        // if (num_correct > 1){ $('.score').append('s'); }
			        $('.score').append( '! ' + parseInt(active_team.length - completed.length)  + ' left. ');
			        //$('.score').append( seconds + ' seconds! ');
			        if (gaPlugin) {
			        	gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Answer", "Correct", $(this).data('alt'));
					}
			    }
			    //incorrect answer
			    else{
			        $('.score').append(banter[get_random_index(banter)]);
			        $('.score').append(' You know ' + num_correct + ' of ' + completed.length + ' ' + active_team_title );
			        // if (num_correct > 1){ $('.score').append('s'); }
			        $('.score').append( '! ' + parseInt(active_team.length - completed.length)  + ' left. ');
			        //$('.score').append( seconds + ' seconds! ');
			        if (gaPlugin) {
			        	gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Answer", "Incorrect", $(this).parent().find('.correct').data('alt') );
					}
			    }

			    //share
			    score_percent = parseInt(num_correct / (num_total+1)*100 );
			    $('.score').append('<div class="share_button" data-score="' + score_percent + '">Share your score!</div>');

			    num_total++;

			    // if( is_correct ){
			        //num_total++;
			        //advance to next question
			        setTimeout(function() {
			            new_question();
			        }, delay_time);
			    // }
			}
		}
	});


	$('.content').on('click touch', 'article dt', function(e){
		$(this).next('dd').slideToggle();
		$(this).toggleClass('active');
	});

	$('.list_all').on('click touch', function(e){
		list_players();
	});
	$('body').on('touchstart', function(){
		// commented for browser dev only??
		//touching = true;
	});
	$('body').on('touchend', function(){
		touching = false;
	});
	$('.quiz').on('click touch', '.quiz', function(e){
		//set level
		$('.quiz .quiz').parent().removeClass('active');
		$(this).parent().addClass('active');
		level = $(this).data('index');
		localStorage.level = level;
		// console.log(level, levels[level][0]);
		game_players();
	});
	$('.mode').on('click touch', function(e){
		$('.mode').parent().removeClass('active');
		$(this).parent().addClass('active');
		mode = $(this).data('mode');
		localStorage.mode = mode;
		// console.log('mode set to', mode);
		game_players();
	});
	$('.subject').on('click touch', function(e){
		$('.subject').parent().removeClass('active');
		$(this).parent().addClass('active');
		subject = $(this).data('subject');
		localStorage.subject = subject;
		// console.log('subject set to', subject);
		if (subject == 'living'){
			active_team = living_general_authorities;
		}
		else { //past
			active_team = deceased_general_authorities;
		}
		game_players();
	});
	$('.about').on('click touch', function(e){
		//show_about();
	});
	$('.activity_log').on('click touch', function(e){
		show_activity_log();
	});
	$('.share').on('click touch', function(e){
		//console.log('share social_sharing');
	  	window.plugins.socialsharing.available(function(isAvailable) {
		    if (isAvailable) {
		    	var message = 'Do you know the Latter-Day Prophets? Take the test in this mobile app!';
				var subject = 'Surely the Lord God will do nothing, but he revealeth his secret unto his servants the prophets.';
				// var files = 'https://lh4.ggpht.com/2wcDkVR7qhed98APHGy9NjfFHjHmTrhrgmrnQ083sDvQVNIR6LiLsOv08X1DvgElb_E';
				var files = null;
				var url = 'https://play.google.com/store/apps/details?id=com.circlecube.ldsquizpro';
				window.plugins.socialsharing.share(message, subject, files, url );
		    }
		});
	});
	$('.score').on('click touch', '.share_button', function(e){
		//console.log('share_button social_sharing');

	  	window.plugins.socialsharing.available(function(isAvailable) {
		    if (isAvailable) {
		    	var message = 'Do you know the Latter-Day Prophets? I do! Just took the test and got ' + $('.share_button').data('score') + '% correct!';
				var subject = 'Surely the Lord God will do nothing, but he revealeth his secret unto his servants the prophets.';
				// var files = 'https://lh4.ggpht.com/2wcDkVR7qhed98APHGy9NjfFHjHmTrhrgmrnQ083sDvQVNIR6LiLsOv08X1DvgElb_E';
				var files = null;
				var url = 'https://play.google.com/store/apps/details?id=com.circlecube.ldsquizpro';
				window.plugins.socialsharing.share(message, subject, files, url );
		    }
		});
	
	});
	$('.content').on('click touch', '.button_skip', function(e){
		game_players();
	});
	$('.content').on('click touch', '.button_again', function(e){
		quiz_article--;
		$(this).remove();
		game_players();
	});
	$('.options_toggle').on('click touch', function(){
		$('.options').toggleClass('active');
	})
	$('.content').on('click touch', '.button_clear_log', function(e){
		activity_log = [];
		localStorage.activity_log = JSON.stringify(activity_log);
		show_activity_log();
	})
	function show_about(){
		$('.content').html( content );
	}
	function show_activity_log(){
		var content = '<dt>' + langs[language].log + '</dt>';
		for( var i=0; i<activity_log.length;i++){
			//console.log(activity_log[i]);
			if ( activity_log[i].s != undefined ) {
				content += '<dd>' + activity_log[i].s + '% - ';
				content += active_team[ activity_log[i].i ].reference + ' ';
				// content += ' (' + activity_log[i].d + ') ';
				content += relative_time(activity_log[i].t) + '.</dd>';
			}
		}
		content += '<div class="button button_clear_log">' + langs[language].clear_log + '</div>';
		$('.content').html( content );
	}



	function nativePluginResultHandler(){
		//success
		//console.log('nativePluginResultHandler', 'success');
	}
	function nativePluginErrorHandler() {
		//error
		//console.log('nativePluginErrorHandler', 'fail');
	}
	function goingAway() {
		gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "App", "End");
	    gaPlugin.exit(nativePluginResultHandler, nativePluginErrorHandler);
	}


	function relative_time(time) {
      var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
      var delta = parseInt((relative_to.getTime() - time) / 1000);
      var r = '';
      if (delta < 20) {
        r = 'just now';
      } else if (delta < 60) {
        r = delta + ' seconds ago';
      } else if(delta < 120) {
        r = 'a minute ago';
      } else if(delta < (45*60)) {
        r = (parseInt(delta / 60, 10)).toString() + ' minutes ago';
      } else if(delta < (2*60*60)) {
        r = 'an hour ago';
      } else if(delta < (24*60*60)) {
        r = (parseInt(delta / 3600, 10)).toString() + ' hours ago';
      } else if(delta < (48*60*60)) {
        r = 'a day ago';
      } else {
        r = (parseInt(delta / (24*60*60))).toString() + ' days ago';
      }
      return r;
    }


	init();
});