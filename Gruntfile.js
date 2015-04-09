/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'public/styles/styles.css': [
            'public/styles/main.scss'
          ]
        }
      }
    },
    uglify: {
      options: {
        sourceMap: true
      },
      js: {
        files: {
          'public/js/scripts.min.js': ['public/js/*.js', '!public/js/*.min.js']
        }
      }
    },
    ejs: {
      all: {
        options: {
          "_": function(str) {
            return str;
          }
        },
        src: ['public/*.ejs', '!public/partials/**/*'],
        dest: '.',
        expand: true,
        ext: '.html',
      },
      update: {
        options: {
          "_": function(str) {
            console.log(str);
            return str;
          }
        },
        src: ['public/*.ejs', '!public/partials/**/*'],
        dest: '/tmp/',
        expand: true,
        ext: '.html',
      }
    },
    wiredep: {
      task: {
        src: [
          'public/*.html',
          'public/styles/*.scss'
        ],

        options: {
          // https://github.com/taptapship/wiredep#configuration
        }
      }
    },
    watch: {
      sass: {
        files: ['public/styles/**/*.scss'],
        tasks: ['sass'],
      },
      js: {
        files: ['public/js/**/*.js'],
        tasks: ['uglify'],
      },
      ejs: {
        files: ['public/**/*.ejs'],
        tasks: ['ejs'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ejs');

  grunt.registerTask('default', ['wiredep', 'sass', 'uglify']);
};
