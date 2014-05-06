module.exports = function(grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		settings: grunt.file.readJSON('grunt-config.json'),

        paths: {
            dist: 'dist',
            src: 'src',
            tmp: '.tmp',
            email: '*.html',
            images: 'images',
            data: 'data',
            partials: 'partials',
        },

		clean: {
			all: ['<%= paths.tmp %>', '<%= paths.dist %>']
		},

		copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.tmp %>',
                    src: [
                    	'<%= paths.images %>/*.{gif,png,jpg}',
                    	'*.html'
                    ],
                    dest: '<%= paths.dist %>'
                }]
            }
        },

        sass: {
			options: {
				style: 'expanded'
			},
			tmp: {
				files:[{
					expand: true,
					cwd: '<%= paths.src %>/sass',
					src: '**/*.{css,scss}',
					dest: '<%= paths.tmp %>/css',
					ext: '.css'
				}]
			}
		},

		render: {
			options: {
				data: ['<%= paths.src %>/<%= paths.data %>/*.json']
			},
			html: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.src %>/',
                    src: ['*.ejs'],
                    dest: '<%= paths.tmp %>/',
                    ext: '.html'
                }]
            }
		},

		imagemin: {
            options: {
                progressive: false,
                cache: false
            },
            tmp: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.src %>/<%= paths.images %>',
                    src: ['**/*.{gif,png,jpg}'],
                    dest: '<%= paths.tmp %>/<%= paths.images %>'
                }]
            }
        },

		cssmin: {
		  minify: {
		    expand: true,
		    cwd: '<%= paths.tmp %>/css/',
		    src: ['**/*.css', '!**/*.min.css'],
		    dest: '<%= paths.tmp %>/css/'
		  }
		},

		htmlmin: {
			dist: {
			  options: {
			    removeComments: true,
			    collapseWhitespace: true
			  },
			  files: [{ 
				expand: true,
				flatten: true,
				src: ['<%= paths.tmp %>/*.html'],
				dest: '<%= paths.tmp %>/'
			  }]
			}
		},

		compress: {
		  main: {
		    options: {
		      archive: '<%= paths.dist %>/<%= settings.common.subject %>.zip'
		    },
		    files: [
		    	{expand: true, cwd: '<%= paths.dist %>/', src: ['**'], dest: '<%= settings.common.subject %>/'},
			]
		  }
		},

		watch: {
			data: {
                files: ['<%= paths.src %>/<%= paths.data %>/**/*.json'],
                tasks: ['render', 'inliner']
            },
            ejs: {
                files: ['<%= paths.src %>/*.ejs', '<%= paths.src %>/partials/**/*.ejs'],
                tasks: ['render', 'inliner']
            },
            images: {
                files: ['<%= paths.src %>/<%= paths.images %>/*.{gif,png,jpg}'],
                tasks: ['imagemin']
            },
            sass: {
                files: ['<%= paths.src %>/sass/**/*.{css,scss}',],
                tasks: ['sass', 'render', 'inliner']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= paths.tmp %>/css/**/*.css',
                    '<%= paths.tmp %>/*.html',
                    '<%= paths.tmp %>/<%= paths.images %>/*.{gif,png,jpg}'
                ]
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            dev: ['watch']
        },

		connect: {
            options: {
                hostname: '*',
                port: '9000',
                open: 'http://localhost:9000/email.html',
                base: ['<%= paths.tmp %>']
            },
            dev: {
                options: {
                    livereload: true
                }
            }
        },

		emailBuilder:{
		  inline: {
		    options: {
		      encodeSpecialChars: true
		    },
		    files: [{ 
		    	expand: true,
		    	flatten: true,
		    	src: ['<%= paths.tmp %>/*.html'],
		    	dest: '<%= paths.tmp %>/'
		    }]
		  },
		  litmus: {
		    files: { '<%= paths.tmp %>/email.html' : '<%= paths.tmp %>/email.html' },
		    options: {
		      encodeSpecialChars: true,
		      litmus: {
		      	subject : '<%= settings.common.subject %>',
		        username: '<%= settings.litmus.username %>',
		        password: '<%= settings.litmus.password %>',
		        url: '<%= settings.litmus.url %>',
		        applications: '<%= settings.litmus.applications %>'
		      }
		    }
		  },
		  emailTest: {
			files: { '<%= paths.tmp %>/email.html' : '<%= paths.tmp %>/email.html' },
			options: {
				encodeSpecialChars: false,
				emailTest: {
					email : '<%= settings.email.emailaddress %>',
					subject : '<%= settings.common.subject %>'
				}
		    }
		  }
		},

		s3: {
			options: {
			  key: '<%= settings.aws.key %>',
			  secret: '<%= settings.aws.secret %>',
			  bucket: '<%= settings.aws.bucket %>',
			  access: 'public-read',
			  headers: {
			    // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
			    "Cache-Control": "max-age=630720000, public",
			    "Expires": new Date(Date.now() + 63072000000).toUTCString()
			  }
			},
			dev: {
			  // These options override the defaults
			  options: {
			    encodePaths: false,
			    maxOperations: 20
			  },
			  // Files to be uploaded.
			  upload: [
			    {
			      src: '<%= paths.tmp %>/<%= paths.images %>/*.{gif,png,jpg}',
			      dest: '<%= settings.common.subject %>/<%= paths.images %>/'
			    }
			  ]
			}
		},

		replace: {
		  cdn: {
		    src: ['<%= paths.tmp %>/*.html'],
		    overwrite: true,                 // overwrite matched source files
		    replacements: [{
		      from: /(\'\/?images\/|\"\/?images\/)/g,
		      to: '\"<%= settings.aws.url %>/<%= settings.common.subject %>/<%= paths.images %>/'
		    }]
		  }
		}

	});

	grunt.registerTask('inliner', 'emailBuilder:inline');
	grunt.registerTask('emailTest', 'emailBuilder:emailTest');

	grunt.registerTask('default', [
		'build',
	]);

	grunt.registerTask('base', [
		'clean', // delete tmp and dist directories
		'render', // render ejs
		'sass', // precompile SASS 
		'imagemin', // compress images
	]);

	grunt.registerTask('dev', [
        'base',
		'inliner', // inline css
        'connect:dev', // setup tmp webserver
        'watch', // watch directories for changes to files
    ]);

	grunt.registerTask('build', [
		'base',
		'cssmin', // compress css
		'inliner', // inline css
		'htmlmin', // compress html
		'copy:dist', // copy files from tmp to dist
		'compress', // zip everything up
	]);

	grunt.registerTask('litmus', [
		'base',
        'replace:cdn', // replace image links from local to cdn
		's3', // upload copies of images to s3
		'cssmin', // compress css
		'htmlmin', // compress html
		'emailBuilder:litmus', // send test to litmus
	]);

	grunt.registerTask('email', [
		'base',
        'replace:cdn', // replace image links from local to cdn
		's3', // upload copies of images to s3
		'cssmin', // compress css
		'htmlmin', // compress html
		'emailTest', // send test to email
	]);

};