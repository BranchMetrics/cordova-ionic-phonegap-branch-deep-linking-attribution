// TODO: pull entire history
// TODO: test git push
// TODO: reverse on github end

(function () {
  // libs
  'use strict'
  var path = require('path')
  var exec = require('child_process').exec
  var fileHelper = require('../lib/fileHelper.js')
  var request = require('request')
  var FILE = path.join(__dirname, '../../../', 'CHANGELOG.md')

  // properties
  var apiURL = 'https://api.github.com/'
  var gitURL = 'https://github.com/'
  var baseURL = 'repos/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/'
  var tagsURL = apiURL + baseURL + 'tags'
  var issuesURL = apiURL + baseURL + 'issues?state=closed'
  var commitsURL = apiURL + baseURL + 'commits'

  // entry
  updateChangeLog()

  function updateChangeLog () {
    var tags = readGit(tagsURL)
    var issues = readGit(issuesURL)
    var commits = readGit(commitsURL)

    Promise.all([tags, issues, commits]).then(function (values) {
      var markdown = generateMarkdown(values)
      fileHelper.writeFile(FILE, markdown)
      commitChanges()
    }).catch(function (reason) {
      console.log(reason)
    })
  }

  function readGit (url) {
    return new Promise((resolve, reject) => {
      var options = {
        method: 'GET',
        url: url,
        headers: {
          'User-Agent': 'branch-cordova-sdk',
          'cache-control': 'no-cache'
        }
      }
      request(options, function (error, response, body) {
        error ? reject(JSON.parse(error)) : resolve(JSON.parse(body))
      })
    })
  }

  function generateMarkdown (values) {
    // 3/2(O)n (swap)
    var tags = values[0].reverse()
    var issues = values[1].reverse()
    var commits = values[2].reverse()

    var output = getHeader()

    // (O)n (tags)
    var tagParagraph = ''
    while (tags.length > 0) {
      var currentTag = tags.pop()

      tagParagraph += getTagHeader(currentTag)
      tagParagraph += getCommitParagraph(currentTag, commits)
      tagParagraph += getIssueParagraph(currentTag, issues)

      output += tagParagraph
      tagParagraph = ''
    }

    return output
  }

  function getHeader () {
    return '# Changelog\n\n*Questions? [Contact us](https://support.branch.io/support/tickets/new)*\n\n'
  }

  function getTagHeader (currentTag) {
    return '## [' + currentTag.name + '](' + gitURL + baseURL + 'releases/tag/' + currentTag.name + ') '
  }

  function getCommitParagraph (currentTag, commits) {
    var body = '\n\n'
    if (commits.length === 0) {
      return body
    }

    // (O)n (commits)
    var paragraph = '- **Completed Changes**\n\n'
    while (commits.length > 0) {
      var current = commits.pop()

      // (O)n (commit messages)
      var message = current.commit.message
      if (isValidCommitMessage(message)) {
        paragraph += '  - ' + message + ' ([' + current.sha.substr(0, 6) + '](' + current.html_url + '))\n\n'
      }

      if (currentTag.commit.sha === current.sha) {
        // assign date to be used for header and issues conditional
        var date = current.commit.author.date
        currentTag.date = date

        // complete body
        body = ''
        body += '(' + date.replace('T', ' ').replace('Z', '') + ')\n\n'
        body += paragraph
        break
      }
    }
    return body
  }

  function getIssueParagraph (currentTag, issues) {
    var body = ''
    if (issues.length === 0) {
      return body
    }

    // (O)n (issues)
    var paragraph = ''
    var hasHeader = false
    while (issues.length > 0) {
      var current = issues.pop()

      if (!current.hasOwnProperty('pull_request')) {
        if (!hasHeader) {
          paragraph += '- **Closed Issues**\n\n'
          hasHeader = true
        }

        paragraph += '  - ' + current.title + ' ([#' + current.number + '](' + current.html_url + '))\n\n'
      }

      if (new Date(current.closed_at).getTime() < new Date(currentTag.date).getTime()) {
        body += paragraph
        break
      }
    }

    return body
  }

  function isValidCommitMessage (message) {
    var commitMessages = ['feat:', 'fix:', 'docs:', 'style:', 'refactor:', 'perf:', 'test:', 'chore:', 'revert:']
    for (var i = 0; i < commitMessages.length; i++) {
      var commitMessage = commitMessages[i]
      if (message.indexOf(commitMessage) === 0) {
        return true
      }
    }
    return false
  }

  // push file code changes to github
  function commitChanges () {
    var git = 'git add ' + FILE + ' && git add git commit -m "chore: updated changelog" && git push'
    git = 'echo'
    exec(git, function (err, stdout, stderr) {
      if (err) {
        throw new Error('BRANCH SDK: Failed cto ommit git changes for changelog. Docs https://goo.gl/GijGKP')
      }
    })
  }
})()
