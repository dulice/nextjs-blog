import jwt from 'jsonwebtoken'
export const AuthToken = (user) => {
    return jwt.sign({
        _id: user._id
    }, process.env.SECRET_TOKEN, { expiresIn: '7d'})
};

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(token) {
        jwt.verify(token, process.env.SECRET_TOKEN, (err, decode) => {
            if(err) {
                res.status(401).json({message: "Authorization fail"})
            }
            req.user = decode;
            next();
        })
    } else {
        res.status(403).json({message: "No Token"})
    }
}