'use strict';

const build            = require('@microsoft/sp-build-web');
const gulp             = require('gulp');
const through2         = require('through2');
const { addFastServe } = require("spfx-fast-serve-helpers");

gulp.task('versioning', function(done) {
  gulp
  .src('./config/package-solution.json')
  .pipe(
    through2.obj(
      (file, enc, cb) => {
        // Modify the contents of the file here
        const json  = JSON.parse(file.contents.toString());
        console.log(`Current version: ${json.solution.version}`);

        // Split the current version string into an array of numbers
        const versionParts = json.solution.version.split('.').map(Number);

        // Increment the patch version (last number in versionParts)
        versionParts[3]++;
        
        // Join the version parts back into a string
        json.solution.version = versionParts.join('.');

        console.log(`Next version: ${json.solution.version}`);
        const modifiedContents = JSON.stringify(json, null, 2);

        // Write the modified contents back to the same file
        file.contents = Buffer.from(modifiedContents);

        cb(null, file);
      }
    )
  )
  .pipe(
    gulp.dest('./config')
  );

  done();
});

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

addFastServe(build);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};


build.initialize(require('gulp'));

