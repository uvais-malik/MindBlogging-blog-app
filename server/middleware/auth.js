import jwt from 'jsonwebtoken';

const auth = (req, res, next)=>{

    const token = req.headers.authorization;

    try {

        jwt.verify(token, process.env.JWT_SECRET)
        next();
        
    } catch (error) {
        res.json({
            success: false,
            message: "Invalid token"
        })
    }
}

export default auth;

// import jwt from 'jsonwebtoken';

// const auth = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       return res.status(401).json({
//         success: false,
//         message: "No authorization header provided"
//       });
//     }

//     const token = authHeader.split(" ")[1]; // ✅ removes "Bearer"
//     jwt.verify(token, process.env.JWT_SECRET); // ✅ verify actual token

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid token"
//     });
//   }
// };

// export default auth;
