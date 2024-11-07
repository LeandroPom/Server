const { User } = require('../../db')


module.exports = async ( name, email, password, profileFoto, role ) => {


    //busca los Usuarios registrados en la db
    const registered = await User.findOne(
        { where: {
            name: name
        }
    })

    if (registered){
        // si encuentra el Usario, muestra un error
        return 'this user already exists'
    }

    //crea un nuevo Usuario en la db
    const [newUser] = await User.findOrCreate({
        where: { name: name },
        defaults: {
            name,
            email,
            password,
            profileFoto,
            role
        }
    });

    return newUser, console.log("new user created");
}

