const { User } = require('../../db')


module.exports = async () => {

    //Busca todos los usuarios en la db
    const allUsers = await User.findAll()

    if(allUsers.length){

        return allUsers
    }
    
    return console.log('No hay usuarios')
}