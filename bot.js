var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

request('http://www.indeed.ca/jobs?q=front+end+web+developer&l=Vancouver%2C+BC', function(err, res, body) {
	if(err) console.log('Erro: ', err);

	var $ = cheerio.load(body);

	$('.row.result').each(function() {
		var title = $(this).find('.jobtitle').text().trim();
		var company = $(this).find('.company span').text().trim();
		var salary = $(this).find('nobr').text().trim();
		var link = 'http://www.indeed.ca'+$(this).find('.jobtitle a').attr('href').trim();

		var result = `Title: ${title} \nCompany: ${company} \nSalary: ${salary}\nLink: ${link}\n\n`;
		//console.log(result);

		fs.appendFile('jobs.txt', result);
	});
});