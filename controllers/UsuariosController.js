const Usuario = require('../models/Usuario');

exports.agregar = async (request, response, next) => {
    try {
        await Usuario.create(request.body);
        response.json({mensaje: 'Se ha registrado el usuario'});

    } catch (error) {
        console.log(error);

        let errores = [];
        if (error.errors){
            errores = error.errors.map((item) =>({
                campo: item.path,
                error: item.message,
            }))
        }

        response.json({
            error: true,
            mensaje: 'Error al registrar el usuario',
            errores
        });
        next();
    }
};

exports.listar = async (req, res, next) => {
    try {
        const usuarios = await Usuario.findAll({});
        res.json(usuarios);
    } catch (error) {
        console.log(error);
        res.json({mensje: 'Error al leer los usuarios'});
    }
}

exports.mostrar = async (req, res, next) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if(!usuario) { 
            res.status(404).json({mensaje: 'No se encontro el usuario'});
        } else {
            res.json(usuario);
        }
    } catch (error) {
        console.log(error);
        res.status(503).json({mensaje: 'Error al leer el usuario'});
    }
};

exports.actulizar = async (req, res, next) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if(!usuario) { 
            res.status(404).json({mensaje: 'No se encontro el usuario'});
        } else {
            Object.keys(req.body).forEach((propiedad) => {
                usuario[propiedad] = req.body[propiedad];
            });

            await usuario.save();
            res.json({mensaje: 'El usuario fue actualizado'})
        }
    } catch (error) {
        console.log(error);
        let errores = [];
        if(error.errors){
            errores = error.errors.map((item) => ({
                campo: item.path,
                error: item.message,

            }));
        }
        res.status(503).json({
            error: true,
            mensaje: 'Error al registrar el usuario',
            errores,
        });
    }
};

exports.eliminar = async (req, res, next) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if(!usuario) { 
            res.status(404).json({mensaje: 'No se encontro el usuario'});
        } else {
            await usuario.destroy();
            res.json({mensaje: 'El usuario fue eliminado'});
        } 
    } catch (error) {
        res.status(503).json({mensaje: 'Error al eliminar'});  
    }
}