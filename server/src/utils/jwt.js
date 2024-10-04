

 const accessTokenExpire = parseInt(
    process.env.ACCESS_TOKEN_EXPIRE || '300',10
 )
 const refreshTokenExpire = parseInt(
    process.env.REFRESH_TOKEN_EXPIRE || '1200',10
 )

 const accessTokenOptions = {
    expires : new Date(Date.now() + accessTokenExpire *60 * 60 * 1000),
    maxAge: accessTokenExpire *60 *60*1000,
    httpOnly: true,
    //? secure: process.env.NODE_ENV === 'production',
    secure:true,
 }

 const refreshTokenOptions = {
   expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
   maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000, 
   httpOnly: true,
   secure: true,
};
 const sendToken = (user,statusCode,res) =>{
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();
 
    res.cookie("access_token", accessToken, accessTokenOptions)
    res.cookie("refresh_token", refreshToken, refreshTokenOptions)

    res.status(statusCode).json({
        accessToken,
        success:true,
        user
    })
 }



 export {accessTokenOptions,refreshTokenOptions,sendToken}