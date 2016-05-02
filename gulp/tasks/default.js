var gulp = require('gulp');

gulp.task('default', ['jade', 'thirdpartyJs', 'thirdpartyCss', 'stylus', 'fonts', 'images', 'scripts', 'watch']);

gulp.task('build', ['stylus-min', 'jade-min', 'thirdpartyJs', 'thirdpartyCss', 'fonts', 'images', 'scripts-min']);
