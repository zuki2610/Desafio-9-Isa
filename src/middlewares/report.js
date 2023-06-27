const reportMiddleware = (req, res, next) => {
    const { method, originalUrl, body, protocol, hostname } = req;
    const timestamp = new Date();
    const fecha = timestamp.toISOString().slice(0, 10);
    const fechaLatino = fecha.split('-').reverse().join('/');
    const hora = timestamp.toTimeString().slice(0, 8);

    console.log(`--------------------------------------------------------`);
    console.log(`REPORTE DE SOLICITUD`);
    console.log(`Url:    ${protocol}://${hostname}${originalUrl}`);
    console.log('Fecha: ', fechaLatino);
    console.log('Hora:  ', hora);
    console.log(`Método: ${method}`);
    if (body.email) console.log('Email: ', body.email);
    if (body.rol) console.log('Rol: ', body.rol);
    if (body.lenguage) console.log('Lenguaje: ', body.lenguage);
    
    next();
};


module.exports = reportMiddleware;