var issuesContainerEl = document.querySelector("#issues-container");


var getRepoIssues = function(repo) {


    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    console.log(repo);

    

    fetch (apiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data);
            })
        
    } else {
        alert("There was a problem with your request!");
    };
});
};

var displayIssues = function(issues) {

    for (var i=0; i < issues.length; i++) {

        if (issues.length === 0) {
            issuesContainerEl.textContent = "This Repo has no open issues!";
            return;
        }

        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        issueEl.appendChild(titleEl);

        var typeEl = document.createElement("span");

        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        issueEl.appendChild(typeEl);

        issuesContainerEl.appendChild(issueEl);
    }

};

getRepoIssues("facebook/react");