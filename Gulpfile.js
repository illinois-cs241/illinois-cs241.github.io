var gulp = require('gulp');
var uncss = require('gulp-uncss');

gulp.task('uncss', function() {
  return gulp.src([
      '_site/lib/material-design-lite/material.min.css',
      '_site/lib/foundation/css/foundation.css'
    ])
    .pipe(uncss({
      html: [
        "http://localhost:4000/404.html",
        "http://localhost:4000/apply.html",
        "http://localhost:4000/chatroom.html",
        "http://localhost:4000/extreme_edge_cases.html",
        "http://localhost:4000/finding_filesystems.html",
        "http://localhost:4000/help.html",
        "http://localhost:4000/honors.html",
        "http://localhost:4000/ideal_indirection.html",
        "http://localhost:4000/index.html",
        "http://localhost:4000/kernal.html",
        "http://localhost:4000/know_your_tools.html",
        "http://localhost:4000/labs.html",
        "http://localhost:4000/late_add.html",
        "http://localhost:4000/luscious_locks.html",
        "http://localhost:4000/mad_mad_access_pattern.html",
        "http://localhost:4000/malloc.html",
        "http://localhost:4000/mapreduce.html",
        "http://localhost:4000/mini_valgrind.html",
        "http://localhost:4000/mps.html",
        "http://localhost:4000/mr0.html",
        "http://localhost:4000/overworked_interns.html",
        "http://localhost:4000/parallel_make.html",
        "http://localhost:4000/password_cracker.html",
        "http://localhost:4000/past_projects.html",
        "http://localhost:4000/pointers_gone_wild.html",
        "http://localhost:4000/schedule.html",
        "http://localhost:4000/scheduler_example1.html",
        "http://localhost:4000/scheduler_example2.html",
        "http://localhost:4000/scheduler_example3.html",
        "http://localhost:4000/scheduler.html",
        "http://localhost:4000/shell.html",
        "http://localhost:4000/staff.html",
        "http://localhost:4000/teaching_threads.html",
        "http://localhost:4000/text_editor.html",
        "http://localhost:4000/tsan.html",
        "http://localhost:4000/utilities_unleashed.html",
        "http://localhost:4000/vector.html",
        "http://localhost:4000/wearables.html"
      ]
    }))
    .pipe(gulp.dest('uncss/'));
});