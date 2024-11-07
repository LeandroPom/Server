const createUser = require ('../../controllers/users/createUser')


module.exports = async (req, res) => {

    const { 
        name,
        email,
        password,
        profileFoto,
        role
    } = req.body;

    try {

        let newUser = await createUser ( 
            name,
            email,
            password,
            profileFoto,
            role
        );

        if (newUser === 'this user already exists') {
           
            return res.status(409).json(newUser);

        }else{

            return res.status(201).json(newUser);
        }
        
    } catch (error) {

        res.status(500).json(error.message);
    }
}