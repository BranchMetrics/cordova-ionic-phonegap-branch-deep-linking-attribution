// TODO: test git push
// TODO: early exit based on last changelog version
// TODO: 'Authorization': 'token xxxx', for testing
// TODO: add npm run changelog to pre push
// TODO: uncomment functions

(function() {
  // libs

  const path = require("path");
  // var exec = require('child_process').exec
  const fileHelper = require("../lib/fileHelper.js");
  const request = require("request");
  const exec = require("child_process").exec;
  const FILE = path.join(__dirname, "../../../", "CHANGELOG.md");

  // properties
  const apiURL = "https://api.github.com/repos/";
  const gitURL = "https://github.com/";
  const baseURL = "BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/";
  const tagsURL = `${apiURL + baseURL}tags`;
  const issuesURL = `${apiURL + baseURL}issues`;
  const commitsURL = `${apiURL + baseURL}commits`;

  // entry
  module.exports = updateChangeLog();

  function updateChangeLog() {
    const pageLimit = isReset() ? 50 : 2;
    const tags = new Promise((resolve, reject) => {
      readData(tagsURL, [], 1, pageLimit, values => {
        resolve(values);
      });
    });
    const issues = new Promise((resolve, reject) => {
      readData(issuesURL, [], 1, pageLimit, values => {
        resolve(values);
      });
    });
    const commits = new Promise((resolve, reject) => {
      readData(commitsURL, [], 1, pageLimit, values => {
        resolve(values);
      });
    });

    Promise.all([tags, issues, commits]).then(values => {
      const markdown = generateMarkdown(values);
      fileHelper.writeFile(FILE, markdown);
      commitChanges();
    });
  }

  function isReset() {
    const args = process.argv.slice(2);
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (arg === "-reset=true") {
        return true;
      }
    }
    return false;
  }

  function readData(url, data, page, pageLimit, callback) {
    let link = `${url}?page=${page}`;
    link += url.indexOf("issues") > 0 ? "&state=closed" : "";

    readGit(link, values => {
      data.push(...values);
      if (values.length === 0 || page >= pageLimit) {
        callback(data);
      } else {
        page += 1;
        readData(url, data, page, pageLimit, callback);
      }
    });
  }

  function readGit(url, callback) {
    const options = {
      method: "GET",
      url: url,
      headers: {
        "User-Agent": "branch-cordova-sdk",
        "cache-control": "no-cache",
        Authorization: "token be195a3084d82a344aeb03e08264224948cfafcd"
      }
    };
    request(options, (error, response, body) => {
      if (response.statusCode === 200) {
        callback(JSON.parse(body));
      } else {
        throw new Error(JSON.parse(error || body));
      }
    });
  }

  function generateMarkdown(values) {
    // 3/2(O)n (swap)
    const tags = values[0].reverse();
    const issues = values[1].reverse();
    const commits = values[2].reverse();

    let output = getHeader();

    // (O)n (tags)
    let tagParagraph = "";
    while (tags.length > 0) {
      const currentTag = tags.pop();

      tagParagraph += getTagHeader(currentTag);
      tagParagraph += getCommitParagraph(currentTag, commits);
      tagParagraph += getIssueParagraph(currentTag, issues);

      output += tagParagraph;
      tagParagraph = "";
    }

    return output;
  }

  function getHeader() {
    return "# CHANGELOG\nQuestions? [Contact us](https://support.branch.io/support/tickets/new)\n\n";
  }

  function getTagHeader(currentTag) {
    return `## [${currentTag.name}](${gitURL}${baseURL}releases/tag/${
      currentTag.name
    }) `;
  }

  function getCommitParagraph(currentTag, commits) {
    let body = "\n\n";
    if (commits.length === 0) {
      return body;
    }

    // (O)n (commits)
    let paragraph = "";
    let hasHeader = false;
    while (commits.length > 0) {
      const current = commits.pop();

      // (O)n (commit messages)
      const message = current.commit.message.replace(/(\r\n|\n|\r)/gm, "");

      if (!hasHeader) {
        paragraph += "- **Completed Changes**\n";
        hasHeader = true;
      }

      paragraph += `  - ${message} ([${current.sha.substr(0, 5)}](${
        current.html_url
      }))\n`;

      if (currentTag.commit.sha === current.sha) {
        // assign date to be used for header and issues conditional
        const date = current.commit.author.date;
        currentTag.date = date;

        // complete body
        body = "";
        body += `(${date.substr(0, 10)})\n\n`;
        body += `${paragraph}\n`;
        break;
      }
    }
    return body;
  }

  function getIssueParagraph(currentTag, issues) {
    let body = "";
    if (issues.length === 0) {
      return body;
    }

    // (O)n (issues)
    let paragraph = "";
    let hasHeader = false;
    while (issues.length > 0) {
      const current = issues.pop();

      if (!current.hasOwnProperty("pull_request")) {
        if (!hasHeader) {
          paragraph += "- **Closed Issues**\n";
          hasHeader = true;
        }

        paragraph += `  - ${current.title.replace(/(\r\n|\n|\r)/gm, "")} ([#${
          current.number
        }](${current.html_url}))\n`;
      }

      if (
        new Date(current.closed_at).getTime() <
          new Date(currentTag.date).getTime() &&
        hasHeader
      ) {
        body += `${paragraph}\n`;
        break;
      }
    }

    return body;
  }

  // only show conventional-commit-types
  // function isValidCommitMessage (message) {
  //   var commitMessages = ['feat:', 'fix:', 'docs:', 'style:', 'refactor:', 'perf:', 'test:', 'chore:', 'revert:']
  //   for (var i = 0; i < commitMessages.length; i++) {
  //     var commitMessage = commitMessages[i]
  //     if (message.indexOf(commitMessage) === 0) {
  //       return true
  //     }
  //   }
  //   return false
  // }

  // push file code changes to github
  function commitChanges() {
    let git = `git add ${FILE} && git add git commit -m "chore: updated changelog" && git push`;
    git = "echo";
    exec(git, (err, stdout, stderr) => {
      if (err) {
        throw new Error(
          "BRANCH SDK: Failed to commit git changes for changelog. Docs https://goo.gl/GijGKP"
        );
      }
    });
  }
})();
