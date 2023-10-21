export const catchAsyncError = (passedFunction) => (req,res,next) => {
    Promise.resolve(passedFunction(req,res,next)).catch(next);//catch block needs an arrow ftn but we just pass the function don't call it because it will do it itself
}
