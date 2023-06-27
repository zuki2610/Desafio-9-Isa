const pool = require('../config/database'); 
const bcrypt = require('bcryptjs');

const verificarCredenciales = async (email, password) => {

    let usuario;
    let rowCount;

    //Verificar que el email y password están en la base de datos
    const values = [email];
    const consulta = "SELECT * FROM usuarios WHERE email = $1";

    //Realizar consulta a la base de datos y verificar si hay conexión
    try {
        const result = await pool.query(consulta, values);
        usuario = result.rows[0];
        rowCount = result.rowCount;

    } catch (error) {
        throw { code: 500, message: "Hay un error interno en el sistema." };
    }

    //Verificar si el usuario existe en la base de datos
    if (!usuario || !usuario.password) {
        throw { code: 401, message: "Usuario no existe en el sistema." };
    }

    //Obtener la password encriptada desde la base de datos
    const { password: passwordEncriptada } = usuario;
    //Encriptar la password antes de realizar la comparación
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);

    //Verificar que la password coincide con la que se encuentra en la base de datos
    if (!passwordEsCorrecta || !rowCount) {
        throw { code: 401, message: "Email o contraseña incorrecta." };
    }

};

const registrarUsuario = async (usuario) => {

    try {
        const { email, password} = usuario;

         // Verificar si algún dato no está definido o no tiene datos
        if (!email || !password) {
            console.log("Datos incompletos, se deben completar todos antes de continuar.")
            throw { code: 400, message: "Datos incompletos." };
        }
        console.log("Se ingresaron todos los datos, se puede continuar. ");
        // Verificar si el email ya está registrado
        const emailExistente = await pool.query("SELECT email FROM usuarios WHERE email = $1", [email]);
        //console.log(emailExistente.rows.length)
        if (emailExistente.rows.length > 0) {
            
            throw { code: 400, message: "El email ya está registrado." };
        } else {
            // Encriptar la password antes de registrar al usuario en la base de datos
            const passwordEncriptada = bcrypt.hashSync(password);
            const values = [email, passwordEncriptada];
            //Insertar nuevo usuario en la base de datos. 
            const consulta = "INSERT INTO usuarios (email, password) values($1,$2) RETURNING *";
            const result = await pool.query(consulta, values);
            console.log("Usuario creado con éxito.")
            return result.rows[0];
        }

    } catch (error) {
        if (error.code) {
            // Si el error tiene un código definido, se lanza tal cual
            throw error;
        } else {
            // Si el error es genérico, se lanza con el código 500
            console.log("Hay un error interno en el sistema.");
            throw { code: 500, message: "Hay un error interno en el sistema." };
        }
    }
}

const registrarEquipo = async (equipo) => {

    try {
        const {name} = equipo;

        // Verificar si el Equipo ya está registrado
        const emailExistente = await pool.query("SELECT name FROM equipos WHERE name = $1", [name]);
        //console.log(emailExistente.rows.length)
        if (emailExistente.rows.length > 0) {
            
            throw { code: 400, message: "El equipo ya está registrado." };
        } else {

            const values = [name];
            //Insertar nuevo usuario en la base de datos. 
            const consulta = "INSERT INTO equipos (name) values($1) RETURNING *";
            const result = await pool.query(consulta, values);
            console.log("Equipo ingresado con éxito.")
            return result.rows[0];
        }

    } catch (error) {
        if (error.code) {
            // Si el error tiene un código definido, se lanza tal cual
            throw error;
        } else {
            // Si el error es genérico, se lanza con el código 500
            console.log("Hay un error interno en el sistema.");
            throw { code: 500, message: "Hay un error interno en el sistema." };
        }
    }
}

const registrarJugador = async (jugador, id_equipo) => {

    try {

        const {name, id_posicion} = jugador;

        // Verificar si el email ya está registrado
        const emailExistente = await pool.query("SELECT name FROM jugadores WHERE name = $1", [name]);
        //console.log(emailExistente.rows.length)
        if (emailExistente.rows.length > 0) {
            
            throw { code: 400, message: "El jugador ya está registrado." };
        } else {

            const values = [name, id_equipo, id_posicion];
            //Insertar nuevo usuario en la base de datos. 
            const consulta = "INSERT INTO jugadores (name, id_equipo, id_posicion) values($1, $2, $3) RETURNING *";
            const result = await pool.query(consulta, values);
            console.log("Jugador ingresado con éxito.")
            return result.rows[0];
        }

    } catch (error) {
        if (error.code) {
            // Si el error tiene un código definido, se lanza tal cual
            throw error;
        } else {
            // Si el error es genérico, se lanza con el código 500
            console.log("Hay un error interno en el sistema.");
            throw { code: 500, message: "Hay un error interno en el sistema." };
        }
    }
}

const obtenerJugadoresPorEquipo = async (id_equipo) => {
    try {

        //Seleccionar los datos del usuario desde la base de datos
        const consulta = "SELECT c.name as equipo, a.name as name, b.name as posicion  FROM jugadores as a inner join posiciones as b on a.id_posicion = b.id inner join equipos AS c ON a.id_equipo=c.id WHERE a.id_equipo = $1";
        values=[id_equipo];
        const { rowCount, rows } = await pool.query(consulta, values);
        if (!rowCount) throw { code: 404, message: "No se encontró ningún jugador." }
        return rows;
    } catch (error) {
        throw { code: error.code || 500, message: "Hay un error interno en el sistema." };
    }
}

const obtenerEquipos = async () => {
    try {

        //Seleccionar los datos del usuario desde la base de datos
        const consulta = "SELECT id, name FROM equipos";
        const { rowCount, rows } = await pool.query(consulta);
        if (!rowCount) throw { code: 404, message: "No se encontró ningún equipo." }
        return rows;
    } catch (error) {
        throw { code: error.code || 500, message: "Hay un error interno en el sistema." };
    }
}

module.exports = {
    verificarCredenciales, 
    registrarUsuario,
    registrarEquipo,
    registrarJugador,
    obtenerJugadoresPorEquipo,
    obtenerEquipos
};
