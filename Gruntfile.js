module.exports = function(grunt) {
  "use strict";

  require("load-grunt-tasks")(grunt);

  var modulePath = {
    bootstrapMaterialDesign: "./bower_components/bootstrap-material-design/"
  };

  grunt.initConfig({

    // Clean.
    clean: {
      dist: 'dist'
    },

    // Compile less to .css
    // Compile less to .min.css
    // Create source maps of both
    less: {
      material: {
        options: {
          paths: ["less"],
          sourceMap: true,
          sourceMapRootpath: "/",
          sourceMapFilename: "dist/css/material.css.map",
          sourceMapURL: "material.css.map"
        },
        files: {
          "dist/css/material.css": modulePath.bootstrapMaterialDesign + "less/material.less",
        }
      },
      materialfullpalette: {
        options: {
          paths: ["less"],
          sourceMap: true,
          sourceMapRootpath: "/",
          sourceMapFilename: "dist/css/material-fullpalette.css.map",
          sourceMapURL: "material-fullpalette.css.map",
          outputSourceFiles: true
        },
        files: {
          "dist/css/material-fullpalette.css": modulePath.bootstrapMaterialDesign + "less/material-fullpalette.less",
        }
      },
      materialRoboto: {
        options: {
          paths: ["less"],
          sourceMap: true,
          sourceMapRootpath: "/",
          sourceMapFilename: "dist/css/roboto.css.map",
          sourceMapURL: "roboto.css.map",
          outputSourceFiles: true
        },
        files: {
          "dist/css/roboto.css": modulePath.bootstrapMaterialDesign + "less/roboto.less",
        }
      },
      materialRipples: {
        options: {
          paths: ["less"],
          sourceMap: true,
          sourceMapRootpath: "/",
          sourceMapFilename: "dist/css/ripples.css.map",
          sourceMapURL: "ripples.css.map",
          outputSourceFiles: true
        },
        files: {
          "dist/css/ripples.css": modulePath.bootstrapMaterialDesign + "less/ripples.less",
        }
      }
    },

    // Autoprefix .css and edit its source map
    // Autoprefix .min.css an edit its source map
    autoprefixer: {
      options: {
        map: true,
        browsers: ["last 3 versions", "ie 8", "ie 9", "ie 10", "ie 11"]
      },
      material: {
        files: {
          "dist/css/material.css": "dist/css/material.css",
          "dist/css/material.min.css": "dist/css/material.min.css"
        }
      },
      materialfullpalette: {
        files: {
          "dist/css/material-fullpalette.css": "dist/css/material-fullpalette.css",
          "dist/css/material-fullpalette.min.css": "dist/css/material-fullpalette.min.css"
        }
      },
      materialRoboto: {
        files: {
          "dist/css/roboto.css": "dist/css/roboto.css",
          "dist/css/roboto.min.css": "dist/css/roboto.min.css"
        }
      },
      materialRipples: {
        files: {
          "dist/css/ripples.css": "dist/css/ripples.css",
          "dist/css/ripples.min.css": "dist/css/ripples.min.css"
        }
      }
    },

    // Minify CSS and adapt maps
    csswring: {
      material: {
        src: "dist/css/material.css",
        dest: "dist/css/material.min.css"
      },
      materialfullpalette: {
        src: "dist/css/material-fullpalette.css",
        dest: "dist/css/material-fullpalette.min.css"
      },
      materialRoboto: {
        src: "dist/css/roboto.css",
        dest: "dist/css/roboto.min.css"
      },
      materialRipples: {
        src: "dist/css/ripples.css",
        dest: "dist/css/ripples.min.css"
      }
    },

    // Copy .js to dist/js/ folder
    copy: {
      material: {
        src: modulePath.bootstrapMaterialDesign + "scripts/material.js",
        dest: "dist/js/material.js"
      },
      materialRipples: {
        src: modulePath.bootstrapMaterialDesign + "scripts/ripples.js",
        dest: "dist/js/ripples.js"
      },
      materialFonts: {
        expand: true,
        cwd: modulePath.bootstrapMaterialDesign + "fonts/",
        src: "**",
        dest: "dist/fonts/",
        flatten: true,
        filter: "isFile"
      }
    },

    // Compile .js to .min.js
    uglify: {
      options: {
        sourceMap: true
      },
      material: {
        files: {
          "dist/js/material.min.js": "dist/js/material.js"
        }
      },
      materialRipples: {
        files: {
          "dist/js/ripples.min.js": "dist/js/ripples.js"
        }
      }
    },

    connect: {
      options: {
        port: 8040,
        hostname: "localhost",
        livereload: 35729

      },
      livereload: {
        options: {
          open: true,
          base: "."
        }
      },
      test: {
        options: {
          port: 8041,
          open: "http://localhost:8041/_SpecRunner.html",
          base: "."
        }
      }
    },
    jasmine: {
      scripts: modulePath.bootstrapMaterialDesign + "scripts/**/*.js",
      options: {
        build: true,
        specs: "test/*Spec.js",
        helpers: "test/*Helper.js",
        vendor: [
          "https://code.jquery.com/jquery-1.10.2.min.js",
          "https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"
        ]
      }
    },
    jshint: {
      options: {
        jshintrc: ".jshintrc",
        reporter: require("jshint-stylish")
      },
      all: [
        "Gruntfile.js",
        modulePath.bootstrapMaterialDesign + "scripts/**/*.js",
        "src/**/*.js"
      ],
      test: {
        options: {
          jshintrc: "test/.jshintrc",
          src: ["test/**/*.js"]
        }
      }
    },
    watch: {
      js: {
        files: [
          "Gruntfile.js", 
          modulePath.bootstrapMaterialDesign + "scripts/**/*.js", 
          "src/js/**/*.js"
        ],
        tasks: ["newer:jshint:all"]
      },
      jsTest: {
        files: ["test/**/*.js"],
        tasks: ["newer:jshint:test", "jasmine"]
      },
      less: {
        files:[
          modulePath.bootstrapMaterialDesign + "less/**/*.less",
          "src/less/**/*.less"
        ],
        tasks: ["material:less"]
      },
      livereload: {
        options: {
          livereload: "<%= connect.options.livereload %>"
        },
        files: [
          "index.html",
          "dist/css/**/*.css",
          "demo/**/*.{png,jpg,jpeg,gif,webp,svg}"
        ]
      }
    }

  });

  grunt.registerTask("default", ["clean:dist", "material", "materialRipples", "materialFonts"]);

  grunt.registerTask("material", [
    "material:less",
    "material:js"
  ]);
  grunt.registerTask("material:less", [
    "less:material",
    "less:materialfullpalette",
    "less:materialRoboto",
    "csswring:material",
    "csswring:materialfullpalette",
    "csswring:materialRoboto",
    "autoprefixer:material",
    "autoprefixer:materialfullpalette",
    "autoprefixer:materialRoboto"
  ]);
  grunt.registerTask("material:js", [
    "copy:material",
    "uglify:material"
  ]);

  grunt.registerTask("materialRipples", [
    "materialRipples:less",
    "materialRipples:js"
  ]);
  grunt.registerTask("materialRipples:less", [
    "less:materialRipples",
    "csswring:materialRipples",
    "autoprefixer:materialRipples"
  ]);
  grunt.registerTask("materialRipples:js", [
    "copy:materialRipples",
    "uglify:materialRipples"
  ]);

  grunt.registerTask("materialFonts", [
    "copy:materialFonts"
  ]);

  grunt.registerTask("build", function() {
    grunt.task.run(["newer:jshint", "default"]);
  });

  grunt.registerTask("test", [
    "jasmine:scripts:build",
    "connect:test:keepalive"
  ]);

  grunt.registerTask("serve", function(target){
    var buildTarget = "material:less";
    if(target && target === "scss") {
      buildTarget = "scss";
    }
    grunt.task.run([
      "build:"+ buildTarget,
      "connect:livereload",
      "watch"
    ]);
  });

  grunt.registerTask("cibuild", ["newer:jshint"]);

};
