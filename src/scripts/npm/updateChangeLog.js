// TODO: test git push
// TODO: early exit based on last changelog version
// TODO: 'Authorization': 'token xxxx', for testing
// TODO: add npm run changelog to pre push
// TODO: uncomment functions

(function () {
  // libs
  'use strict'
  var path = require('path')
  // var exec = require('child_process').exec
  var fileHelper = require('../lib/fileHelper.js')
  var request = require('request')
  var FILE = path.join(__dirname, '../../../', 'CHANGELOG.md')

  // properties
  var apiURL = 'https://api.github.com/repos/'
  var gitURL = 'https://github.com/'
  var baseURL = 'BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/'
  var tagsURL = apiURL + baseURL + 'tags'
  var issuesURL = apiURL + baseURL + 'issues'
  var commitsURL = apiURL + baseURL + 'commits'

  // entry
  module.exports = updateChangeLog()

  function updateChangeLog () {
    var pageLimit = isReset() ? 50 : 2
    var tags = new Promise(function (resolve, reject) {
      readData(tagsURL, [], 1, pageLimit, function (values) {
        resolve(values)
      })
    })
    var issues = new Promise(function (resolve, reject) {
      readData(issuesURL, [], 1, pageLimit, function (values) {
        resolve(values)
      })
    })
    var commits = new Promise(function (resolve, reject) {
      readData(commitsURL, [], 1, pageLimit, function (values) {
        resolve(values)
      })
    })

    Promise.all([tags, issues, commits]).then(function (values) {
      var markdown = generateMarkdown(values)
      fileHelper.writeFile(FILE, markdown)
      // commitChanges()
    })
  }

  function isReset () {
    var args = process.argv.slice(2)
    for (var i = 0; i < args.length; i++) {
      var arg = args[i]
      if (arg === '-reset=true') {
        return true
      }
    }
    return false
  }

  function readData (url, data, page, pageLimit, callback) {
    var link = url + '?page=' + page
    link += (url.indexOf('issues') > 0) ? '&state=closed' : ''

    readGit(link, function (values) {
      data.push.apply(data, values)
      if (values.length === 0 || page >= pageLimit) {
        callback(data)
      } else {
        page += 1
        readData(url, data, page, pageLimit, callback)
      }
    })
  }

  function readGit (url, callback) {
    var options = {
      method: 'GET',
      url: url,
      headers: {
        'User-Agent': 'branch-cordova-sdk',
        'cache-control': 'no-cache'
      }
    }
    request(options, function (error, response, body) {
      if (response.statusCode === 200) {
        callback(JSON.parse(body))
      } else {
        throw new Error(JSON.parse(error || body))
      }
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
    return '# CHANGELOG\nQuestions? [Contact us](https://support.branch.io/support/tickets/new)\n\n'
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
    var paragraph = ''
    var hasHeader = false
    while (commits.length > 0) {
      var current = commits.pop()

      // (O)n (commit messages)
      var message = current.commit.message.replace(/(\r\n|\n|\r)/gm, '')

      if (!hasHeader) {
        paragraph += '- **Completed Changes**\n'
        hasHeader = true
      }

      paragraph += '  - ' + message + ' ([' + current.sha.substr(0, 5) + '](' + current.html_url + '))\n'

      if (currentTag.commit.sha === current.sha) {
        // assign date to be used for header and issues conditional
        var date = current.commit.author.date
        currentTag.date = date

        // complete body
        body = ''
        body += '(' + date.substr(0, 10) + ')\n\n'
        body += paragraph + '\n'
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
          paragraph += '- **Closed Issues**\n'
          hasHeader = true
        }

        paragraph += '  - ' + current.title.replace(/(\r\n|\n|\r)/gm, '') + ' ([#' + current.number + '](' + current.html_url + '))\n'
      }

      if (new Date(current.closed_at).getTime() < new Date(currentTag.date).getTime() && hasHeader) {
        body += paragraph + '\n'
        break
      }
    }

    return body
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
  // function commitChanges () {
  //   var git = 'git add ' + FILE + ' && git add git commit -m "chore: updated changelog" && git push'
  //   git = 'echo'
  //   exec(git, function (err, stdout, stderr) {
  //     if (err) {
  //       throw new Error('BRANCH SDK: Failed cto ommit git changes for changelog. Docs https://goo.gl/GijGKP')
  //     }
  //   })
  // }
})()
