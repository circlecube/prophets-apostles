var current_leaders = [
/*//
	{
		'name': 'NAME',
		'first_name': 'FIRSTNAME',
		'middle_name': 'MIDDLENAME',
		'last_name': 'LASTNAME',
		'initial': 'middle_name',
		'position': 'Apostle',
		'birthdate': 'BIRTHDATE',
		'ordained_date': 'ORDAINED_DATE',
		'ordinal': 'NUMBER',
		'deathdate': null,
		'hometown': 'HOMETOWN',
		'img': 'portrait.jpg',
		'img_young': 'img2.jpg',
		'conference_talks': '',
	},
//*/
	{
		'name': 'Thomas S. Monson',
		'first_name': 'Thomas',
		'middle_name': 'Spencer',
		'last_name': 'Monson',
		'initial': 'middle_name',
		'position': 'President',
		'birthdate': 'August 21, 1927',
		'ordained_date': 'October 4, 1963',
		'ordinal': '1st',
		'deathdate': null,
		'hometown': 'Salt Lake City, Utah',
		'img': 'thomas-s-monson-large.jpg',
		'img_young': 'Thomas-S-Monson-1937.jpg',
		'conference_talks': '220',
	},
	{
		'name': 'Henry B. Eyring',
		'first_name': 'Henry',
		'middle_name': 'Bennion',
		'last_name': 'Eyring',
		'initial': 'middle_name',
		'position': 'First Counselor, First Presidency',
		'birthdate': 'May 31, 1933',
		'ordained_date': 'April 1, 1995',
		'ordinal': '10th',
		'deathdate': null,
		'hometown': 'Princeton, New Jersey',
		'img': 'henry-b-eyring-large.jpg',
		'img_young': 'Henry_B_Eyring2.jpg',
		'conference_talks': '70',
	},
	{
		'name': 'Dieter F. Uchtdorf',
		'first_name': 'Dieter',
		'middle_name': 'Friedrich',
		'last_name': 'Uchtdorf',
		'initial': 'middle_name',
		'position': 'Second Counselor, First Presidency',
		'birthdate': 'November 6, 1940',
		'ordained_date': 'October 2, 2004',
		'ordinal': '11th',
		'deathdate': null,
		'hometown': 'Ostrava, Czechoslovakia',
		'img': 'dieter-f-uchtdorf-large.jpg',
		'img_young': 'dieter-uctdorf-german-air-force.jpg',
		'conference_talks': '',
	},
	{
		'name': 'Boyd K. Packer',
		'first_name': 'Boyd',
		'middle_name': 'Kenneth',
		'last_name': 'Packer',
		'initial': 'middle_name',
		'position': 'President, Quorum of the Twelve Apostles',
		'birthdate': 'September 10, 1924',
		'ordained_date': 'April 9, 1970',
		'ordinal': '2nd',
		'deathdate': null,
		'hometown': 'Brigham City, Utah',
		'img': 'boyd-k-packer-large.jpg',
		'img_young': 'packer-bio-world-war-two.jpg',
		'conference_talks': '',
	},
	{
		'name': 'L. Tom Perry',
		'first_name': 'Lowell',
		'middle_name': 'Tom',
		'last_name': 'Perry',
		'initial': 'first_name',
		'position': 'Apostle',
		'birthdate': 'August 5, 1922',
		'ordained_date': 'April 6, 1974',
		'ordinal': '3rd',
		'deathdate': null,
		'hometown': 'Logan, Utah',
		'img': 'l-tom-perry-large.jpg',
		'img_young': 'l-tom-perry-marines.jpg',
		'conference_talks': '',
	},
	{
		'name': 'Russell M. Nelson',
		'first_name': 'Russell',
		'middle_name': 'Marion',
		'last_name': 'Nelson',
		'initial': 'middle_name',
		'position': 'Apostle',
		'birthdate': 'September 9, 1924',
		'ordained_date': 'April 7, 1984',
		'ordinal': '4th',
		'deathdate': null,
		'hometown': 'Salt Lake City, Utah',
		'img': 'russell-m-nelson-large.jpg',
		'img_young': 'russell-nelson-army.jpg',
		'conference_talks': '',
	},
	{
		'name': 'Dallin H. Oaks',
		'first_name': 'Dallin',
		'middle_name': 'Harris',
		'last_name': 'Oaks',
		'initial': 'middle_name',
		'position': 'Apostle',
		'birthdate': 'August 12, 1932',
		'ordained_date': 'May 3, 1984',
		'ordinal': '5th',
		'deathdate': null,
		'hometown': 'Provo, Utah',
		'img': 'dallin-h-oaks-large.jpg',
		'img_young': 'dallin-h-oaks.jpg',
		'conference_talks': '',
	},
	{
		'name': 'M. Russell Ballard',
		'first_name': 'Melvin',
		'middle_name': 'Russell',
		'last_name': 'Ballard',
		'initial': 'first_name',
		'position': 'Apostle',
		'birthdate': 'October 8, 1928',
		'ordained_date': 'October 10, 1985',
		'ordinal': '6th',
		'deathdate': null,
		'hometown': 'Salt Lake City, Utah',
		'img': 'm-russell-ballard-large.jpg',
		'img_young': 'russell-ballard-boy.jpg',
		'conference_talks': '',
	},
	{
		'name': 'Richard G. Scott',
		'first_name': 'Richard',
		'middle_name': 'Gordon',
		'last_name': 'Scott',
		'initial': 'middle_name',
		'position': 'Apostle',
		'birthdate': 'November 7, 1928',
		'ordained_date': 'October 1, 1988',
		'ordinal': '7th',
		'deathdate': null,
		'hometown': 'Pocatello, Idaho',
		'img': 'richard-g-scott-large.jpg',
		'img_young': 'richard-g-scott-navy.jpg',
		'conference_talks': '',
	},
	{
		'name': 'Robert D. Hales',
		'first_name': 'Robert',
		'middle_name': 'Dean',
		'last_name': 'Hales',
		'initial': 'middle_name',
		'position': 'Apostle',
		'birthdate': 'August 24, 1932',
		'ordained_date': 'April 2, 1994',
		'ordinal': '8th',
		'deathdate': null,
		'hometown': 'New York City, New York',
		'img': 'robert-d-hales-large.jpg',
		'img_young': 'robert-hales-boy.jpg',
		'conference_talks': '',
	},
	{
		'name': 'Jeffrey R. Holland',
		'first_name': 'Jeffrey',
		'middle_name': 'Roy',
		'last_name': 'Holland',
		'initial': 'middle_name',
		'position': 'Apostle',
		'birthdate': 'December 3, 1940',
		'ordained_date': 'June 23, 1994',
		'ordinal': '9th',
		'deathdate': null,
		'hometown': 'St George, Utah',
		'img': 'jeffrey-r-holland-large.jpg',
		'img_young': 'jeffery-r-holland-young.jpg',
		'conference_talks': '',
	},
	{
		'name': 'David A. Bednar',
		'first_name': 'David',
		'middle_name': 'Allan',
		'last_name': 'Bednar',
		'initial': 'middle_name',
		'position': 'Apostle',
		'birthdate': 'June 15, 1952',
		'ordained_date': 'October 2, 2004',
		'ordinal': '12th',
		'deathdate': null,
		'hometown': 'San Leandro, California',
		'img': 'david-a-bednar-large.jpg',
		'img_young': 'david-bednar-boy.jpg',
		'conference_talks': '',
	},
	{
		'name': 'Quentin L. Cook',
		'first_name': 'Quentin',
		'middle_name': 'LaMar',
		'last_name': 'Cook',
		'initial': 'middle_name',
		'position': 'Apostle',
		'birthdate': 'September 8, 1940',
		'ordained_date': 'October 6, 2007',
		'ordinal': '13th',
		'deathdate': null,
		'hometown': 'Logan, Utah',
		'img': 'quentin-l-cook-large.jpg',
		'img_young': 'quentin-cook-boy.jpg',
		'conference_talks': '',
	},
	{
		'name': 'D. Todd Christofferson',
		'first_name': 'David',
		'middle_name': 'Todd',
		'last_name': 'Christofferson',
		'initial': 'first_name',
		'position': 'Apostle',
		'birthdate': 'January 24, 1945',
		'ordained_date': 'April 5, 2008',
		'ordinal': '14th',
		'deathdate': null,
		'hometown': 'Pleasant Grove, Utah',
		'img': 'd-todd-christofferson-large.jpg',
		'img_young': 'todd-christofferson-boy.jpg',
		'conference_talks': '',
	},
	{
		'name': 'Neil L. Andersen',
		'first_name': 'Neil',
		'middle_name': 'Linden',
		'last_name': 'Andersen',
		'initial': 'middle_name',
		'position': 'Apostle',
		'birthdate': 'August 9, 1951',
		'ordained_date': 'April 4, 2009',
		'ordinal': '15th',
		'deathdate': null,
		'hometown': 'Logan, Utah',
		'img': 'neil-l-andersen-large.jpg',
		'img_young': 'neil-l-andersen-missionary.jpg',
		'conference_talks': '',
	},
];

