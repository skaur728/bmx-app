/**
 * copied from https://www.npmjs.com/package/mongoose-lean-objectid-string and expanded to include other queries
 *
 * changes _id ObjectId String type
 */
/* eslint-disable */
// If someone wants to type this up, be my guest
module.exports = function mongooseLeanId(schema) {
  schema.post('find', attachId)
  schema.post('findOne', attachId)
  schema.post('findOneAndUpdate', attachId)
  schema.post('findById', attachId)
  schema.post('findByIdAndUpdate', attachId)
  schema.post('findByIdAndDelete', attachId)
}

function attachId(res) {
  if (res == null) {
    return
  }

  function replaceId(res) {
    if (Array.isArray(res)) {
      res.forEach((v) => {
        if (isObjectId(v)) {
          return
        }
        if (v._id) {
          v._id = v._id.toString()
        }
        Object.keys(v).map((k) => {
          if (Array.isArray(v[k])) {
            replaceId(v[k])
          }
        })
      })
    } else {
      if (isObjectId(res)) {
        return res
      }
      if (res._id) {
        res._id = res._id.toString()
      }
      Object.keys(res).map((k) => {
        if (Array.isArray(res[k])) {
          replaceId(res[k])
        }
      })
    }
  }

  if (this._mongooseOptions.lean) {
    replaceId(res)
  }
}

function isObjectId(v) {
  if (v == null) {
    return false
  }
  const proto = Object.getPrototypeOf(v)
  if (
    proto == null ||
    proto.constructor == null ||
    proto.constructor.name !== 'ObjectID'
  ) {
    return false
  }
  return v._bsontype === 'ObjectID'
}
