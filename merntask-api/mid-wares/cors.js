module.exports = (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    //  res.ser('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    next()
        
}