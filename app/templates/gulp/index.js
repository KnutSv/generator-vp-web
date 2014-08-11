// Taken from: https://github.com/greypants/gulp-starter/tree/master/gulp

//var gulp = require('gulp');
var fs = require('fs');
var onlyScripts = require('./util/scriptFilter');
var tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

tasks.forEach(function(task) {
  require('./tasks/' + task);
});