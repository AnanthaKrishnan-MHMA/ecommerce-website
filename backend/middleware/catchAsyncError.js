module.exports = (asyFun) => (req, res, next) => {
    Promise.resolve(asyFun(req, res, next)).catch(next);
}