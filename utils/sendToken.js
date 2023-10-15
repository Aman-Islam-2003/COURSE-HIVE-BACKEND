export const sendToken = (res, user, message, statusCode = 200)=>{
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        message,
        user
     })
}