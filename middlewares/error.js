export const errorMiddleware = (err, req,res, next)=>{
    err.statusCode = err.statusCode? err.statusCode: 500;
    //internal server error
    err.message = err.message || "Something went wrong",
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}