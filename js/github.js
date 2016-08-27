// Pulls the last modified date of the current documentation from GitHub

var fetch_github_date = function(callback) {
    if (typeof github_repo == "undefined" || typeof github_path == "undefined")
        return;

    var url = "https://api.github.com/repos/" + github_repo + "/commits?path=" + github_path;
    $.getJSON(url, function(data) {
        if (data.length < 1)
            return;

        var commit = data[0];
        var dateobj = new Date(commit.commit.committer.date);
        var datefmt = dateobj.toLocaleString();

        callback(datefmt);
    });
};

$(function() {
    if ($(".github-date").length > 0) {
        fetch_github_date(function(github_date) {
            $(".github-date-value").text(github_date);
            $(".github-date").show();
        });
    }
});
