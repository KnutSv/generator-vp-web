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
        this.spawnCommand('gem', ['install']);
        this.spawnCommand('gulp', ['sprite']);
        this.spawnCommand('gulp', ['compass']);
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
    }, {
      type: 'input',
      name: 'cssLocation',
      message: 'What\'s the CSS location relative to this project\'s root? (without / at the end)',
      default: 'app/css'
    }, {
      type: 'input',
      name: 'imgLocation',
      message: 'What\'s the image location relative to this project\'s root? (without / at the end)',
      default: 'app/img'
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
    this.mkdir( this.imgLocation + '/sprite/svg/', '0777', true, function (err) {
      if (err) {
        this.log(err);
      } else {
        this.log('Directory "' + this.imgLocation + '/sprite/svg/" created');
      }
    });
    this.mkdir( this.imgLocation + '/inline/svg/', '0777', true, function (err) {
      if (err) {
        this.log(err);
      } else {
        this.log('Directory "' + this.imgLocation + '/inline/svg/" created');
      }
    });

    this.template('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.template('_sftp-config.json', 'sftp-config.json');
    this.copy('Gemfile');
    this.template('_config.rb', 'config.rb');
    this.copy('gulpfile.js');
    this.directory('scss');
    this.directory('js');

    this.mkdir('gulp');
    this.mkdir('gulp/util');
    this.mkdir('gulp/tasks');
    this.copy('gulp/index.js');
    this.copy('gulp/util/scriptFilter.js');
    this.copy('gulp/tasks/setWatch.js');
    this.template('gulp/tasks/sprite.js');

    if(this.autoUpload) {
      this.template('gulp/tasks/compass.js');
      this.template('gulp/tasks/watch.js');
    }
    else {
      this.template('gulp/tasks/compass_without_ftp.js', 'gulp/tasks/compass.js');
      this.template('gulp/tasks/watch_without_ftp.js', 'gulp/tasks/watch.js');
    }

    this.directory('svg', this.imgLocation + '/sprite/svg/');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitignore', '.gitignore');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = VpWebGenerator;
