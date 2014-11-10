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
var free_version = true;
var mode = 'learn';// learn/test
var subject = 'living'; //living/past
var levels = [
//['slug', 'fa-icon']
    {
    	slug:'face',
    	data:'user'
    },
    {
    	slug:'face2',
    	data:'child'
    },
    {
    	slug:'initial',
    	data:'font'
    },
    {
    	slug:'hometown',
    	data:'map-marker'
    },
    {
    	slug:'bday',
    	data:'birthday-cake'
    },
    // ['talks', 'Conference Talks', 'comment'],
    // ['education', 'Education', 'graduation-cap'],
    // ['profession', 'Professtion', 'briefcase'],
    // ['miliraty', 'Military Service', 'star-o'],
    // ['seniority', 'Seniority', 'site-map']
    //fa-institution
    //fa-microphone
];
var language = 'english';
var langs = {
	english: {
		language_native: "English", 
		language_english: "English", 
		language_string: "Language",
		lds_prophets_apostles: "LDS Prophets & Apostles",
		current_leaders: "Living Apostles",
		latter_day_prophets: "Latter-Day Prophets",
		quiz: "Quiz",
		list: "List All",
		share: "Share",
		settings: "Settings",
		quiz_settings: "Quiz Settings",
		quiz_subject: "Quiz Subject",
		quiz_mode: "Quiz Mode",
		learn_mode: "Learn Mode",
		test_mode: "Test Mode",
		you_know: "You know",
		left: "left",
		share_your_score: "Share Your Score",
		hometown: "Hometown",
		bday: "Birthday",
		initial: "Initial",
		face: "Face",
		face2: "Young Face",
		perfect: ['Perfect!', 'Thou art the Man!', 'Flawless!', 'Amazing!', 'On a Roll!', 'Impeccable!', 'Inspired!', 'Superb!', 'Unblemished!', '=D'],
		kudos: ['Great!', 'Awesome!', 'Well done,', 'You\'re Smart,', 'Crazy Good!', 'Feelin\' it!', 'Dynamite!', 'Gold Star!', 'Impressive!', 'Exactly!', 'Correct!', '=)', 'Bingo!', 'On the nose!', 'Right!', 'Right on!', 'Righteous!', '', 'Inspiring!', 'Precisely!', 'Exactly!', 'Right as Rain!', ''],
		banter: ['Ouch!', 'Doh!', 'Focus, only', 'Finger Slip?', 'Don\'t Give Up!', 'Good Grief!', 'Embarrasing!', 'Wrong!', 'Guessing?', 'Nobody\'s Perfect', 'Incorrect!', '=(', 'You Blew It!', 'Negative!', 'You Must Be Joking!', 'Woah!', 'Need Help?', 'Try Studying,', 'Incorrect!', 'False!', 'Make sure to keep your eyes open.', 'Try Again,', 'Two wrongs does not make a right.', 'Nice try, '],
		accuracy: "accuracy",
		all: "all",
		play_another_level: "Play another level",
		upgrade: "Upgrade",
		share_message: "Do you know the Latter-Day Prophets? Take the test in this mobile app!",
		share_subject: "Surely the Lord God will do nothing, but he revealeth his secret unto his servants the prophets.",
		share_score_message_a: "Do you know the Latter-Day Prophets? I do! Just took the test and got ",
		share_score_message_b: "% correct!",
		share_score_subject: "Surely the Lord God will do nothing, but he revealeth his secret unto his servants the prophets.",
		
	},
	french: {
		language_native: "Français", 
		language_english: "French", 
		language_string: "Langue",
		lds_prophets_apostles: "SDJ Prophètes & Apôtres",
		current_leaders: "Apôtres Vivant",
		latter_day_prophets: "Dernier Jour Prophèts",
		quiz: "Quiz",
		list: "Liste Complète",
		share: "Partager",
		settings: "Paramètres",
		quiz_settings: "Quiz Paramètres",
		quiz_subject: "Quiz Sujet",
		quiz_mode: "Quiz Type",
		learn_mode: "Apprendre",
		test_mode: "Examen",
		you_know: "Vous connissez",
		left: "qui rest",
		share_your_score: "Partagez votre score",
		hometown: "Ville natale",
		bday: "Anniversaire",
		initial: "Initiale",
		face: "Visage",
		face2: "Jeune Visage",
		perfect: ['Parfait!', 'Impecable!', 'Bien Fait!', 'Vertueux!', 'C\'est Vrai!', '=D'],
		kudos: ['Oui', '=)', 'Bon!'],
		banter: ['Ouch!', 'Non!', 'Ce n\'est pas possible.', 'Ca fait mal.', 'Qu\'est-ce que c\'est!'],
		accuracy: "précision",
		all: "tout",
		play_another_level: "Encore",
		upgrade: "Aller Pro",
		share_message: "Connaisez-vous les Prophèts des dernier jours? Passer le test dans c'est application mobile!",
		share_subject: "Car le Seigneur, l'Eternel, ne fait rien Sans avoir révélé son secret à ses serviteurs les prophètes.",
		share_score_message_a: "Connaisez-vous les Prophèts des dernier jours? Je les connais! Je suis passé le test avec un score de ",
		share_score_message_b: "!",
		share_score_subject: "Car le Seigneur, l'Eternel, ne fait rien Sans avoir révélé son secret à ses serviteurs les prophètes.",
		
	},
	spanish: { 
		language_native: "Español", 
		language_english: "Spanish", 
		language_string: "Lengua"
		
	}
}


