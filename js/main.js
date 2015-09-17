if (!window.console) console = {log: function() {}};
/*

calculate age on leaders.
toggle levels depending on quiz subject

*/
var current_leaders = [];
var latter_day_prophets = [];
var groups = [];
var group = '';

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
var levels_pro = [
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
    {
    	slug:'seniority',
    	data:'sitemap'
    },
    // {
    // 	slug:'sort',
    // 	data:'arrows'
    // },
    {
    	// include mission, education, profession and military service
    	slug:'bio',
    	data:'briefcase' 
    },
    {
    	//number of conference talks
    	slug:'talks',
    	data:'comment' //microphone
    },
    {
    	slug:'mission',
    	data:'bicycle'
    },
    {
    	slug:'military',
    	data:'star-o'
    },
    {
    	slug:'education',
    	data:'graduation-cap' //institution
    },
    {
    	slug:'profession',
    	data:'briefcase'
    },
    {
    	slug:'reason',
    	data:'asterisk'
    }, 
    // {
    // 	slug:'agecalled',
    // 	data:'calendar'
    // }
];
var levels_free = [
    {
    	slug:'face',
    	data:'user'
    },
    {
    	slug:'face2',
    	data:'child'
    },
    {
    	slug:'seniority',
    	data:'sitemap'
    },
    {
    	slug:'bio',
    	data:'newspaper-o' 
    }
];
var levels = levels_pro;
var language = 'english';
var langs = {
	english: {
		language_native: "English", 
		language_english: "English", 
		language_string: "Language",
		lds_prophets_apostles: "LDS Prophets & Apostles",
		current_leaders: "Living Apostles",
		all_leaders: "Latter-Day Apostles",
		latter_day_prophets: "Latter-Day Prophets",
		quiz: "Quiz",
		list: "List All",
		share: "Share",
		rate: "Rate",
		settings: "Settings",
		quiz_settings: "Quiz Settings",
		quiz_subject: "Quiz Subject",
		quiz_mode: "Quiz Mode",
		learn_mode: "Learn Mode",
		test_mode: "Test Mode",
		you_know: "You know",
		left: "left",
		share_your_score: "Share Your Score",
		rate_app: "Rate this App",
		submit: "Submit",
		hometown: "Hometown",
		bday: "Birthday",
		initial: "Initial",
		face: "Face",
		face2: "Young Face",
		seniority: "Seniority",
		sort: "Sort",
		bio: "Biography",
		talks: "Conference Talks",
		education: "Education",
		profession: "Profession",
		military: "Military Service",
		mission: "Mission Service",
		reason: "Reason Called",
		agecalled: "Age Called",
		perfect: ['Perfect!', 'Thou art the Man!', 'Flawless!', 'Amazing!', 'On a Roll!', 'Impeccable!', 'Inspired!', 'Superb!', 'Unblemished!', '=D'],
		kudos: ['Great!', 'Awesome!', 'Well done,', 'You\'re Smart,', 'Crazy Good!', 'Feelin\' it!', 'Dynamite!', 'Gold Star!', 'Impressive!', 'Exactly!', 'Correct!', '=)', 'Bingo!', 'On the nose!', 'Right!', 'Right on!', 'Righteous!', '', 'Inspiring!', 'Precisely!', 'Exactly!', 'Right as Rain!', ''],
		banter: ['Ouch!', 'Doh!', 'Focus, only', 'Finger Slip?', 'Don\'t Give Up!', 'Good Grief!', 'Embarrasing!', 'Wrong!', 'Guessing?', 'Nobody\'s Perfect', 'Incorrect!', '=(', 'You Blew It!', 'Negative!', 'You Must Be Joking!', 'Woah!', 'Need Help?', 'Try Studying,', 'Incorrect!', 'False!', 'Make sure to keep your eyes open.', 'Try Again,', 'Two wrongs does not make a right.', 'Nice try, '],
		accuracy: "accuracy",
		all: "all",
		play_another_level: "Play another level",
		upgrade: "Upgrade",
		share_message: "Do you know the Latter-Day Prophets? Take the test in this mobile app!",
		share_subject: "Surely the Lord God will do nothing, but he revealeth his secret unto his servants the prophets.",
		share_score_message_a: "Do you know the Latter-Day Prophets? I do! ",
		share_score_message_b: "% correct!",
		share_score_message_b_2: " tries!",
		share_score_subject: "Surely the Lord God will do nothing, but he revealeth his secret unto his servants the prophets.",
		
	},
	french: {
		language_native: "Français", 
		language_english: "French", 
		language_string: "Langue",
		lds_prophets_apostles: "SDJ Prophètes & Apôtres",
		current_leaders: "Apôtres Vivant",
		all_leaders: "Dernier Jour Apostles",
		latter_day_prophets: "Dernier Jour Prophèts",
		quiz: "Quiz",
		list: "Liste Complète",
		share: "Partager",
		rate: "Donner Votre Avis",
		settings: "Paramètres",
		quiz_settings: "Quiz Paramètres",
		quiz_subject: "Quiz Sujet",
		quiz_mode: "Quiz Type",
		learn_mode: "Apprendre",
		test_mode: "Examen",
		you_know: "Vous connissez",
		left: "qui rest",
		share_your_score: "Partagez votre score",
		rate_app: "Donner Votre Avis",
		submit: "Soumettre",
		hometown: "Ville natale",
		bday: "Anniversaire",
		initial: "Initiale",
		face: "Visage",
		face2: "Jeune Visage",
		seniority: "Ancienneté",
		sort: "Arranger",
		bio: "Biographie",
		talks: "Discours de conférence",
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
		share_score_message_b_2: " fois!",
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

var active_team = leaders;
var active_team_title = group;
// console.log(active_team, active_team_title);
var list_player;
var list_player_template;

// var devicePlatform = device.platform;
var devicePlatform = 'Android';

var android_android_link = 'market://details?id=com.circlecube.ldsquizpro';
var android_android_link_free = 'market://details?id=com.circlecube.ldsquiz';
var android_web_link = 'https://play.google.com/store/apps/details?id=com.circlecube.ldsquizpro';
var android_android_rate_link = '';

var amazon_android_link = 'http://www.amazon.com/Evan-Mullins-LDS-Prophets-Apostles/dp/B00UUPSG2E/';
var amazon_web_link = 'http://www.amazon.com/Evan-Mullins-LDS-Prophets-Apostles/dp/B00UUPSG2E/';
var amazon_android_rate_link = 'https://www.amazon.com/review/create-review?ie=UTF8&asin=B00UUPSG2E';

var ios_ios_link = 'itms-apps://itunes.apple.com/app/id971859234';
var ios_web_link = 'https://itunes.apple.com/us/app/lds-prophets-and-apostles-pro/id971859234';
var ios_ios_rate_link = 'http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?id=971859234&pageNumber=0&sortOrdering=2&type=Purple+Software&mt=8';

var web_link = 'https://ldsmormonapps.com/app/lds-prophets-apostles-pro/';
var web_link_free = 'https://ldsmormonapps.com/app/lds-prophets-apostles-lite/';

var store_link = android_android_link;
var rate_link = android_android_link;

jQuery(document).ready(function($) {
	
var $sorts;
var $draggable;

	function init(){
		document.addEventListener("deviceready", onDeviceReady, false);
		document.addEventListener("menubutton", onMenuKeyDown, false);
		document.addEventListener("backbutton", onBackKeyDown, false);
		
		//platform check
		if ( typeof( device ) !== 'undefined' ) {
			devicePlatform = device.platform;
		}
		// var devicePlatform = 'iOS';
		// var devicePlatform = 'Amazon Fire OS';
		
		if (devicePlatform == 'Android') {
			//update links to point to play market
			if (free_version) {
				rate_link = store_link = android_android_link_free;
			}
			else {
				rate_link = store_link = android_android_link;
			}
			
		}
		else if (devicePlatform == 'Amazon Fire OS') {
			//update links to point to amazon store
			store_link = amazon_android_link;
			rate_link = amazon_android_rate_link;
		}
		else if (devicePlatform == 'iOS') {
			//update links to point to itunes store
			store_link = ios_ios_link;
			rate_link = ios_ios_rate_link;
			
			//remove more apps - in the future update apps with links to itunes apps
			$('.more_apps').parent('li').remove();
			
		}
		if (free_version) {
			update_free();
		}
		
		//get local storage settings
		if (localStorage.language){
			language = localStorage.language;
		}
		
		$('.rate').attr( 'href', rate_link );

		update_language();
		
		$('#mmenu').mmenu({
			slidingSubmenus: false,
			onClick: {
				setSeleted: false,
				preventDefault: null,
				close: true
			}
		});
		
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
		if (localStorage.group) {
			group = localStorage.group;
			$('.quiz_group .quiz').parent().removeClass('active');
			$('.quiz .quiz[data-value="'+group+'"]').parent().addClass('active');
		}

		set_ages();

		build_groups();
		update_group();
		
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
		$('.rate').text(		langs[language].rate );
		$('.settings').text(	langs[language].settings );

		$('.mode').text( 			langs[language].quiz_mode );
		$('.mode_learn').text( 		langs[language].learn_mode );
		$('.mode_test').text( 		langs[language].test_mode );

		$('.language').text( 			langs[language].language_string );
		$('.language-english').text( 	langs['english'].language_native );
		$('.language-french').text( 	langs['french'].language_native );
		// $('.language-spanish').text( langs['spanish'].language_native );
		// $('.language-german').text( 	langs['german'].language_native );

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
		
		levels = levels_free;
		set_levels();
		//set attributes/classes on top level quiz
		$('.quiz_begin').addClass('quiz').addClass('quiz_face');
		$('.quiz_begin').attr('data-index', 0);
		$('.quiz_begin').attr('data-value', 'face');
		//remove levels
		// $('.quiz_type').remove();
		// $('.quiz .mm-subopen').remove();

		//add upgrade link
		$('.menu .share').parent().after('<li><a href="' + web_link + '" class="about">' + langs[language].upgrade + '</a></li>');
		//remove list all link
		// $('.list_all').parent().remove();
		
	}
	function update_group() {
		//filter out any leaders without a specific value
		
		console.log('update_group', levels[level].slug, group);
		active_team_title = group;
  		/*
		  	face
		  	face2
			initial
			hometown
			bday
			seniority
			//sort
			bio
			talks
			mission
			military
			education
			profession
			reason
			agecalled
		*/
		switch(levels[level].slug) {
			
			case 'face2':
				active_team = $.grep( leaders, function( leader, i ) {
				  return 	leader.img2 != null && 
							leader.img2 != '' && 
				  			leader.groups.indexOf( group ) > -1;
		  		});
	  			break;
	  			
			case 'initial':
				active_team = $.grep( leaders, function( leader, i ) {
				  return 	leader.img != null && 
				  			leader.initial != 'none' && 
				  			leader.groups.indexOf( group ) > -1;
				});
				break;
			
			case 'hometown':
				active_team = $.grep( leaders, function( leader, i ) {
				  return 	leader.img != null && 
				  			leader.hometown != '' && 
				  			leader.groups.indexOf( group ) > -1;
				});
				break;
		
			case 'bday':
				active_team = $.grep( leaders, function( leader, i ) {
				  return 	leader.img != null && 
				  			leader.birthday != '' && 
				  			leader.groups.indexOf( group ) > -1;
				});
				break;
		
			case 'seniority':
				active_team = $.grep( leaders, function( leader, i ) {
				  return 	leader.img != null && 
				  			leader.ordained_date != '' && 
				  			leader.groups.indexOf( group ) > -1;
				});
				break;
		
			case 'talks':
				active_team = $.grep( leaders, function( leader, i ) {
				  return 	leader.img != null && 
				  			leader.conference_talks != '' && 
				  			leader.groups.indexOf( group ) > -1;
				});
				break;
		
			case 'mission':
				active_team = $.grep( leaders, function( leader, i ) {
				  return 	leader.img != null && 
				  			leader.mission != '' && 
				  			leader.groups.indexOf( group ) > -1;
				});
				break;
		
			case 'military':
				active_team = $.grep( leaders, function( leader, i ) {
				  return 	leader.img != null && 
				  			leader.military != '' && 
				  			leader.groups.indexOf( group ) > -1;
				});
				break;
		
			case 'education':
				active_team = $.grep( leaders, function( leader, i ) {
				  return 	leader.img != null && 
				  			leader.education != '' && 
				  			leader.groups.indexOf( group ) > -1;
				});
				break;
		
			case 'profession':
				active_team = $.grep( leaders, function( leader, i ) {
				  return 	leader.img != null && 
				  			leader.profession != '' && 
				  			leader.groups.indexOf( group ) > -1;
				});
				break;
		
			case 'reason':
				active_team = $.grep( leaders, function( leader, i ) {
				  return 	leader.img != null && 
				  			leader.reason_called != '' && 
				  			leader.groups.indexOf( group ) > -1;
				});
				break;
		
			case 'agecalled':
				active_team = $.grep( leaders, function( leader, i ) {
				  return 	leader.img != null && 
				  			leader.agecalled != '' && 
				  			leader.groups.indexOf( group ) > -1;
				});
				break;
			
			default:  //face / default
				//filter out any leaders without an image
				active_team = $.grep( leaders, function( leader, i ) {
				  return 	leader.img!=null && 
				  			leader.groups.indexOf( group ) > -1;
				});
			
		}
	}
	function build_groups(){
		//get groups from data and build master
		for ( var i = 0; i < active_team.length; i++ ){
			// active_team[i].groups += ',All';
			var player_groups_string = active_team[i].groups;			
			var player_groups = player_groups_string.split(',');
			for ( var j = 0; j < player_groups.length; j++ ) {
				//if not in groups already
				if ( player_groups[j] !== '' ) {
					var main_group_index = -1;
					for( var k = 0; k < groups.length; k++){
						//match
						if( player_groups[j] == groups[k][0] ) {
							main_group_index = k;
							//increment count
							groups[k][1]++;
						}
					}
					if ( main_group_index === -1 ) {
						//add to master groups list
						// console.log('adding new group', player_groups[j]);
						var new_group = [player_groups[j], 1];
						groups.push( new_group );
					}
				}
			}
		}
		
		// console.log(groups);
		
		//sort alphabetically
		groups.sort();
		
		// console.log(groups);
		
		//build menu item for each group
		var groups_html = '';
		for (var i = 0; i < groups.length; i++){
			//only show near full squads - at least 20 men
			// if (groups[i][1] >= 20 ) {
				groups_html += '<li><a href="#" class="quiz quiz_group" data-index="'+i+'" data-value="' + groups[i][0] + '" data-count="' + groups[i][1] + '">' + groups[i][0] + 's</a></li>';
			// }
		}
		$('.quiz_group ul').html(groups_html);
	}
	function set_ages(){
		
		for ( var i = 0; i < leaders.length; i++){
			if ( leaders[i].deathdate ) {
				leaders[i].age = get_age(leaders[i].birthdate) - get_age(leaders[i].deathdate);
			} else {
				leaders[i].age = get_age(leaders[i].birthdate);
			}
			leaders[i].agecalled = leaders[i].age - get_age(leaders[i].ordained_date);
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
	    $('.menu-toggle').trigger('click');
	}

	function game_players(){
		$('.score').html('');
		completed = [];
		num_total = 0;
		num_correct = 0;
		num_incorrect = 0;
		score_percent = 0;
		if ( level == 5 ){
			quiz_counter = 0;
			active_team.sort(sort_by_ordained_date);
		}
		new_question();
	}
	function sort_by_ordained_date(a,b){
		var a_od = new Date(a.ordained_date);
		var b_od = new Date(b.ordained_date);
		
		if (a_od < b_od)
		  return -1;
		if (a_od > b_od)
		  return 1;
		
		return 0;
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
	    if ( levels[level].slug == 'seniority' ) {
	    	make_question(active_team, quiz_counter++);
	    }
	    else if( levels[level].slug == 'sort') {
	    	make_question(active_team);
	    }
	    else {
	    	make_question(active_team, get_random_groupindex(active_team));
	    }
	}
	/*
    ['face'],
    ['bday'],
    ['face2'],
    ['talks'],
    ['initial'],
    ['hometown'],
    ['seniority']
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
	        case 'education':
	        	var html = '<h2 data-answer="' + group[answer_index].education + '" class="question question_bio">';
	        	if ( group[answer_index].education != undefined ) {
	        		html += group[answer_index].education;
	        	}
	        	else {
	        		html += 'No Formal Education';
	        	}
	        	html += '</h2>';
	            $('.content').html(html);
	            for (var i = 0; i < 4; i++){
	                $('.content').append(get_answer_div(group,mc_answers,i,1));
	            }
	          break;
	        case 'profession':
            	var html = '<h2 data-answer="' + group[answer_index].profession + '" class="question question_bio">';
            	if ( group[answer_index].profession != undefined ) {
            		html += group[answer_index].profession;
            	}
            	else {
            		html += 'No Formal Profession';
            	}
            	html += '</h2>';
                $('.content').html(html);
	            for (var i = 0; i < 4; i++){
	                $('.content').append(get_answer_div(group,mc_answers,i,1));
	            }
	          break;
	        case 'military':
            	var html = '<h2 data-answer="' + group[answer_index].military + '" class="question question_bio">';
            	if ( group[answer_index].military != undefined ) {
            		html += group[answer_index].military;
            	}
            	else {
            		html += 'No ' + langs[language].military;
            	}
            	html += '</h2>';
                $('.content').html(html);
	            for (var i = 0; i < 4; i++){
	                $('.content').append(get_answer_div(group,mc_answers,i,1));
	            }
	          break;
	        case 'mission':
            	var html = '<h2 data-answer="' + group[answer_index].mission + '" class="question question_bio">';
            	if ( group[answer_index].mission != undefined ) {
            		html += group[answer_index].mission;
            	}
            	else {
            		html += 'No ' + langs[language].mission;
            	}
            	html += '</h2>';
                $('.content').html(html);
	            for (var i = 0; i < 4; i++){
	                $('.content').append(get_answer_div(group,mc_answers,i,1));
	            }
	          break;
	        case 'bio':
            	var html = '<h2 data-answer="' + group[answer_index].name + '" class="question question_bio">';
            	html += 'From ' + group[answer_index].hometown + '. ';
            	if ( group[answer_index].mission != '' ) {
            		html += langs[language].mission + ': ' + group[answer_index].mission + '. ';
            	}
            	if ( group[answer_index].military != '' ) {
            		html += langs[language].military + ': ' + group[answer_index].military + '. ';
            	}
            	if ( group[answer_index].education != '' ) {
            		html += langs[language].education + ': ' + group[answer_index].education + '. ';
            	}
            	if ( group[answer_index].profession != '' ) {
            		html += langs[language].profession + ': ' + group[answer_index].profession + '. ';
            	}
            	html += '</h2>';
                $('.content').html(html);
	            for (var i = 0; i < 4; i++){
	                $('.content').append(get_answer_div(group,mc_answers,i,1));
	            }
	          break;
	        case 'reason': //order
	            $('.content').html('<h2 data-answer="' + group[answer_index].reason_called + '" class="question">' + group[answer_index].reason_called +  '</h2>');
	            for (var i = 0; i < 4; i++){
	                $('.content').append(get_answer_div(group,mc_answers,i,0));
	            }
	          break;
	        case 'agecalled': //order
	            $('.content').html('<h2 data-answer="' + group[answer_index].agecalled + '" class="question">' + group[answer_index].agecalled +  '</h2>');
	            for (var i = 0; i < 4; i++){
	                $('.content').append(get_answer_div(group,mc_answers,i,0));
	            }
	          break;
	        case 'seniority': //order
	            $('.content').html('<h2 data-answer="' + group[answer_index].name + '" class="question">Ordained ' + group[answer_index].ordained_date +  '</h2>');
	            for (var i = 0; i < 4; i++){
	                $('.content').append(get_answer_div(group,mc_answers,i,0));
	            }
	          break;
	        case 'name': //name
	            $('.content').html('<div data-answer="' + group[answer_index].name + '" class="question"><span class="img"><img src="' + group[answer_index].img + '" alt="guess my name" /></span></div>');
	            var answers = '<div class="answers">';
	            for (var i = 0; i < 4; i++){
	                answers += get_answer_div(group,mc_answers,i,0);
	            }
	            $('.content').append( answers +'</div>');
	          break;
	        case 'sort': //name
	            var sorts = '<div class="sorts">';
	            randomize(group);
	            for (var i = 0; i < group.length; i++){
	                sorts += '<div class="sort" data-id="' + i + '" data-name="' + group[i].name + '" data-order="' + group[i].order + '"><span class="img"><img src="' + group[i].img + '" /></span></div>';
	            }
	            $('.content').html( sorts + '</div>');
	            $('.content').append('<div class="answer answer_sort">' + langs[language].submit + '</div>');
	            
	            $draggable = $('.sort').draggabilly({
	            	containment: '.sorts'
	            });
	            $sorts = $('.sorts').packery({
	              'columnWidth': '.sort',
	              'rowHeight': '.sort',
	              'itemSelector': '.sort',
				  'percentPosition': true
	            });

	            $sorts.find('.sort').each( function( i, itemElem ) {
	              // make element draggable with Draggabilly
	              var draggie = new Draggabilly( itemElem );
	              // bind Draggabilly events to Packery
	              $sorts.packery( 'bindDraggabillyEvents', draggie );
	            });
	            

	            // $sorts.packery( 'on', 'layoutComplete', sort_sorted );
	            // $sorts.packery( 'on', 'dragItemPositioned', sort_sorted );
	            
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
	        	answer_div = '<div data-answer="' + group[mc_answers[index]].name + '" class="answer answer_' + index + '" data-id="' + mc_answers[index] + '" style="background-image: url(' + group[mc_answers[index]].img + ');" data-alt="' + group[mc_answers[index]].name + ' #' + group[mc_answers[index]].conference_talks + '"></div>';
	          break;
	        case 'initial': //initial
	        	answer_div = '<div data-answer="' + group[mc_answers[index]][group[mc_answers[index]].initial] + '" class="answer answer_' + index + '" data-id="' + mc_answers[index] + '" style="background-image: url(' + group[mc_answers[index]].img + ');" data-alt="' + group[mc_answers[index]].name + '"></div>';
	          break;
	        case 'military':
	        	answer_div = '<div data-answer="' + group[mc_answers[index]].military + '" class="answer answer_' + index + '" data-id="' + mc_answers[index] + '" style="background-image: url(' + group[mc_answers[index]].img + ');" data-alt="' + group[mc_answers[index]].name + '"></div>';
	          break;
	        case 'education':
	        	answer_div = '<div data-answer="' + group[mc_answers[index]].education + '" class="answer answer_' + index + '" data-id="' + mc_answers[index] + '" style="background-image: url(' + group[mc_answers[index]].img + ');" data-alt="' + group[mc_answers[index]].name + '"></div>';
	          break;
	        case 'mission':
	        	answer_div = '<div data-answer="' + group[mc_answers[index]].mission + '" class="answer answer_' + index + '" data-id="' + mc_answers[index] + '" style="background-image: url(' + group[mc_answers[index]].img + ');" data-alt="' + group[mc_answers[index]].name + '"></div>';
	          break;
	        case 'profession':
	        	answer_div = '<div data-answer="' + group[mc_answers[index]].profession + '" class="answer answer_' + index + '" data-id="' + mc_answers[index] + '" style="background-image: url(' + group[mc_answers[index]].img + ');" data-alt="' + group[mc_answers[index]].name + '"></div>';
	          break;
	        case 'reason':
	        	answer_div = '<div data-answer="' + group[mc_answers[index]].reason_called + '" class="answer answer_' + index + '" data-id="' + mc_answers[index] + '" style="background-image: url(' + group[mc_answers[index]].img + ');" data-alt="' + group[mc_answers[index]].name + '"></div>';
	          break;
	        case 'agecalled':
	        	answer_div = '<div data-answer="' + group[mc_answers[index]].agecalled + '" class="answer answer_' + index + '" data-id="' + mc_answers[index] + '" style="background-image: url(' + group[mc_answers[index]].img + ');" data-alt="' + group[mc_answers[index]].name + '"></div>';
	          break;
	        case 'face2': //name
	        	answer_div = '<div data-answer="' + group[mc_answers[index]].name + '" class="answer answer_' + index + '" data-id="' + mc_answers[index] + '" style="background-image: url(' + group[mc_answers[index]].img2 + ');" data-alt="' + group[mc_answers[index]].name + '"></div>';
	          break;
	        default: //face, bio
	            answer_div = '<div data-answer="' + group[mc_answers[index]].name + '" class="answer answer_' + index + '" data-id="' + mc_answers[index] + '" style="background-image: url(' + group[mc_answers[index]].img + ');" data-alt="' + group[mc_answers[index]].name + '"></div>';
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
    // show item order after layout
    function sort_sorted() {
    	var sorted = 0;
		var itemElems = $sorts.packery('getItemElements');
    	$( itemElems ).each( function( i, itemElem ) {
    		// console.log($(itemElem).data('order'), i);
        	if ( $(itemElem).data('order') != i + 1){
        		sorted++;
        	}
      	});
      	// console.log(sorted);
      	return(sorted);
    }

	$('.content').on('click', '.answer', function(e){
		//console.log('clicked',$(this).attr('data-id'));
		
		if ( levels[level].slug == 'sort' ) {
			
			var sorted = sort_sorted();
			
			if ( sorted == 0 ) {
				num_correct++;
				num_total++;
				
				$('.content').html('');
				
				$('.score').text( langs[language].kudos[get_random_index(langs[language].kudos)] );
				$('.score').append( ' ' + langs[language].kudos[get_random_index(langs[language].kudos)] );
				
				score_percent = parseInt(num_correct / (num_total+1)*100 );
				$('.answer').remove();
				$('.score').append('<div class="share_button" data-score="' + score_percent + '">' + langs[language].share_your_score + '!</div>');
				$('.score').append('<a class="rate_button" href="' + rate_link + '">' + langs[language].rate_app + '</a>');
				$('.score').append('<div class="play_another_level_button">' + langs[language].play_another_level + '?</div>');

			}
			else {
				
				$('.score').text( langs[language].banter[get_random_index(langs[language].banter)] );
				$('.score').append(' ' + sorted + ' ' + active_team_title + ' incorrect.' );				
				
				num_total++;
				
			}
			
			return;
		}
		
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
		        else if ( level == 5 ) {
		        	quiz_counter--;
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
		    // console.log(is_correct, num_correct, active_team.length, num_total);
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
		        quiz_counter = 0;
		        $('.score').append('<div class="play_another_level_button">' + langs[language].play_another_level + '?</div>');
		        
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
		    $('.score').append('<a class="rate_button" href="' + rate_link + '">' + langs[language].rate_app + '</a>');
		    $('.score').append('<div class="play_another_level_button">' + langs[language].play_another_level + '?</div>');


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
		        $('.score').append('<div class="play_another_level_button">' + langs[language].play_another_level + '?</div>');
		        
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
			    $('.score').append('<a class="rate_button" href="' + rate_link + '">' + langs[language].rate_app + '</a>');
			    $('.score').append('<div class="play_another_level_button">' + langs[language].play_another_level + '?</div>');

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
	
	$('.quiz').on('click touch', '.quiz', function(e){
		//set level
		$('.quiz .quiz').parent().removeClass('active');
		$(this).parent().addClass('active');
		level = $(this).data('index');
		localStorage.level = level;
		// console.log(level, levels[level][0]);
		update_group();		
		game_players();
	});
	$('.mode').on('click touch', function(e){
		$('.mode').parent().removeClass('active');
		$(this).parent().addClass('active');
		mode = $(this).data('mode');
		localStorage.mode = mode;
		// console.log('mode set to', mode);
		update_group();
		game_players();
	});
	$('.quiz_group').on('click touch', '.quiz', function(e){
		//set level
		$('.quiz_group .quiz').parent().removeClass('active');
		$(this).parent().addClass('active');
		group = $(this).data('value');
		localStorage.group = group;
		// console.log(group);
		update_group();
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
				var url = web_link;
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
		    	var message = langs[language].share_score_message_a + $('.share_button').data('score');
		    	if ( levels[level].slug == 'sort') {
		    		message += langs[language].share_score_message_b_2;
		    	} else {
		    		message += langs[language].share_score_message_b;
				}
				var subject = langs[language].share_score_subject;
				// var files = 'https://lh4.ggpht.com/2wcDkVR7qhed98APHGy9NjfFHjHmTrhrgmrnQ083sDvQVNIR6LiLsOv08X1DvgElb_E';
				var files = null;
				var url = web_link;
				window.plugins.socialsharing.share(message, subject, files, url );
		    }
		});
	
	});
	
	$('.score').on('click touch', '.play_another_level_button', function(e){
		
		$('.menu-toggle').trigger('click');
		if ( !$('#mmenu > ul > .quiz').hasClass('mm-opened') ) {
			console.log('trace');
			$('#mmenu .quiz .mm-subopen').trigger('click');
		}
		
		
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