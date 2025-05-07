import { Request, Response } from 'express'

async function htmlListTags(req: Request) {
  return req.data.map(({
    name,
    total_pulls_request
  }) => {
    return `<div class="tag">
            <div class="t1" ><p>${name}</p></div>
            <div class="t2" ><p >${total_pulls_request}</p></div>
          </div>`
  })
}

async function htmlSvg(req: Request, _res: Response) {

  /**
 * url params
 * t1, t2 -> text
 * fg1, fg2 -> font-color
 * bg1, bg2 -> background-color
 */

  const t1 = req.query.t1 ?? 'Text'
  const t2 = req.query.t2 ?? 'Text'
  const fg1 = req.query.fg1 ?? 'ffffff'
  const fg2 = req.query.fg2 ?? 'ffffff'
  const bg1 = req.query.bg1 ?? '666666'
  const bg2 = req.query.bg2 ?? '669900'
  const owner = req.query.owner ?? 'owner'
  const repo = req.query.repo ?? 'repo'

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" fill="none">

    <title>${owner}/${repo}</title>

    <foreignObject width="100%" height="100%">
      
      <div xmlns="http://www.w3.org/1999/xhtml">

        <style>
          .tag {
            display: flex; 
            font-family: Verdana,Geneva,DejaVu Sans,sans-serif;
            width: fit-content; 
          }

          .tag p {
            padding: 5px;
            margin: 0;
            text-shadow: 0px 1px #00000077;
          }

          .tag-list {
            display: flex;
            gap: 5px;
            flex-wrap: wrap;
          }

          .tag .t1 {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            background: linear-gradient(#${bg1}bb, #${bg1});
            color: #${fg1}; 
          }

          .tag .t2 {
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            background: linear-gradient(#${bg2}bb, #${bg2});
            color: #${fg2}; 
          }
        </style>

        <div class="tag-list">

          <div class="tag">
            <div class="t1" ><p>${t1}</p></div>
            <div class="t2" ><p >${t2}</p></div>
          </div>

          ${(await htmlListTags(req)).join(' ')}

          
          <!-- <div class="tag">
            <div class="t1" ><p>${t1}</p></div>
            <div class="t2" ><p >${t2}</p></div>
          </div> -->

        </div>

      </div>
    
    </foreignObject>

  </svg>`
}

export async function getSvg(req: Request, res: Response) {
  try {
    res.setHeader('Content-Type', 'image/svg+xml')
    res.send(await htmlSvg(req, res))
  } catch (error) {
    res.setHeader('Content-Type', 'text/plain')
    res.send(error)
    console.log(error)
  }
}
