export const errorMiddleware = ((err, req, res, next) => {
    err.message || (err.message = "Internal Server Issue");
    err.statusCode || (err.statusCode = 500);
    if (err.name === "CastError")
        err.message = "Invalid ID";
    return res.status(400).json({
        success: false,
        message: err.message,
    });
});
export const TryCatch = (func) => {
    return (req, res, next) => {
        return Promise.resolve(func(req, res, next).catch(next));
    };
};
