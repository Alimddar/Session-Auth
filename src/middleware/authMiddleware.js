export const isAuthenticated = async (req, res, next) => {
    if(req.session.user){
        next();
    }else{
        res.status(401).send('You need to log in');
    }
};
