const router = require('express').Router();
const controllers = require('../controllers/controllers');
const middlewares = require('../middlewares/middlewares');

// Endpoint para el inicio de sesión
router.post('/login', middlewares.verificarCredencialesM, controllers.obtenerLogin);

router.get('/equipos/:teamID/jugadores', middlewares.validarTokenM, controllers.obtenerJugadoresPorEquipo);

router.get('/equipos', middlewares.validarTokenM, controllers.obtenerEquipos);

router.post('/registro', middlewares.validarTokenM, controllers.registrarUsuario);

router.post('/equipo', middlewares.validarTokenM, controllers.registrarEquipo);

router.post('/equipos/:teamID/jugadores', middlewares.validarTokenM, controllers.registrarJugador);

module.exports = router;