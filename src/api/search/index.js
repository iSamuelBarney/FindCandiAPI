import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller'

const router = new Router()

/**
 * @api {post} /search Create find candi api yo
 * @apiName CreateFindCandiApiYo
 * @apiGroup FindCandiApiYo
 * @apiSuccess {Object} findCandiApiYo Find candi api yo's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Find candi api yo not found.
 */
router.post('/',
  create)

/**
 * @api {get} /search Retrieve find candi api yos
 * @apiName RetrieveFindCandiApiYos
 * @apiGroup FindCandiApiYo
 * @apiUse listParams
 * @apiSuccess {Object[]} findCandiApiYos List of find candi api yos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /search/:id Retrieve find candi api yo
 * @apiName RetrieveFindCandiApiYo
 * @apiGroup FindCandiApiYo
 * @apiSuccess {Object} findCandiApiYo Find candi api yo's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Find candi api yo not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /search/:id Update find candi api yo
 * @apiName UpdateFindCandiApiYo
 * @apiGroup FindCandiApiYo
 * @apiSuccess {Object} findCandiApiYo Find candi api yo's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Find candi api yo not found.
 */
router.put('/:id',
  update)

/**
 * @api {delete} /search/:id Delete find candi api yo
 * @apiName DeleteFindCandiApiYo
 * @apiGroup FindCandiApiYo
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Find candi api yo not found.
 */
router.delete('/:id',
  destroy)

export default router
