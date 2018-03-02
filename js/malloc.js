"use strict";
(function(){

const tester_secret_slug = 'tester-secret';

/**
 * Returns the time in seconds rounded to the nearest 10 minutes
 */
function roundedTime() {
  const time = new Date();
  const minutes = time / 60;
  const ret = minutes - (minutes % 10);
  return ret;
};

/**
 * Capitalizes first letter of a string
 */
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/*
 * Adds the headers for the malloc row
 */
function add_titles(test_names) {
  const pad_len = 50;
  const titles = test_names.map(function(name){
    const elem = $('<th></th>');
    const split_name = name.split('-');

    /* \xa0 is non breaking space needed to extend the size of the columns
        because the css classes for bootstrap table didn't work */

    const nom = "Tester\xa0" + capitalizeFirstLetter(split_name[1]);
    elem.text(nom.padEnd(pad_len, "\xa0"));
    return elem;
  });
  const name_pad = "Name".padEnd(pad_len, "\xa0");
  /* No need for .text because this won't get injected */
  titles.splice(0, 0, $('<th>'+name_pad+'</th>'));
  titles.splice(0, 0, $('<th class="medal">🏅</th>'));
  const title_row = $('<tr></tr>');
  title_row.append(titles);
  $('#malloc-head').append(title_row);
}

function formatMem(t) {
  var unit = "B";
  var b = 1000; // Use SI
  if (t > b) {
    t /= b;
    unit = "KB";
    if (t > b) {
      t /= b;
      unit = "MB";
      if (t > b) {
        t /= b;
        unit = "GB";
      }
    }
  }
  t = t.toFixed(2);
  return "" + t + " " + unit;
};

function formatTime(t) {
  t *= 1e9;
  var unit = "ns";
  if (t > 1000) {
    t /= 1000;
    unit = "us";
    if (t > 1000) {
      t /= 1000;
      unit = "ms";
      if (t > 1000) {
        t /= 1000;
        unit = "s";
      }
    }
  }
  t = t.toFixed(2);
  return "" + t + " " + unit;
};

function formatted_info(title, max_memory, avg_memory, runtime) {
  /* Must escape title because of injection */
  const new_row = $('<div class="container-fluid"></div>');
  const title_div = $('<div class="row"><div class="col-md-12" style="padding-left: 0px;bcc-removed:ECC91C;color:black;"></div></div>');
  title_div.text(title);
  new_row.append(title_div);

  /* None of these need to be escaped, but we have to follow the pattern at the top */
  const descriptor_factory = $('<div class="row"></div>');
  const value_factory = $('<div></div>');
  value_factory.addClass('col-md-6');

  const max_mem = descriptor_factory.clone();
  max_mem.html('<div class="col-md-5" style="padding-left: 0px; padding-right: 0px">Max Memory:</div>');
  max_mem.append(value_factory.clone().text(formatMem(max_memory)));
  new_row.append(max_mem);

  const avg_mem = descriptor_factory.clone();
  avg_mem.html('<div class="col-md-5" style="padding-left: 0px; padding-right: 0px">Avg Memory:</div>');
  avg_mem.append(value_factory.clone().text(formatMem(avg_memory)));
  new_row.append(avg_mem);

  const run = descriptor_factory.clone();
  run.html('<div class="col-md-5" style="padding-left: 0px; padding-right: 0px">Runtime:</div>');
  run.append(value_factory.clone().text(formatTime(runtime)))
  new_row.append(run);

  return new_row;
}

function test_score(student_test_case, ta_test_case) {
  if (student_test_case.pts_earned != student_test_case.total_pts) {
    // Like -Infinity, but not quite, so we can still kinda rank bad implementations
    return -1e15;
  }
  var runtime_fudge = 0.04;  // 40ms
  var memory_fudge = 1;  // 1b
  var ta_run = ta_test_case.runtime + runtime_fudge;
  var st_run = student_test_case.runtime >= 0 ?
      (student_test_case.runtime + runtime_fudge) : Infinity;
  var ta_avg = ta_test_case.avg_memory + memory_fudge;
  var st_avg = student_test_case.avg_memory >= 0 ?
      (student_test_case.avg_memory + memory_fudge) : Infinity;
  var ta_max = ta_test_case.max_memory + memory_fudge;
  var st_max = student_test_case.max_memory >= 0 ?
      (student_test_case.max_memory + memory_fudge) : Infinity;
  return (1/3) * (
    Math.log2(ta_run / st_run + 1) +
    Math.log2(ta_avg / st_avg + 1) +
    Math.log2(ta_max / st_max + 1));
}

function student_score(student, ta_sol, keys) {
  const raw_score = keys.reduce(function (acc, cv){
    const comp = function(e) {
      return e.name === cv;
    };
    const ta_test = ta_sol.test_cases.find(comp);
    const student_test = student.test_cases.find(comp);
    const temp = test_score(student_test, ta_test);
    return acc + temp;
  }, 0);
  const score = raw_score * 100 / keys.length;
  return score;
}

function find_ta_solution(students) {
  for(var i = 0; i < students.length; i++) {
    const obj = students[i];
    if (obj['is_ta_solution'] && obj['nickname'].trim() === 'glibc') {
      return obj;
    }
  }
  return null;
}

const errfunc = function(err) {
  $('#error').removeClass('hidden');
  $('#malloc-contest').addClass('hidden');
}

const get_test_names = function(ta_sol) {
  /* Returns the tests in increasing length and increasing
    lexographical order */
  return ta_sol['test_cases']
    .map(function(e) {return e.name})
    .sort(function(a, b) {
      if (a.length != b.length) return a.length < b.length ? -1 : 1;
      if (a === b) return 0;
      return (a < b) ? -1 : 1;
    });
}

const store_and_sort_data = function(data, ta_sol) {
  const all_keys = ta_sol.test_cases.map(function (e) {
    return e.name;
  })
  const filtered = all_keys.filter(function (e) {
    return e !== tester_secret_slug;
  });
  for (var i = 0; i < data.length; ++i) {
    const student = data[i];
    const rating = student_score(student, ta_sol, all_keys);
    const grade_score = student_score(student, ta_sol, filtered);
    const any_fail = student.test_cases.some(function (test) {
      return test.pts_earned !== test.total_pts;
    });
    const grade_fail = student.test_cases.some(function (test) {
      return test.name !== tester_secret_slug && test.pts_earned !== test.total_pts;
    });

    student.num_passed = student.test_cases.filter(function (test) {
      return test.pts_earned !== test.total_pts;
    }).length;

    student.all_fail = any_fail;
    student.grade_fail = grade_fail;
    student.grade_score = grade_score;
    student.normalized_score = rating < 0 ? 0 : rating;
  }

  const score_comp = function(st1_score, st2_score) {
    if (st1_score < st2_score) {
      return 1;
    } else if (st1_score > st2_score) {
      return -1;
    }
    return 0;
  }
  /* Get a sorted order for the students */
  const sorted = data.sort(function (st1, st2) {
    if (st1.grade_fail && st2.grade_fail) {
      return score_comp(st2.num_passed, st1.num_passed);
    } else if (st1.grade_fail && !st2.grade_fail) {
      return 1;
    } else if (!st1.grade_fail && st2.grade_fail) {
      return -1;
    } else {
      if (st1.all_fail && st2.all_fail) {
        const st1_score = st1.grade_score;
        const st2_score = st2.grade_score;

        return score_comp(st1_score, st2_score);
      } else if (!st1.all_fail && st2.all_fail) {
        return -1;
      } else if (st1.all_fail && !st2.all_fail) {
        return 1;
      }
      const st1_score = st1.normalized_score;
      const st2_score = st2.normalized_score;

      return score_comp(st1_score, st2_score);
    } 
  });

  return sorted;
}

const default_medal = function () {
  return $('<td class="medal"></td>');
}

const get_correct_medal = function(i) {
  // Don't give awards to optimized glibc
  var medal = "" + (i + 1);
  if (i == 0) {
    medal = "🥇"
  } else if (i == 1) {
    medal = "🥈"
  } else if (i == 2) {
    medal = "🥉"
  }
  const medal_data = default_medal();
  medal_data.text(medal);
  return medal_data;
}

const get_formatted_name = function(student) {
  const name = $('<td class="nickname-data"></td>');
  var name_info;
  if (student.grade_fail) {
    name.text(student.nickname);
  } else {
    var elem;
    if (student.all_fail){
      elem = formatted_info(student.nickname, student['total_max_memory'], 
        student['total_avg_memory'], student['total_time']-9001);
    }
    else {
      elem = formatted_info(student.nickname, student['total_max_memory'], 
        student['total_avg_memory'], student['total_time']);
    }
    /* Add this class so students can see if they're
      Actually in the contest */
    name.addClass('test-passed');

    /* Score! */
    const percentage = $("<div class='row'></div>");
    percentage.append($("<div class='col-md-5'>Grade %:</div>"));
    percentage.append($("<div class='col-md-6'>" + student.grade_score.toFixed(2) + "%</div>"));
    elem.append(percentage);

    if (!student.all_fail) {
      const contest = $("<div class='row'></div>");
      contest.append($("<div class='col-md-5'>Rank %:</div>"));
      contest.append($("<div class='col-md-6'>" + student.normalized_score.toFixed(2) + "%</div>"));
      elem.append(contest);
    }

    name.append(elem);
  }
  return name;
}

const prepare_test_td = function(student, test_name) {
  const elem = $('<td></td>');
  const comparator = function (test) {
    return test.name === test_name;
  };
  const test = student.test_cases.find(comparator);

  if (test.pts_earned != test.total_pts) {
    elem.text('Failed');
    elem.addClass('test-failed');
  } else {
    const new_row = formatted_info('Passed', test['max_memory'], test['avg_memory'], test['runtime']);
    elem.append(new_row);
    elem.addClass('test-passed');
  }
  return elem;
}

const setup_body = function(data) {
  if (typeof data === "string") {
    data = JSON.parse(data);
  }

  const ta_sol = find_ta_solution(data);
  const test_names = get_test_names(ta_sol);
  add_titles(test_names);

  /* Compute and store all the rankings once */
  const sorted = store_and_sort_data(data, ta_sol);
  var offset = 0;
  /* Actually Update the table */
  for (var i = 0; i < sorted.length; ++i) {
    const row = $("<tr></tr>");
    const student = sorted[i];
    var medal;
    if (student['is_ta_solution']) {
      row.addClass('ta-result');
      medal = default_medal();
    } else {
      row.addClass('student-result');
      medal = get_correct_medal(offset);
      offset += 1;
    }

    row.append(medal);
    const name = get_formatted_name(student);
    row.append(name);

    /* Verify that we are going through in the same order */
    for (var j = 0; j < test_names.length; ++j) {
      const elem = prepare_test_td(student, test_names[j]);
      row.append(elem);
    }
    $('#malloc-body').append(row);
  }
}


$(document).ready(function() {
  /* only force a cache update every 10 minutes */
  const url = 'http://cs241grader.web.engr.illinois.edu/malloc/data/results.php?v=' + roundedTime();
  $.get(url)
    .done(setup_body)
    .fail(errfunc);
});
})(); /* End Closure */