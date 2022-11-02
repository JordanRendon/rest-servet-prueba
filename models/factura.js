const { DateTime } = require('luxon')
const { Schema, model } = require('mongoose')

const FacturaSchema = Schema({
  producto: {
    type: [Schema.Types.ObjectId],
    ref: 'Producto',
    default: [],
  },
  createdAt: {
    type: Date,
    required: true,
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  }
 
})

FacturaSchema.methods.toJSON = function () {
  const { __v, _id, createdAt,  ...factura } = this.toObject()
  factura.id = _id

  factura.createdAt = DateTime.fromISO(createdAt.toISOString())

  const {_id:u_id,__v:u__v, password, ...user} = factura.user
    user.id= u_id
    factura.user = user

    factura.productos = factura.productos.map((elem)=>{
        const {_id:p_id,__v:p__v, img, ...producto } = elem
        elem.id= p_id
        return producto
    })

  return factura
}

module.exports = model('Factura', FacturaSchema)
