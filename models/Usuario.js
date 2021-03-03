const Sequelize = require('sequelize');

const db = require('../config/db');

const Usuario = db.define('Usuario', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Nombre no puede quedar vacío',
            },
        }
    },
    email: {
        type: Sequelize.STRING(32),
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'Email no puede quedar vacío',
            },
            notEmpty: {
                args: true,
                msg: 'Email no puede quedar vacío',
            },
            isEmail: {
                args: true,
                msg: 'No es un email valido',
            },
        }
    },
    telefono: {
        type: Sequelize.STRING(16),
        validate: {
            isMobilePhone: {
                args: ['es-MX'],
                msg: 'No es un numero telefonico valido'
            }
        }
    },
    contraseña:{
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'Contraseña no puede quedar vacío',
            },
            notEmpty: {
                args: true,
                msg: 'Contraseña no puede quedar vacío',
                },
        }
    }
})



module.exports = Usuario;