var start_time = new Date();
var end_time = new Date();
var seconds = 0; // (start_time - end_time)/-1000;
var delay_time = 900;

var active_team = current_leaders;
// var active_team = latter_day_prophets;
var active_team_title;
if (active_team == current_leaders ) {
	active_team_title = langs[language].current_leaders;
} else {
	active_team_title = langs[language].latter_day_prophets;
}
// console.log(active_team, active_team_title);
var list_player;
var list_player_template;

jQuery(document).ready(function($) {

	function init(){
		document.addEventListener("deviceready", onDeviceReady, false);
		document.addEventListener("menubutton", onMenuKeyDown, false);
		document.addEventListener("backbutton", onBackKeyDown, false);
		

		
		if (free_version) {
			update_free();
		}

		
		//get local storage settings
		if (localStorage.language){
			language = localStorage.language;
		}
		
		update_language();

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
			
			if (subject == 'living'){
				active_team = current_leaders;
				active_team_title = langs[language].current_leaders;
			}
			else { //past
				active_team = latter_day_prophets;
				active_team_title = langs[language].latter_day_prophets;
			}

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
			quiz_levels += '<li><a href="#" class="quiz quiz_number" data-index="'+i+'" data-value="' + levels[i].slug + '">';
			quiz_levels += '<i class="fa fa-' + levels[i].data + '"></i> ' + langs[language][levels[i].slug] + '</a>';
			quiz_levels += '</li>';
		}
		$('.quiz_type').html(quiz_levels);
	}
	
	function update_language(){
		//console.log('update_language!', language);

		$('.quiz_begin').text(	langs[language].quiz );
		
		set_levels();

		$('.list_all').text(	langs[language].list );
		$('.share').text(		langs[language].share );
		$('.settings').text(	langs[language].settings );

		$('.subject').text( 			langs[language].quiz_subject );
		$('.subject_living').text( 		langs[language].current_leaders );
		$('.subject_past').text( 		langs[language].latter_day_prophets );

		$('.mode').text( 			langs[language].quiz_mode );
		$('.mode_learn').text( 		langs[language].learn_mode );
		$('.mode_test').text( 		langs[language].test_mode );

		$('.language').text( 			langs[language].language_string );
		$('.language-english').text( 	langs['english'].language_native );
		$('.language-french').text( 	langs['french'].language_native );
		// $('.language-spanish').text( langs['spanish'].language_native );
		// $('.language-german').text( 	langs['german'].language_native );
		if (active_team == current_leaders ) {
			active_team_title = langs[language].current_leaders;
		} else {
			active_team_title = langs[language].latter_day_prophets;
		}

		$('.title').text(	langs[language].lds_prophets_apostles );

		//set active from local storage vars
		// console.log(font_size, difficulty, language);
		$('.difficulty_option, .language_option, .font_size_option, .hints_option').parent().removeClass('active');
		// $('.font_size_option[data-value="' + font_size + '"]').parent().addClass('active');
		$('.language_option[data-value="' + language + '"]').parent().addClass('active');
		// $('.difficulty_option[data-value="' + difficulty + '"]').parent().addClass('active');
		// $('.hints_option[data-value="' + show_hints + '"]').parent().addClass('active');
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
		$('.menu .share').parent().after('<li><a href="market://details?id=com.circlecube.ldsquizpro" class="about">' + langs[language].upgrade + '</a></li>');
		//remove list all link
		// $('.list_all').parent().remove();
		//
	}
	function set_ages(){
		for ( var i = 0; i < current_leaders.length; i++){
			current_leaders[i].age = get_age(current_leaders[i].birthdate);
		}
		for ( var i = 0; i < latter_day_prophets.length; i++){
			latter_day_prophets[i].age = get_age(latter_day_prophets[i].birthdate);
		}
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
	    // console.log(level, levels[level].slug);
	    switch(levels[level].slug) {
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
	    switch(levels[level].slug) {
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
		        	gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Round", "End", levels[level].slug + ' ' + mode, parseInt(num_correct / (num_total+1)*100 ) );
		        }
		        $('.score').html( langs[language].kudos[get_random_index(langs[language].kudos)] + ' ' + langs[language].you_know + ' ' + langs[language].all + ' ' + active_team.length + '! ');
		        $('.score').append( score_percent + '% ' + langs[language].accuracy + '! ');
		        //$('.score').append('That\'s a rate of '+ correct_per_minute + ' correct answers a minute!');
		        completed.length = 0;
		        num_total = -1;
		        num_correct = 0;
		        is_correct = false;
		        $('.score').append('<br />' + langs[language].play_another_level + '?');
		        
		        $('.content').html('');
		    }
		    //perfect score
		    else if ( is_correct && num_correct > num_total ){
		        $('.score').append( langs[language].perfect[get_random_index(langs[language].perfect)] );
		        $('.score').append(' ' + langs[language].you_know + ' ' + num_correct + ' ' + active_team_title );
		        if (num_correct > 1){ $('.score').append('s'); }
		        $('.score').append( '! ' + parseInt(active_team.length - completed.length)  + ' ' + langs[language].left + '. ');
		        //$('.score').append( seconds + ' seconds! ');
		        if (gaPlugin) {
					gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Answer", "Correct", $(this).data('alt') );
				}
		    }
		    //correct answer
		    else if (is_correct){
		        $('.score').append( langs[language].kudos[get_random_index(langs[language].kudos)] );
		        $('.score').append(' ' + langs[language].you_know + ' ' + num_correct + ' ' + active_team_title );
		        if (num_correct > 1){ $('.score').append('s'); }
		        $('.score').append( '! ' + parseInt(active_team.length - completed.length)  + ' ' + langs[language].left + '. ');
		        //$('.score').append( seconds + ' seconds! ');
		        if (gaPlugin) {
			        gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Answer", "Correct", $(this).data('alt') );
			    }
		    }
		    //incorrect answer
		    else{
		        $('.score').append( langs[language].banter[get_random_index(langs[language].banter)] );
		        $('.score').append(' ' + langs[language].you_know + ' ' + num_correct + ' ' + active_team_title );
		        if (num_correct > 1){ $('.score').append('s'); }
		        $('.score').append( '! ' + parseInt(active_team.length - completed.length)  + ' ' + langs[language].left + '. ');
		        //$('.score').append( seconds + ' seconds! ');
		        if (gaPlugin) {
		        	gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Answer", "Incorrect", $(this).parent().find('.correct').data('alt') );
				}
		    }

		    //share
		    score_percent = parseInt(num_correct / (num_total+1)*100 );
		    $('.score').append('<div class="share_button" data-score="' + score_percent + '">' + langs[language].share_your_score + '!</div>');

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
		        	gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Round", "End", levels[level].slug + ' ' + mode, parseInt(num_correct / (num_total+1)*100 ) );
		        }
		        $('.score').html('Test Complete. ' + langs[language].you_know + ' ' + num_correct + ' of ' + active_team.length + '! ');
		        $('.score').append( score_percent + '% ' + langs[language].accuracy + '! ');
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
			        $('.score').append( langs[language].perfect[get_random_index(langs[language].perfect)] );
			        $('.score').append(' ' + langs[language].you_know + ' ' + num_correct + ' of ' + completed.length + ' ' + active_team_title );
			        // if (num_correct > 1){ $('.score').append('s'); }
			        $('.score').append( '! ' + parseInt(active_team.length - completed.length)  + ' ' + langs[language].left + '. ');
			        //$('.score').append( seconds + ' seconds! ');
			        if (gaPlugin) {
			        	gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Answer", "Correct", $(this).data('alt'));
			        }
			    }
			    //correct answer
			    else if (is_correct){
			        $('.score').append( langs[language].kudos[get_random_index(langs[language].kudos)] );
			        $('.score').append(' ' + langs[language].you_know + ' ' + num_correct + ' of ' + completed.length + ' ' + active_team_title );
			        // if (num_correct > 1){ $('.score').append('s'); }
			        $('.score').append( '! ' + parseInt(active_team.length - completed.length)  + ' ' + langs[language].left + '. ');
			        //$('.score').append( seconds + ' seconds! ');
			        if (gaPlugin) {
			        	gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Answer", "Correct", $(this).data('alt'));
					}
			    }
			    //incorrect answer
			    else{
			        $('.score').append( langs[language].banter[get_random_index(langs[language].banter)] );
			        $('.score').append(' ' + langs[language].you_know + ' ' + num_correct + ' of ' + completed.length + ' ' + active_team_title );
			        // if (num_correct > 1){ $('.score').append('s'); }
			        $('.score').append( '! ' + parseInt(active_team.length - completed.length)  + ' ' + langs[language].left + '. ');
			        //$('.score').append( seconds + ' seconds! ');
			        if (gaPlugin) {
			        	gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Answer", "Incorrect", $(this).parent().find('.correct').data('alt') );
					}
			    }

			    //share
			    score_percent = parseInt(num_correct / (num_total+1)*100 );
			    $('.score').append('<div class="share_button" data-score="' + score_percent + '">' + langs[language].share_your_score + '!</div>');

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
			active_team = current_leaders;
		}
		else { //past
			active_team = latter_day_prophets;
		}
		active_team_title = langs[english][active_team];
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
		    	var message = langs[language].share_message;
				var subject = langs[language].share_subject;
				// var files = 'https://lh4.ggpht.com/2wcDkVR7qhed98APHGy9NjfFHjHmTrhrgmrnQ083sDvQVNIR6LiLsOv08X1DvgElb_E';
				var files = null;
				var url = 'https://play.google.com/store/apps/details?id=com.circlecube.ldsquizpro';
				window.plugins.socialsharing.share(message, subject, files, url );
		    }
		});
	});
	$('.language_option').on('click touch', function(e){
		//console.log('language change:', $(this).val() );
		language = $(this).data('value');
		localStorage.language = language;
		$(this).parent().siblings().removeClass('active');
		$(this).parent().addClass('active');
		update_language();
		game_players();
	});

	$('.score').on('click touch', '.share_button', function(e){
		//console.log('share_button social_sharing');

	  	window.plugins.socialsharing.available(function(isAvailable) {
		    if (isAvailable) {
		    	var message = langs[language].share_score_message_a + $('.share_button').data('score') + langs[language].share_score_message_b;
				var subject = langs[language].share_score_subject;
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