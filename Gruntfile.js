module.exports = function(grunt) {
	// ALTERNATIVE:  https://github.com/jgallen23/grunt-inline-css
	grunt.loadNpmTasks('grunt-email-builder');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	emailBuilder:{
	  inline: {
	    files: { '.tmp/output.html' : 'assets/html/sidebar-hero.html' },
	    options: {
	      encodeSpecialChars: true
	    }
	  },
	  litmus: {
	    files: { '.tmp/output.html' : 'assets/html/sidebar-hero.html' },
	    options: {
	      encodeSpecialChars: true,
	      litmus: {
	      	subject : 'This is another test again asdf',
	        username: 'dvanbrunt@klick.com',
	        password: 'jGrvYYTuBzbJt2KzqJ8GZkBx',
	        url: 'https://klick.litmus.com',
	        //applications: ['ol2003','ol2007']
	        applications: ['android22','ol2003','ol2007','ol2010','ol2011','ol2013','chromegmailnew','chromeyahoo','appmail6','iphone5','iphone4','ipad','android4','blackberryhtml']
	      }
	    }
	  }
	}
	});

  grunt.registerTask('inline', 'emailBuilder:inline');
  grunt.registerTask('litmus', 'emailBuilder:litmus');

  grunt.registerTask('default', [
  	'inline'
  ]);
};