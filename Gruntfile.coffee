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
        # options:
          # dumpLineNumbers: 'comments'
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

  # Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-handlebars'
  grunt.loadNpmTasks 'grunt-contrib-less'

  # tasks
  grunt.registerTask 'default', ['watch'] 
  grunt.registerTask 'build', [
    'coffee'
    'handlebars'
    'less:dev'
  ]
