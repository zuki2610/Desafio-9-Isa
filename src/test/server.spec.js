const request = require('supertest');
const app = require('../../server');

describe('Pruebas del servidor Express', () => {
    it('Prueba de conexión a la raíz', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.text).toBe('Web inicial');

    });

    it('POST /login Prueba de login de usuario registrado y envío de token que existe', async () => {
        // Simula una solicitud POST a /login con el email y el password en el body
        const response = await request(app)
            .post('/login')
            .send({ email: 'admin', password: '1234' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(typeof response.body.token).toBe('string');
    });

    it('GET /equipos/:id/jugadores Prueba de obtención de un objeto de jugadores por id de equipo', async () => {
        // Simula una solicitud GET a /equipos/:teamID/jugadores con un token válido
        const response = await request(app)
            .get('/equipos/2/jugadores')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwiaWF0IjoxNjg3NDcwMzc0fQ.L0sD8BRnSmoO9q4MCJ-rMmyqvmC6YEGB2Go0lnPCgFo');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
    });
    it('GET /equipos Prueba de obtención de un objeto de equipos', async () => {
        // Simula una solicitud GET a /equipos/:teamID/jugadores con un token válido
        const response = await request(app)
            .get('/equipos')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwiaWF0IjoxNjg3NDcwMzc0fQ.L0sD8BRnSmoO9q4MCJ-rMmyqvmC6YEGB2Go0lnPCgFo');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
    });

    it('POST /registro Prueba de registro de nuevo usuario y revisión de mensaje de usuario creado con éxito ', async () => {
        const usuario = {
            email: 'ejemplo@example.com',
            password: 'contraseña123',
        };

        // Simula una solicitud POST a /registro con un email y un password válidos
        const response = await request(app)
            .post('/registro')
            .send(usuario)
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwiaWF0IjoxNjg3NDcwMzc0fQ.L0sD8BRnSmoO9q4MCJ-rMmyqvmC6YEGB2Go0lnPCgFo');

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ mensaje: 'Usuario creado con éxito' });
    });

    it('POST /equipos Prueba de registro de nuevo equipo y revisión de mensaje de equipo ingresado con éxito ', async () => {
        const equipo = {
            name: "Equipo nuevo"
        };

        // Simula una solicitud POST a /registro con un email y un password válidos
        const response = await request(app)
            .post('/equipo')
            .send(equipo)
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwiaWF0IjoxNjg3NDcwMzc0fQ.L0sD8BRnSmoO9q4MCJ-rMmyqvmC6YEGB2Go0lnPCgFo');

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ mensaje: 'Equipo ingresado con éxito.' });
    });

    it('POST /equipos/:id/jugadores Prueba de registro de nuevo jugador a equipo y revisión de mensaje de jugador ingresado con éxito ', async () => {
        const equipo = {
            name: "Jugador nuevo",
            "id_posicion": 2
        };

        // Simula una solicitud POST a /registro con un email y un password válidos
        const response = await request(app)
            .post('/equipos/2/jugadores')
            .send(equipo)
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwiaWF0IjoxNjg3NDcwMzc0fQ.L0sD8BRnSmoO9q4MCJ-rMmyqvmC6YEGB2Go0lnPCgFo');

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ mensaje: 'Jugador ingresado con éxito.' });
    });
    test('Prueba de ruta no definida', async () => {
        // Simula una solicitud GET a una ruta no definida
        const response = await request(app).get('/ruta-no-existente');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'La ruta que intenta consultar no existe' });
    });



});