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
        this.spawnCommand('gulp', ['sprite']);
        this.spawnCommand('gulp', ['sass']);
        this.spawnCommand('gulp', ['watch']);
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
    // }, {
    //   type: 'input',
    //   name: 'cssLocation',
    //   message: 'What\'s the CSS location relative to this project\'s root? (without / at the end)',
    //   default: 'app/css'
    // }, {
    //   type: 'input',
    //   name: 'imgLocation',
    //   message: 'What\'s the image location relative to this project\'s root? (without / at the end)',
    //   default: 'app/img'
    }];

    this.prompt(prompts, function (props) {
      this.appname = props.appname;
      this.autoUpload = props.autoUpload;
      this.cssLocation = props.cssLocation;
      this.imgLocation = props.imgLocation;
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
    this.copy('gulp/tasks/setWatch.js');
    this.copy('gulp/tasks/scss.template.mustache.js');
    this.copy('gulp/tasks/svg.js');
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
