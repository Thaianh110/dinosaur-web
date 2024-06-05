const userRouter = require('./user');
const {errHandler,notFound} = require('../middlewares/errHandler')

const routes = (app) => {
    app.use('/api/user',userRouter); 
    // khi ko có api nào được timd thấy 
    app.use(notFound)
    app.use(errHandler)
}


module.exports = routes