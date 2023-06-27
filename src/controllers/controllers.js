require('dotenv').config();
const jwt = require("jsonwebtoken")
const models = require('../models/models');


const registrarUsuario = async (req, res) => {
    try {
        const usuario = req.body;
        await models.registrarUsuario(usuario);
        //console.log(row);
        res.status(201).json({mensaje: "Usuario creado con éxito"});
    } catch ({ code, message }) {
        console.log(message);
        res.status(code || 500).json(message);
    }
}

const obtenerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        await models.verificarCredenciales(email, password);
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        console.log("Token generado para usuario: ", email);
        res.json({ message: 'Token enviado', token });
    } catch ({ code, message }) {
        console.log(message);
        res.status(code || 500).send(message);
    }
}

const registrarEquipo = async (req, res) => {
    try {
        const equipo = req.body;
        const row = await models.registrarEquipo(equipo);
        console.log(row);
        res.status(201).json({mensaje: "Equipo ingresado con éxito."});
    } catch ({ code, message }) {
        console.log(message);
        res.status(code || 500).json(message);
    }
}

const registrarJugador = async (req, res) => {
    try {
        const jugador = req.body;
        const id_equipo = req.params.teamID;
        const row = await models.registrarJugador(jugador, id_equipo);
        console.log(row);
        res.status(201).json({mensaje:"Jugador ingresado con éxito."});
    } catch ({ code, message }) {
        console.log(message);
        res.status(code || 500).json(message);
    }
}

const obtenerEquipos = async (req, res) => {
    try {
        result = await models.obtenerEquipos();
        console.log("Datos de cada equipo enviados. Datos: ", result);
        res.json(result);

    } catch ({ code, message }) {
        console.log(message);
        res.status(code || 500).send(message);
    }
}


const obtenerJugadoresPorEquipo = async (req, res) => {
    try {

        const id_equipo = req.params.teamID;
        const result = await models.obtenerJugadoresPorEquipo(id_equipo);
        console.log("Datos de jugadores enviados. Datos: ", result);
        res.json(result);

    } catch ({ code, message }) {
        console.log(message);
        res.status(code || 500).send(message);
    }
}

module.exports = {
    registrarEquipo,
    obtenerEquipos,
    registrarJugador,
    obtenerJugadoresPorEquipo,
    obtenerLogin,
    registrarUsuario,
    obtenerEquipos
};