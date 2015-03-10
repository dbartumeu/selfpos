module.exports = function (grunt) {
// Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
            ' * Diamond v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2015-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' */\n',

        uglify: {
            options: {
                preserveComments: 'some'
            },
            core: {
                src: 'src/js/selfpos.js',
                dest: 'dist/assets/js/diamond.min.js'
            }
        },
        clean: {
            dist: ['dist/**/*']
        }
    });

    // Load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Compile Less files
    grunt.registerTask('less-compile', ['less:compileCore', 'less:compileDemo', 'cssmin:core']);

    // Concat js Files
    grunt.registerTask('js-concat', ['concat:core', 'uglify:core', 'uglify:demo']);

    // Generate demo files
    grunt.registerTask('demo', ['assemble:dist', 'assemble:external']);

    // Generate doc files
    grunt.registerTask('doc', ['assemble:doc']);

    // Compile entire project
    grunt.registerTask('default', [
        'clean:dist',
        'uglify:core',
    ]);

    // Watch events
    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
};