const Producto = require('../models/Producto');
const {Op} = require('sequelize');
const Cliente = require('../models/Cliente');

//funcion para agregar un producto
exports.agregar = async (request, response, next) => {
    try {
        //crear el producto con los datos recibidos en el request.body
        await Producto.create(request.body);
        response.json({mensaje: 'Se ha registrado el producto'});

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
            mensaje: 'Error al registrar el producto',
            errores,
        });
        next();
    }
};

//listar  productos
exports.listar = async (req, res, next) => {
    try {
        //implementacion del filtro
        let filtro = req.query;
        if (req.query.q) {
            filtro = {nombre: {[Op.like]: `%${req.query.q}%`}};
        }
        const productos = await Producto.findAll({
            where: filtro,
            include: [
                {model: Cliente}
            ]
        });
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.json({mensje: 'Error al leer los productos'});
    }
}

//mostrar producto
exports.mostrar = async (req, res, next) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if(!producto) { 
            res.status(404).json({mensaje: 'No se encontro el producto'});
        } else {
            res.json(producto);
        }
    } catch (error) {
        console.log(error);
        res.status(503).json({mensaje: 'Error al leer el producto'});
    }
};

//actualizar un producto
exports.actulizar = async (req, res, next) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if(!producto) { 
            res.status(404).json({mensaje: 'No se encontro el producto'});
        } else {
            Object.keys(req.body).forEach((propiedad) => {
                producto[propiedad] = req.body[propiedad];
            });
            await producto.save();
            res.json({mensaje: 'El producto fue actualizado'})
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
            mensaje: 'Error al registrar el producto',
            errores,
        });
    }
};

//Eliminar un producto
exports.eliminar = async (req, res, next) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if(!producto) {
            res.status(404).json({mensaje: 'No se encontro el producto'});
        } else {
            await producto.destroy();
            res.json({mensaje: 'El producto fue eliminado'});
        } 
    } catch (error) {
        res.status(503).json({mensaje: 'Error al eliminar'});  
    }
}