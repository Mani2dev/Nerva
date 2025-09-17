import jwt from 'jsonwebtoken'

class _JWT {
    constructor(secret, opts = {}) {
        this.secret = secret
        this.opts = opts
    }

    sign(payload, extra = {}) {
        if (!payload || !payload.uid) throw new Error('Missing uid payload')
        const options = Object.assign({}, this.opts, extra)
        return jwt.sign(payload, this.secret, options)
    } 

    verify(token) {
        try {
            return jwt.verify(token, this.secret)
        }
        catch { return null }
    }
}

module.exports = _JWT