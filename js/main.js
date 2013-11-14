$(function () {
	//object of all prophets
	//each prophet an object containing, name, birthdate, deathdate, sustaindate, order, photos, videos, audios, mantra, trivias
	var prophets = [];
	jsj = { name: 'Joseph Smith, Jr.', photo: ['JosephSmith.jpg','joseph smith.jpg','joseph-smith.jpg','JS_Bible_st.jpg'], birthdate:'December 23, 1805', deathdate:'June 27, 1844', sustaindate:'April 6, 1830', ordinal:'1'};
	by  = { name: 'Brigham Young', photo: ['BY_hero.jpg'], birthdate:'June 1, 1801', deathdate:'August 29, 1877', sustaindate:'December 27, 1847', ordinal:'2'};
	jt  = { name: 'John Taylor', photo: ['JT_hero.jpg'], birthdate:'November 1, 1808', deathdate:'July 25, 1887', sustaindate:'October 10, 1880', ordinal:'3'};
	ww  = { name: 'Wilford Woodruff', photo: ['WW_hero.jpg'], birthdate:'March 1, 1807 ', deathdate:'September 2, 1898', sustaindate:'April 7, 1889', ordinal:'4'};
	ls  = { name: 'Lorenzo Snow', photo: ['LS_hero.jpg'], birthdate:'April 3, 1814', deathdate:'October 10, 1901', sustaindate:'September 13, 1898', ordinal:'5'};
	jfs = { name: 'Joseph F. Smith', photo: ['JFS_hero.jpg'], birthdate:'November 13, 1838', deathdate:' November 19, 1918', sustaindate:'October 17, 1901', ordinal:'6'};
	hjg = { name: 'Heber J. Grant', photo: ['HJG_hero.jpg'], birthdate:'November 22, 1856', deathdate:'May 14, 1945', sustaindate:'November 23, 1918', ordinal:'7'};
	gas = { name: 'George Albert Smith', photo: ['GAS_hero.jpg'], birthdate:'April 4, 1870', deathdate:'April 4, 1951', sustaindate:'May 21, 1945', ordinal:'8'};
	dom = { name: 'David O. McKay', photo: ['DOM_hero.jpg'], birthdate:'September 8, 1873', deathdate:'January 18, 1970', sustaindate:'April 9, 1951', ordinal:'9'};
	jfis= { name: 'Joseph Fielding Smith', photo: ['JFiS_hero.jpg'], birthdate:'July 19, 1876', deathdate:'July 2, 1972', sustaindate:'January 23, 1970', ordinal:'10'};
	hbl = { name: 'Harold B. Lee', photo: ['HBL_hero.jpg'], birthdate:'March 28, 1899', deathdate:'December 26, 1973', sustaindate:'July 7, 1972', ordinal:'11'};
	swk = { name: 'Spencer W. Kimball', photo: ['SWK_hero.jpg'], birthdate:'March 28, 1895', deathdate:'November 5, 1985', sustaindate:'December 30, 1973', ordinal:'12'};
	etb = { name: 'Ezra Taft Benson', photo: ['ETB_hero.jpg'], birthdate:'August 4, 1899', deathdate:'May 30, 1994', sustaindate:'November 10, 1985', ordinal:'13'};
	hwh = { name: 'Howard W. Hunter', photo: ['HWH_hero.jpg'], birthdate:'November 14, 1907', deathdate:'March 3, 1995', sustaindate:'June 5, 1994', ordinal:'14'};
	gbh = { name: 'Gordon B. Hinckley', photo: ['GBH_hero.jpg'], birthdate:'June 23, 1910', deathdate:'January 27, 2008', sustaindate:'March 12, 1995', ordinal:'15'};
	tsm = { name: 'Thomas S. Monson', photo: ['president-thomas-s-monson-lds-gallery.jpg'], birthdate: 'August 21, 1927', deathdate: 'present', sustaindate: 'February 3, 2008', ordinal:'16'};
	prophets.push(jsj, by, jt, ww, ls, jfs, hjg, gas, dom, jfis, hbl, swk, etb, hwh, gbh, tsm);
	//object of all apostles
	//each apostle an object conaining: name, birthdate, sustaindate, position, photos, videos, audios, mantra, trivias
	var apostles = [];
	//tsm = { name: 'Thomas S. Monson', photo: ['president-thomas-s-monson-lds-gallery.jpg'], mantra: 'Rescue', birthdate: 'August 21, 1927', sustaindate: 'October 4, 1963' };
	hbe = { name: 'Henry B. Eyring', photo: ['president-henry-b-eyring-lds-gallery.jpg'], mantra: '', birthdate: 'May 31, 1933', sustaindate: 'April 1, 1995' };
	dfu = { name: 'Dieter F. Uchtdorf ', photo: ['president-dieter-f-uchtdorf-lds-gallery.jpg'], mantra: '', birthdate: 'November 6, 1940', sustaindate: 'October 2, 2004' };
	bkp = { name: 'Boyd K. Packer', photo: ['elder-boyd-k-packer-lds-gallery.jpg'], mantra: '', birthdate: 'September 10, 1924', sustaindate: 'April 9, 1970' };
	ltp = { name: 'L. Tom Perry', photo: ['elder-l-tom-perry-lds-gallery.jpg'], mantra: '', birthdate: 'August 5, 1922', sustaindate: 'April 6, 1974' };
	rmn = { name: 'Russell M. Nelson', photo: ['elder-russell-m-nelson-lds-gallery.jpg'], mantra: '', birthdate: 'September 9, 1924', sustaindate: 'April 7, 1984' };
	dho = { name: 'Dallin H. Oaks', photo: ['elder-dallin-h-oaks-lds-gallery.jpg'], mantra: '', birthdate: 'August 12, 1932', sustaindate: 'May 3, 1984' };
	mrb = { name: 'M. Russell Ballard', photo: ['elder-m-russell-ballard-lds-gallery.jpg'], mantra: '', birthdate: 'October 8, 1928', sustaindate: 'October 6, 1985' };
	rgs = { name: 'Richard G. Scott', photo: ['elder-richard-g-scott-lds-gallery.jpg'], mantra: '', birthdate: 'November 7, 1928', sustaindate: 'October 1, 1983' };
	rdh = { name: 'Robert D. Hales', photo: ['elder-robert-d-hales-lds-gallery.jpg'], mantra: '', birthdate: 'August 24, 1932', sustaindate: 'April 2, 1994' };
	jrh = { name: 'Jeffrey R. Holland', photo: ['elder-jeffrey-r-holland-lds-gallery.jpg'], mantra: '', birthdate: 'December 3, 1940', sustaindate: 'April 1, 1989' };
	dab = { name: 'David A. Bednar', photo: ['elder-david-a-bednar-lds-gallery.jpg'], mantra: '', birthdate: 'June 15, 1952', sustaindate: 'October 7, 2004' };
	qlc = { name: 'Quentin L. Cook', photo: ['elder-quentin-l-cook-lds-gallery.jpg'], mantra: '', birthdate: 'September 8, 1940', sustaindate: 'October 6, 2007' };
	dtc = { name: 'D. Todd Christofferson', photo: ['elder-d-todd-christofferson-lds-gallery.jpg'], mantra: '', birthdate: 'January 24, 1945', sustaindate: 'April 5, 2008' };
	nla = { name: 'Neil L. Andersen', photo: ['elder-neil-l-andersen-lds-gallery.jpg'], mantra: '', birthdate: 'August 9, 1951', sustaindate: 'April 4, 2009' };

	apostles.push(hbe, dfu, bkp, ltp, rmn, dho, mrb, rgs, rdh, jrh, dab, qlc, dtc, nla);

	var both = [];
	both.push(hbe, dfu, bkp, ltp, rmn, dho, mrb, rgs, rdh, jrh, dab, qlc, dtc, nla, jsj, by, jt, ww, ls, jfs, hjg, gas, dom, jfis, hbl, swk, etb, hwh, gbh, tsm);

	var completed = [];
	var	num_total = 0;
	var num_correct = 0;
	var img_iteration = 0;

	function new_question(){
		
		if( $('body').hasClass('apostles') ){
			make_question(apostles, get_random_index(apostles));
		}
		else if( $('body').hasClass('prophets') ){
			make_question(prophets, get_random_index(prophets));
		}
		else if( $('body').hasClass('both') ){
			make_question(both, get_random_index(both));
		}
	}
	function make_question(group, answer_index){
		//get mc answers
		var mc_answers = get_random_mc_answers(group, answer_index);
		$('.quiz').html('<h2 class="question">Find ' + group[answer_index].name + '</h2>');
		for (var i = 0; i < 4; i++){
			$('.quiz').append(get_answer_div(group,mc_answers,i,0));
			// if(i == answer_index) {
			// 	$('.answer_'+i).parent().addClass('correct');
			// }
		}
		var correct = $.inArray(answer_index, mc_answers);
		$('.answer_'+correct).parent().addClass('correct');
		//$('.quiz').append('<div class="next">Next Question > </div>');
	}
	function get_answer_div(group, mc_answers, index, img){
		return '<div class="answer"><img class="answer_'+index+'" src="img/'+group[mc_answers[index]].photo[img]+'" alt="'+group[mc_answers[index]].name+'" data-id="'+mc_answers[index]+'" /></div>';
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
	function get_random_index(group){
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
			return get_random_index(group);
		}
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



	$('.quiz').on('click', '.answer', function(e){
		$(this).addClass('clicked');
		if ( $(this).hasClass('correct') ){
			//calculate total
			var num_clicked = $('.clicked').length;
			if ( num_clicked < 2){
				num_correct++;
				//add correct to completed list
				completed.push( parseInt($(this).find('img').attr('data-id')) );
			}
			num_total++;
			$('.score').html('<h3>'+ num_correct +' of '+num_total+' correct');
			//advance to next question
			setTimeout(function() {
  				new_question();
			}, 1000);
		}
		else {
			$(this).prepend( '<p class="label">' + $(this).find('img').attr('alt') +'</p>' );
		}
	});
	$('.quiz').on('click', '.next', function(e){
		new_question();
	});

	new_question();

	$('.nav_apostles').on('click', function(e){
		$('body').addClass('apostles').removeClass('prophets').removeClass('study');
		$('.list').addClass('quiz').removeClass('list');
		new_question();
	});

	$('a.nav_prophets').on('click', function(e){
		$('body').removeClass('apostles').addClass('prophets').removeClass('study');
		$('.list').addClass('quiz').removeClass('list');
		new_question();
	});

	$('a.nav_study').on('click', function(e){
		$('body').removeClass('apostles').removeClass('prophets').addClass('study');
		$('.quiz').html('<div class="study_list_prophets"></div><div class="study_list_apostles"></div>').removeClass('quiz').addClass('list');
		init_study();
	});

	function init_study(){
		//study
		$('.study_list_prophets').html('');
		for ( var i=0; i<prophets.length; i++){
			var html = '<div class="profile"><div class="answer"><img src="img/' + prophets[i].photo[0] + '" alt="' + prophets[i].name + '" data-id="' + i + '" /><p class="label">' + prophets[i].name + '</p></div>';
			html += '<div class="stats">Born: ' + prophets[i].birthdate + '<br />';
			html += 'President: ' + prophets[i].sustaindate + ' - ' + prophets[i].deathdate + '</div></div>';
			$('.study_list_prophets').append(html);
		}


		$('.study_list_apostles').html('');
		for ( var i=0; i<apostles.length; i++){
			var html = '<div class="profile"><div class="answer"><img src="img/'+apostles[i].photo[0]+'" alt="'+apostles[i].name+'" data-id="'+i+'" /><p class="label">'+apostles[i].name+'</p></div>';
			html += '<div class="stats">Born: ' + apostles[i].birthdate + '<br />';
			html += 'Called: ' + apostles[i].sustaindate + '</div></div>';
			$('.study_list_apostles').append(html);
		}
	}
	//click images to load more
});