var latter_day_prophets = [
/*//
	{
		'name': 'NAME',
		'first_name': 'FIRSTNAME',
		'middle_name': 'MIDDLENAME',
		'last_name': 'LASTNAME',
		'initial': 'middle_name',
		'position': 'President',
		'birthdate': 'BIRTHDATE',
		'ordained_date': 'ORDAINED_DATE',
		'deathdate': 'DEATHDATE',
		'ordinal': 'NUMBER',
		'hometown': 'HOMETOWN',
		'img': 'portrait.jpg',
		'img_young': 'img2.jpg',
		'conference_talks': '',
	},
//*/
	{
		'name': 'Thomas S. Monson',
		'first_name': 'Thomas',
		'middle_name': 'Spencer',
		'last_name': 'Monson',
		'initial': 'middle_name',
		'position': 'President',
		'birthdate': 'August 21, 1927',
		'ordained_date': 'October 4, 1963',
		'ordinal': '1st',
		'deathdate': null,
		'hometown': 'Salt Lake City, Utah',
		'img': 'thomas-s-monson-large.jpg',
		'img_young': 'Thomas-S-Monson-1937.jpg',
		'conference_talks': '220',
	},
	{
		'name': 'Gordon B. Hinckley',
		'first_name': 'Gordon',
		'middle_name': 'Bitner',
		'last_name': 'Hinckley',
		'initial': 'middle_name',
		'position': 'President',
		'birthdate': 'June 23, 1910',
		'ordained_date': 'March 12, 1995',
		'deathdate': 'January 27, 2008',
		'ordinal': '15th',
		'hometown': 'Salt Lake City, Utah',
		'img': 'GBH-Hinckley2_st.jpg',
		'img_young': 'GBH-portrait_1959_st.jpg',
		'conference_talks': '',
	},
	{
		'name': 'Howard W. Hunter',
		'first_name': 'Howard',
		'middle_name': 'William',
		'last_name': 'Hunter',
		'initial': 'middle_name',
		'position': 'President',
		'birthdate': 'November 14, 1907',
		'ordained_date': 'June 5, 1994',
		'deathdate': 'March 3, 1995',
		'ordinal': '14th',
		'hometown': 'Boise, Idaho',
		'img': 'HWH-21_st.jpg',
		'img_young': 'HWH-20_st.jpg',
		'conference_talks': '',
		'profession': 'Lawyer'
	},
	{
		'name': 'Ezra Taft Benson',
		'first_name': 'Ezra',
		'middle_name': 'Taft',
		'last_name': 'Benson',
		'initial': null,
		'position': 'President',
		'birthdate': 'August 4, 1899',
		'ordained_date': 'November 10, 1985',
		'deathdate': 'May 30, 1994',
		'ordinal': '13th',
		'hometown': 'Whitney, Idaho',
		'img': 'ETB_Ezra-T-Benson_st.jpg',
		'img_young': 'ETB_p5216_9_710_st.jpg',
		'conference_talks': '',
	},
	{
		'name': 'Spencer W. Kimball',
		'first_name': 'Spencer',
		'middle_name': 'Woolley',
		'last_name': 'Kimball',
		'initial': 'middle_name',
		'position': 'President',
		'birthdate': 'March 28, 1895',
		'ordained_date': 'December 30, 1973',
		'deathdate': 'November 5, 1985',
		'ordinal': '12th',
		'hometown': 'Salt Lake City, Utah',
		'img': 'SWK-2_st.jpg',
		'img_young': 'SWK_ca-1950-60_st.jpg',
		'conference_talks': '',
	},
	{
		'name': 'Harold B. Lee',
		'first_name': 'Harold',
		'middle_name': 'Bingham',
		'last_name': 'Lee',
		'initial': 'middle_name',
		'position': 'President',
		'birthdate': 'March 28, 1899',
		'ordained_date': 'July 7, 1972',
		'deathdate': 'December 26, 1973',
		'ordinal': '11th',
		'hometown': 'Clifton, Idaho',
		'img': 'HBL_standing-by-globe_st.jpg',
		'img_young': 'HBL_1936_p6581_1_st.jpg',
		'conference_talks': '',
	},
	{
		'name': 'Joseph Fielding Smith',
		'first_name': 'Joseph',
		'middle_name': 'Fielding',
		'last_name': 'Smith',
		'initial': null,
		'position': 'President',
		'birthdate': 'July 19, 1876',
		'ordained_date': 'January 23, 1970',
		'deathdate': 'July 2, 1972',
		'ordinal': '10th',
		'hometown': 'Salt Lake City, Utah',
		'img': 'JFiS_Pres-apr-23-1970_st.jpg',
		'img_young': 'JFiSmith_1923_st.jpg',
		'conference_talks': '',
	},
	{
		'name': 'David O. McKay',
		'first_name': 'David',
		'middle_name': 'Oman',
		'last_name': 'McKay',
		'initial': 'middle_name',
		'position': 'President',
		'birthdate': 'September 8, 1873',
		'ordained_date': 'April 9, 1951',
		'deathdate': 'January 18, 1970',
		'ordinal': '9th',
		'hometown': 'Huntsville, Alabama',
		'img': 'DOM_mm2_st.jpg',
		'img_young': 'DOM_mm5_st.jpg',
		'conference_talks': '',
	},
	{
		'name': 'George Albert Smith',
		'first_name': 'George',
		'middle_name': 'Albert',
		'last_name': 'Smith',
		'initial': 'middle_name',
		'position': 'President',
		'birthdate': 'April 4, 1870',
		'ordained_date': 'May 21, 1945',
		'deathdate': 'April 4, 1951',
		'ordinal': '8th',
		'hometown': 'Salt Lake City, Utah',
		'img': 'GAS_mm1_st.jpg',
		'img_young': 'GAS_mm9_st.jpg',
		'conference_talks': '',
	},
	{
		'name': 'Heber J. Grant',
		'first_name': 'Heber',
		'middle_name': 'Jeddy',
		'last_name': 'Grant',
		'initial': 'middle_name',
		'position': 'President',
		'birthdate': 'November 22, 1856',
		'ordained_date': 'November 23, 1918',
		'deathdate': 'May 14, 1945',
		'ordinal': '7th',
		'hometown': 'Salt Lake City, Utah',
		'img': 'HJG_mm11_st.jpg',
		'img_young': 'HJG_mm2_st.jpg',
		'conference_talks': '',
	},
	{
		'name': 'Joseph F. Smith',
		'first_name': 'Joseph',
		'middle_name': 'Fielding',
		'last_name': 'Smith',
		'initial': 'middle_name',
		'position': 'President',
		'birthdate': 'November 13, 1838',
		'ordained_date': 'October 17, 1901',
		'deathdate': 'November 19, 1918',
		'ordinal': '6th',
		'hometown': 'Far West, Missouri',
		'img': 'JFS_mm2_st.jpg',
		'img_young': 'JFS_mm5_st.jpg',
		'conference_talks': '',
	},
	{
		'name': 'Lorenzo Snow',
		'first_name': 'Lorenzo',
		'middle_name': null,
		'last_name': 'Snow',
		'initial': null,
		'position': 'President',
		'birthdate': 'April 3, 1814',
		'ordained_date': 'September 13, 1898',
		'deathdate': 'October 10, 1901',
		'ordinal': '5th',
		'hometown': 'Mantua, Ohio',
		'img': 'LS_mm2_st.jpg',
		'img_young': 'LS_mm4_st.jpg',
		'conference_talks': '',
	},
	{
		'name': 'Wilford Woodruff',
		'first_name': 'Wilford',
		'middle_name': null,
		'last_name': 'Woodruff',
		'initial': null,
		'position': 'President',
		'birthdate': 'March 1, 1807',
		'ordained_date': 'April 7, 1889',
		'deathdate': 'September 2, 1898',
		'ordinal': '4th',
		'hometown': 'Farmington, Connecticut',
		'img': 'WW_mm10_st.jpg',
		'img_young': 'WW_mm7_st.jpg',
		'conference_talks': '',
	},
	{
		'name': 'John Taylor',
		'first_name': 'John',
		'middle_name': null,
		'last_name': 'Taylor',
		'initial': null,
		'position': 'President',
		'birthdate': 'November 1, 1808',
		'ordained_date': 'October 10, 1880',
		'deathdate': 'July 25, 1887',
		'ordinal': '3rd',
		'hometown': 'Milnthorpe, England',
		'img': 'JT_mm3_st.jpg',
		'img_young': 'JT_mm4_st.jpg',
		'conference_talks': '',
	},
	{
		'name': 'Brigham Young',
		'first_name': 'Brigham',
		'middle_name': null,
		'last_name': 'Young',
		'initial': null,
		'position': 'President',
		'birthdate': 'June 1, 1801',
		'ordained_date': 'August 29, 1877',
		'deathdate': 'December 27, 1847',
		'ordinal': '2nd',
		'hometown': 'Whitingham, Vermont',
		'img': 'BY_mm7_st.jpg',
		'img_young': 'BY_mm3_st.jpg',
		'conference_talks': '',
	},
	{
		'name': 'Joseph Smith, Jr',
		'first_name': 'Joseph',
		'middle_name': null,
		'last_name': 'Smith',
		'initial': null,
		'position': 'President',
		'birthdate': 'December 23, 1805',
		'ordained_date': 'April 6, 1830',
		'deathdate': 'June 27, 1844',
		'ordinal': '1st',
		'hometown': 'Sharon, Vermont',
		'img': 'joseph-smith.jpg',
		'img_young': 'JS_Bible_st.jpg',
		'conference_talks': '',
	},
];