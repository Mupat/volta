module.exports = (grunt) ->
  # Project configuration
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json'),
  
    coffee: 
      compile: 
        options:
          join: true
        files: 
          'js/main.js': ['coffee/*.coffee']
        
    handlebars:
      compile:
        options:
          namespace: 'YANTRE.templates'
          processName: (filename) -> 
            file = filename.split('/')[1]
            file[0..file.length-5].toLowerCase()
        files: 
          "js/template.js": ["template/*.hbs"]

    less:
      dev:
        files:
          "css/main.css": "less/main.less"
      prod:
        options:
          yuicompress: true
        files:
          "css/main.css": "less/main.less"

    watch:
      coffee:
        files: 'coffee/*.coffee'
        tasks: ['coffee']
      less:
        files: 'less/*.less'
        tasks: ['less:dev']
      handlebars:
        files: 'template/*.hbs'
        tasks: ['handlebars']

    compress:
      main:
        options:
          archive: 'yantre.zip'
          mode: 'zip'
          pretty: true
        files: [
          dest: 'yantre/'
          src: [
            'css/main.min.css'
            'fonts/**'
            'icon/*'
            'images/*'
            'js/main.min.js'
            'manifest.json'
            'index.html'
          ]
        ]

    cssmin:
      minify:
        options:
          report: 'min'
        files:
          'css/main.min.css': ['css/flipclock.css', 'css/jquery.bxslider.css', 'css/main.css']

    uglify:
      minify:
        options:
          report: 'min'
        files:
          'js/main.min.js': [
            'js/jquery-2.0.2.min.js'
            'js/jquery.bxslider.min.js'
            'js/moment.min.js'
            'js/handlebars.runtime.js'
            'js/flipclock/flipclock.min.js'
            'js/flipclock/faces/TwelveHourClock.js'
            'js/flipclock/face/TwentyFourHourClock.js'
            'js/template.js'
            'js/main.js'
          ]

    jade:
      dev:
        options:
          pretty: true
          data:
            prod: false
        files:
          "index.html": "index.jade"
      prod:
        options:
          data:
            prod: true
        files:
          "index.html": "index.jade"

    clean: ["css/main.min.css", "js/main.min.js"]

  # Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-handlebars'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-compress'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-jade'
  grunt.loadNpmTasks 'grunt-contrib-clean'

  # tasks
  grunt.registerTask 'default', ['watch'] 
  grunt.registerTask 'build:dev', [
    'jade:dev'
    'coffee'
    'handlebars'
    'less:dev'
  ]
  grunt.registerTask 'build:prod', [
    'jade:prod'
    'coffee'
    'handlebars'
    'less:prod'
    'cssmin'
    'uglify'
  ]
  grunt.registerTask 'package', [
    'build:prod'
    'compress'  
    'clean'
  ]
