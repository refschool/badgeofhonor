// CRUD?

import express from 'express'
import { getSvg } from '../controllers/svg'
import { SearchParams } from '../middlewares/SearchParams'
import { getData } from '../middlewares/GetData'

const router = express.Router()

router.get('/tag', SearchParams, getData, getSvg)

export default router
