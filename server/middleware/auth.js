import jwt, { decode } from 'jsonwebtoken'

// wants to like a post
// click the like button => auth middleware(NEXT) => Like controller

const auth = async(req,res,next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const isCustomAuth = token.length < 500
        let decodedData;
        if(token && isCustomAuth){
            decodedData=jwt.verify(token,'test');
            req.userId=decodedData?.id;
        }
        else{
            decodedData=jwt.decode(token)
            req.userId=decodedData?.sub; //Google's name for specific Id to differentiate
        }
        next();
    } catch (error) {
        console.log(error)
    }
}

export default auth