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
	    files: { 'dest/output.html' : 'src/input.html' },
	    options: {
	      encodeSpecialChars: true,
	      litmus: {
	        username: 'dvanbrunt@klick.com',
	        password: 'jGrvYYTuBzbJt2KzqJ8GZkBx',
	        url: 'https://yoursite.litmus.com',
	        applications: ['gmailnew', 'ffgmail', 'chromegmail']
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