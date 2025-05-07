import { Request, Response, NextFunction } from 'express'
import { Octokit } from 'octokit'
import db from '../services/db_cache'

// not authentication: 60request/H | authentication: 5000request/H
const octokit = new Octokit({
  // auth: 'YOUR-TOKEN'
})

// add project in db
db.add('Sylvainxiii', 'EasyUpload')
db.add('refschool', 'easyupload')
db.add('refschool', 'restaurant')
// db.add('student', 'project')
// db.add('student01', 'project01')
// db.add('student02', 'project02')

declare module 'express-serve-static-core' {
  interface Request {
    data: Array<{ name: string; total_pulls_request: number }>
  }
}

export async function getData(req: Request, res: Response, next: NextFunction) {
  const owner = req.query.owner as string
  const repo = req.query.repo as string

  const topList = db.get(owner, repo)

  if (topList) {
    try {
      await db.update(owner, repo, async () => {
        const data: PullRequest[] = await githubApiGetPullsRequest(owner, repo)
        return sort(countPullRequestPerUser(data))
      })

    } catch (error) {
      console.error('GitHub API Error:', error)
      res.status(500).json({ error: 'Failed to fetch data from GitHub' })
      return
    }

    req.data = db.get(owner, repo)!.list
    next()

  } else {
    res.status(404).json({ error: `Repository ${owner}/${repo} not found in database.` })
    return
  }
}

// get all pulls request in repo
type PullRequest = {
  user: { login: string }
}
async function githubApiGetPullsRequest(owner: string, repo: string): Promise<PullRequest[]> {
  try {
    console.log('Fetching data from GitHub...')
    return await octokit.paginate(`GET /repos/${owner}/${repo}/pulls?state=all`, {
      owner,
      repo,
      per_page: 100,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      },
    })
  } catch (error) {
    console.error('GitHub API Error:', error)
    throw 'Failed to fetch data from GitHub'
  }
}

// sort list per total pulls request (MAX => MIN)
function sort(listTMP: { [key: string]: number }) {
  return Object.entries(listTMP)
    .map(([name, total_pulls_request]) => ({ name, total_pulls_request }))
    .sort((a, b) => b.total_pulls_request - a.total_pulls_request)
}

function countPullRequestPerUser(data: PullRequest[]) {
  const topList: { [key: string]: number } = {}
  for (const contributor of data) {
    topList[contributor.user.login] ??= 0
    topList[contributor.user.login] += 1
  }
  return topList
}