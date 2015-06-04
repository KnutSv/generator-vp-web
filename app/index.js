'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var VpWebGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {

        this.installDependencies({
            callback: function() {
                // Emit a new event - dependencies installed
                this.emit('dependenciesInstalled');
            }.bind(this)
        });

      // Now you can bind to the dependencies installed event
      this.on('dependenciesInstalled', function() {
        this.spawnCommand('npm', ['install']);
        this.spawnCommand('bower', ['install']);
        this.spawnCommand('gulp');
      });

      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous VpWeb generator!'));

    var prompts = [{
      type: 'input',
      name: 'appname',
      message: 'What\'s the name of the website?'
    }, {
      type: 'confirm',
      name: 'autoUpload',
      message: 'Do you want to auto upload files to a FTP-server?',
      default: true
    }, {
      when: function (response) {
        return response.autoUpload;
      },
      type: 'input',
      name: 'ftpHost',
      message: 'What\'s the ftp host?'
    }, {
      when: function (response) {
        return response.autoUpload;
      },
      type: 'input',
      name: 'ftpUser',
      message: 'What\'s the ftp user?'
    }, {
      when: function (response) {
        return response.autoUpload;
      },
      type: 'password',
      name: 'ftpPW',
      message: 'What\'s the ftp password?'
    }, {
      when: function (response) {
        return response.autoUpload;
      },
      type: 'input',
      name: 'ftpPort',
      message: 'What\'s the ftp port?',
      default: '21'
    }, {
      when: function (response) {
        return response.autoUpload;
      },
      type: 'input',
      name: 'ftpRemotePath',
      message: 'What\'s the ftp remote path?'
      }, {
      type: 'input',
      name: 'publicFolder',
      message: 'What\'s the public folder where the generated assets will be placed?',
      default: 'public_html'
      }, {
      type: 'input',
      name: 'cssFolder',
      message: 'What\'s the CSS folder name?',
      default: 'css'
      }, {
      type: 'input',
      name: 'imgFolder',
      message: 'What\'s the image folder name?',
      default: 'img'
      }, {
      type: 'input',
      name: 'jsFolder',
      message: 'What\'s the javascript folder name?',
      default: 'js'
    }];

    this.prompt(prompts, function (props) {
      this.appname = props.appname;
      this.autoUpload = props.autoUpload;
      this.publicFolder = props.publicFolder;
      this.cssFolder = props.cssFolder;
      this.imgFolder = props.imgFolder;
      this.jsFolder = props.jsFolder;
      this.ftpHost = props.ftpHost;
      this.ftpUser = props.ftpUser;
      this.ftpPW = props.ftpPW;
      this.ftpPort = props.ftpPort;
      this.ftpRemotePath = props.ftpRemotePath;

      this.file = {
        relative: '<%= file.relative %>'
      };

      this.error = {
        message: '<%= error.message %>'
      };

      done();
    }.bind(this));
  },

  app: function () {
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_sftp-config.json', 'sftp-config.json');
    this.copy('gulpfile.js');
    this.directory('scss');
    this.directory('js');
    this.directory('img');

    this.mkdir('gulp');
    this.mkdir('gulp/util');
    this.mkdir('gulp/tasks');
    this.copy('gulp/index.js');
    this.copy('gulp/util/scriptFilter.js');
    this.copy('gulp/util/scss.template.mustache');
    this.copy('gulp/tasks/setWatch.js');
    this.copy('gulp/tasks/svg.js');
    this.copy('gulp/tasks/default.js');
    this.template('gulp/tasks/js.js');
    this.template('gulp/tasks/sprite.js');
    this.template('gulp/tasks/watch.js');

    if(this.autoUpload) {
      this.template('gulp/tasks/sass.js');
    }
    else {
      this.template('gulp/tasks/sass_without_ftp.js', 'gulp/tasks/sass.js');
    }
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitignore', '.gitignore');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = VpWebGenerator;
