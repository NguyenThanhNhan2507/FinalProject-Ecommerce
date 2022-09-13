module.exports = (funC) => (req, res, next) =>{
    Promise.resolve(funC(req, res, next)).catch(next)
}