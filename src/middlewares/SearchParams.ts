import { Request, Response, NextFunction } from 'express'

export async function SearchParams(req: Request, res: Response, next: NextFunction) {
  const owner = req.query.owner
  const repo = req.query.repo

  if (!owner || !repo) {
    console.log(`Project ${owner}/${repo} not found.`)
    res.status(404).send(`Project ${owner}/${repo} not found.`)
    return
  }

  // test owner / repo in db

  next()
}
