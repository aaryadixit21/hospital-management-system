export const generateTokens = async(user, message, statusCode, res) => {
    const token =await user.generateJwtTokens();
    const cookieNme = user.role === "Admin" ? "adminToken" : "patientToken"
    res
    .status(statusCode)
    .cookie(cookieNme, token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 *60 * 1000
        ),
        httpOnly: true,
    })
    .json({
        success: true,
        message,
        user,
        token
    })
}