
if (!window.console) console = {log: function() {}};

$(function () {

    //reset
    //localStorage.setItem("unlocked", 1);
    
    //save the unlocked level in local storage, then as they unlock levels they will stay unlocked.
    //first play unlocked will be 0. when unlocked is 0, just start the first level without showing the list? Or gray out the other levels. Incentivise them to beat levels.
    //require a certain % or cpm rate to pass?
    var unlocked = localStorage.getItem("unlocked");



	$('#mmenu').mmenu({
		slidingSubmenus: false,
		onClick: {
			setSeleted: false,
			preventDefault: null,
			close: true
		}
	});
	
    //once a level is chosen, display a title card with quick instructions to the topic of the quiz level. Remind how the quiz works. Then the quiz can be minimal text and explanation.
    var active_group = apostles;
    var active_group_title = 'Apostle';
    var completed = [];
    var num_total = 0;
    var num_correct = 0;
    var level = 0;
    var num_levels = 4;
    if (unlocked){
        num_levels = unlocked;
    }
    var levels = [
        ['Face to the Name', "You'll be given a name and 4 faces. Select the correct face for that name. To finish the quiz you must correctly know all the faces, on your first answer. If you miss, keep guessing until you get it right (and learn) because the name will come again during your quiz. The more you get wrong, the longer the quiz gets.", "name", "photo[0]"],
        ['Name that Face', "You'll be given a face and 4 names. Select the correct name for the face. To finish the quiz you must correctly know all the names, on your first answer. If you miss, keep guessing until you get it right (and learn) because the face will come again during your quiz.", "photo[0]", "name"],
        ['When they were young(er)',"You'll be given a name and 4 faces of when they were younger. Select the correct face for the name. To finish the quiz you must correctly know all the faces, on your first answer.", "name", "photo[1]"],
        ['Who Came First', "You'll be asked about which leader was called first, and second and so on. These questions are in order, but you still need to answer them all correctly. If you miss, keep guessing until you get it right and the quiz will continue.", "ordinal", "photo[0]"]
        
    ];
    /*  
        ['Last Conference', "You'll be given a topic or conference talk title. Select the face of who gave that talk in their last General Conference appearance. To finish the quiz you must correctly know all the topics, on your first answer. Need help? Go check out the latest conference!", "photo[0]", "conference"],
        ['Career'],
        ['Mantra']
    */
    var start_time = new Date();
    var end_time = new Date();
    var seconds = 0; // (start_time - end_time)/-1000;
    var perfect = ['Perfect!', 'Thou art the Man!', 'Flawless!', 'Amazing!', 'On a Roll!', 'Impeccable!', 'Inspired!', 'Superb!', 'Unblemished!', '=D'];
    var kudos =  ['Great!', 'Awesome!', 'Well done,', 'You\'re Smart,', 'Crazy Good!', 'Feelin\' it!', 'Dynamite!', 'Gold Star!', 'Impressive!', 'Exactly!', 'Correct!', '=)', 'Bingo!', 'On the nose!', 'Right!', 'Right on!', 'Righteous!', '', 'Inspiring!', 'Precisely!', 'Exactly!', 'Right as Rain!', ''];
    var banter = ['Ouch!', 'Doh!', 'Focus, only', 'Finger Slip?', 'Don\'t Give Up!', 'Good Grief!', 'Embarrasing!', 'Wrong!', 'Guessing?', 'Nobody\'s Perfect', 'Incorrect!', '=(', 'You Blew It!', 'Negative!', 'You Must Be Joking!', 'Woah!', 'Need Help?', 'Try Studying,', 'Incorrect!', 'False!', 'Make sure to keep your eyes open.', 'Try Again,', 'Two wrongs does not make a right.', 'Nice try, '];

    function new_question(){
        
        if( active_group == apostles ){

            if (levels[level][0] == 'Who Came First' ){ //go in order if asking about order
                var order_array = active_group;
                order_array.sort(function(a, b){ return parseInt(a.ordinal) - parseInt(b.ordinal); });
                active_group = order_array;
                make_question(active_group, num_correct);
                //console.log(num_correct);
            }
            else{ //random order
                make_question(active_group, get_random_groupindex(active_group));
            }
        }
        else if( active_group == prophets ){

            if (levels[level][0] == 'Who Came First' ){ //go in order if asking about order
                make_question(active_group, num_correct);
            }
            else{
                make_question(active_group, get_random_groupindex(active_group));
            }
        }
    }
    function make_question(group, answer_index){
        //get mc answers
        var mc_answers = get_random_mc_answers(group, answer_index);
        switch(levels[level][0]) {
            case 'Face to the Name': //photo
                $('.quiz').html('<h2 class="question">' + group[answer_index].name + '</h2>');
                for (var i = 0; i < 4; i++){
                    $('.quiz').append(get_answer_div(group,mc_answers,i,2));
                } 
              break;
            case 'Last Conference': //photo
                $('.quiz').html('<h2 class="question">' + group[answer_index].conference + '</h2>');
                for (var i = 0; i < 4; i++){
                    $('.quiz').append(get_answer_div(group,mc_answers,i,0));
                } 
              break;
            case 'When they were young(er)': //young photo
                $('.quiz').html('<h2 class="question">' + group[answer_index].name + '</h2>');
                for (var i = 0; i < 4; i++){
                    $('.quiz').append(get_answer_div(group,mc_answers,i,1));
                }
              break;
            case 'Who Came First': //order
                $('.quiz').html('<h2 class="question">Called ' + group[answer_index].ordinal +  '</h2>');
                for (var i = 0; i < 4; i++){
                    $('.quiz').append(get_answer_div(group,mc_answers,i,0));
                }
              break;
            case 'Name that Face': //name
                $('.quiz').html('<div class="question"><span class="img"><img src="img/' + group[answer_index].photo[0] + '" alt="guess my name" /></span></div>');
                var answers = '<div class="answers">';
                for (var i = 0; i < 4; i++){
                    answers += get_answer_div(group,mc_answers,i,0);
                }
                $('.quiz').append( answers +'</div>');
              break;
            default:
              //error
        }
        

        var correct = $.inArray(answer_index, mc_answers);
        $('.answer_'+correct).parent().addClass('correct');
    }
    function get_answer_div(group, mc_answers, index, img){
        var answer_div = "";
        switch(levels[level][0]) {
            //photo and young photo as default
            case 'Who Came First': //order
                answer_div = '<div class="answer" data-id="' + mc_answers[index] + '"><img class="answer_' + index + '" src="img/' + group[mc_answers[index]].photo[img] + '" alt="' + group[mc_answers[index]].name + ', ' + group[mc_answers[index]].ordinal  + '" /></div>';
              break;
            case 'Name that Face': //name
                answer_div = '<div class="answer answer_name" data-id="' + mc_answers[index] + '"><p class="answer_' + index + ' label">' + group[mc_answers[index]].name + '</p></div>';
              break;
            default: //photo, young photo
                answer_div = '<div class="answer" data-id="' + mc_answers[index] + '"><img class="answer_' + index + '" src="img/' + group[mc_answers[index]].photo[img] + '" alt="' + group[mc_answers[index]].name + '" /></div>';
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
            //console.log('potential repeat found');
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


    $('.main').on('click', '.quiz .answer', function(e){
        $(this).addClass('clicked');
        var is_correct = false;
            end_time = new Date();
            time = start_time - end_time;

        if ( $(this).hasClass('correct') ){
            is_correct = true;
            //calculate total clicked answers for this question
            var num_clicked = $('.clicked').length;
            if ( num_clicked == 1 || levels[level][0] == 'Who Came First'){
                //console.log('correct logged for ' + $(this).find('img').attr('alt'));
                //add correct to completed list - it there are no other previous wrong answers
                completed.push( parseInt($(this).attr('data-id')) );
                num_correct++;
            }
        }
        
        if( $(this).find('img').attr('alt') != undefined ) {
            $(this).prepend( '<p class="label">' + $(this).find('img').attr('alt') +'</p>' );
        }

            end_time = new Date();
            seconds = Math.floor( (start_time - end_time ) / -1000);
            var correct_per_minute = Math.round( (num_correct / seconds ) * 60 );
        //console.log( correct_per_minute );
        //update score + feedback
        $('.score').html('<h3/>');
        //if round complete
        //console.log(is_correct, num_correct, active_group.length, num_total);
        if( is_correct && num_correct == active_group.length ) {
            // _gaq.push(['_trackEvent', 'Answer', 'correct', $(this).find('img').attr('alt') ]);
            // _gaq.push(['_trackEvent', 'Level', 'finish', levels[level][0], correct_per_minute ]);

            $('.score h3').html(kudos[get_random_index(kudos)] + ' You Know All ' + active_group.length + '! ');
            $('.score h3').append( parseInt(num_correct / (num_total+1)*100 ) + '% Accuracy! ');
            //$('.score h3').append('That\'s a rate of '+ correct_per_minute + ' correct answers a minute!');
            completed.length = 0;
            num_total = -1;
            num_correct = 0;
            is_correct = false;
            if(level+1 == num_levels && num_levels < levels.length) {
                num_levels++;
                localStorage.setItem("unlocked", num_levels);
                $('.score h3').append('<h3 class="level_complete">You unlocked a new level!</h3>');
                //console.log('new level unlocked: '+num_levels);
            }
            else{
                $('.score h3').append('<h3 class="level_complete">Play another level?</h3>');
            }
            level = 0;
            //init_levels();
            $('.quiz').html('');
        }
        //perfect score
        else if ( is_correct && num_correct > num_total ){
            $('.score h3').append(perfect[get_random_index(perfect)]);
            $('.score h3').append(' You know ' + num_correct + ' ' + active_group_title );
            if (num_correct > 1){ $('.score h3').append('s'); }
            $('.score h3').append( '! ' + parseInt(active_group.length - completed.length)  + ' left. ');
            //$('.score h3').append( seconds + ' seconds! ');
            // _gaq.push(['_trackEvent', 'Answer', 'correct', $(this).find('img').attr('alt') ]);
        }
        //correct answer
        else if (is_correct){
            $('.score h3').append(kudos[get_random_index(kudos)]);
            $('.score h3').append(' You know ' + num_correct + ' ' + active_group_title );
            if (num_correct > 1){ $('.score h3').append('s'); }
            $('.score h3').append( '! ' + parseInt(active_group.length - completed.length)  + ' left. ');
            //$('.score h3').append( seconds + ' seconds! ');
            // _gaq.push(['_trackEvent', 'Answer', 'correct', $(this).find('img').attr('alt') ]);
        }
        //incorrect answer
        else{
            $('.score h3').append(banter[get_random_index(banter)]);
            $('.score h3').append(' You know ' + num_correct + ' ' + active_group_title );
            if (num_correct > 1){ $('.score h3').append('s'); }
            $('.score h3').append( '! ' + parseInt(active_group.length - completed.length)  + ' left. ');
            //$('.score h3').append( seconds + ' seconds! ');
            // _gaq.push(['_trackEvent', 'Answer', 'incorrect', $(this).find('img').attr('alt') +' mistaken for ' + $(this).parent().find('.correct img').attr('alt') ]);
        }

        num_total++;

        if( is_correct ){
            //num_total++;
            //advance to next question
            setTimeout(function() {
                new_question();
            }, 750);
        }
    });
    $('.quiz').on('click', '.next', function(e){
        new_question();
    });


    $('.nav_apostles').on('click', function(e){
        $('body').addClass('apostles').removeClass('prophets').removeClass('study');
        $('.study_list').addClass('quiz').removeClass('study_list');
        $('.quiz').html('');
        $('.score').html('');
        init_levels();
        active_group = apostles;
        active_group_title = 'Apostle';
    });

    $('a.nav_prophets').on('click', function(e){
        $('body').removeClass('apostles').addClass('prophets').removeClass('study');
        $('.study_list').addClass('quiz').removeClass('study_list');
        $('.quiz').html('');
        $('.score').html('');
        init_levels();
        active_group = prophets;
        active_group_title = 'Prophet';
    });

    $('a.nav_study').on('click', function(e){
        $('body').removeClass('apostles').removeClass('prophets').addClass('study');
        $('.quiz').html('');
        $('.quiz').removeClass('quiz').addClass('study_list');
        $('.study_list').html('<div class="study_list_apostles"></div><div class="study_list_prophets"></div>');
        completed.length = 0;
        num_total = 0;
        num_correct = 0;
        $('.score').html('');
        init_study();
    });

    function init_study(){
        //study
        $('.study_list_apostles').html('<h3>Apostles</h3>');
            for ( var i=0; i<apostles.length; i++){
                var html = '<div class="profile is_odd_' +  i % 2 + '">';
                html += '<div class="answer">';
                html += '<img class="photo_young" src="img/'+apostles[i].photo[1]+'" alt="'+apostles[i].name+'" data-id="'+i+'" />';
                html += '<img class="photo " src="img/'+apostles[i].photo[0]+'" alt="'+apostles[i].name+'" data-id="'+i+'" />';
                html += '</div>';
                html += '<div class="stats">';
                html += '<p class="label">'+apostles[i].name+'</p>';
                //html += '<span class="stat stat_birth">Born: ' + apostles[i].birthdate + '.</span>';
                if( apostles[i].position ){
                    html += '<span class="stat stat_position">' + apostles[i].position + ', </span>';
                }
                html += '<span class="stat stat_sustained">' + apostles[i].ordinal + ' Sustained (' + apostles[i].sustaindate + ')</span>';
                html += '</div>';
                $('.study_list_apostles').append(html);
            }
        
        $('.study_list_prophets').html('<h3>Prophets</h3>');
            for ( var i=0; i<prophets.length; i++){
                var html = '<div class="profile is_odd_' +  i % 2 + '">';
                html += '<div class="answer">';
                html += '<img class="photo_young" src="img/'+prophets[i].photo[1]+'" alt="'+prophets[i].name+'" data-id="'+i+'" />';
                html += '<img class="photo " src="img/'+prophets[i].photo[0]+'" alt="'+prophets[i].name+'" data-id="'+i+'" />';
                html += '</div>';
                html += '<div class="stats">';
                html += '<p class="label">'+prophets[i].name+'</p>';
                html += '<span class="stat stat_sustained">' + prophets[i].ordinal + ' Sustained (' + prophets[i].sustaindate + ')</span>';
                html += '</div>';
                $('.study_list_prophets').append(html);
            }
        
    }
    //click images to show more info


    function init_levels(){
        var html = '<div class="levels">';
        for (var i = 0; i < levels.length; i++) {
            var islocked = 'unlocked';
            if (i >= num_levels){ islocked = 'locked'; }
            html += '<div class="level_select ' + islocked + '" data-level="' + i + '">' + levels[i][0] + '</div>';
        }
        html += '</div>';
        $('.quiz').html(html);
    }

    init_levels();
    $('.nav_apostles').click();
    //alert(unlocked);

    $('.quiz').on('click', '.level_select.unlocked', function(e){
        level = parseInt( $(this).attr('data-level') );
        //console.log('level', level, 'chosen');
        $('.quiz').html("<h2 class='level_name'>" + levels[level][0] + "</h2><h3 class='level_intro'>" + levels[level][1] + "</h3><h3 class='level_start'>Begin</h3>");
    });
    $('.quiz').on('click', '.level_start', function(e){
        // _gaq.push(['_trackEvent', 'Level', 'start', $(this).text() ]);
        //start quiz
        start_time = new Date();
        completed.length = 0;
        num_total = 0;
        num_correct = 0;
        new_question();
        $('.score').html('<h3>Do you know all ' + active_group.length + ' ' + active_group_title + 's?</h3>');
    });
    $('.score').on('click', '.level_complete', function(e){
        init_levels();
        $('.score').html('');
    });

    $('.main').on('click', '.study_list .answer', function(e){
        $(this).find('.photo').toggleClass('hidden');
    });

});