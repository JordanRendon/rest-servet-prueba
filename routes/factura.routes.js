const { Router } = require('express')
const { check } = require('express-validator')
const { createFactura, getFacturas } = require('../controllers/factura.controller')
const { userByIdExists } = require('../helpers/db-validators')

const { validateFields, validateJWT } = require('../middlewares')

const router = Router()


router.get('/', getFacturas)

router.post(
  '/',
  [
    // validateJWT,
    check('user', 'El usuario es requerido').not().isEmpty(),
    check('productos', 'Debe ser una array de ids de productos').isArray(),
    check('productos', 'Debe haber minimo un producto').isLength({min:1}),

    validateFields,
  ],
  createFactura
)


module.exports = router
