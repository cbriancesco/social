var gulp = require('gulp');

gulp.task('default', ['thirdpartyJs', 'thirdpartyCss', 'stylus', 'fonts', 'images', 'scripts', 'watch']);

gulp.task('build', ['stylus-min', 'thirdpartyJs', 'thirdpartyCss', 'fonts', 'images', 'scripts-min']);
