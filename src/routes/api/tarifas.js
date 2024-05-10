const router = require('express').Router();
const tarifasController = require('../../controllers/tarifas.controller');
const urlFriendlyMiddleware = require('../../helpers/middleware')

// Obtener todas las tarifas
router.get('/', tarifasController.getTarifas);

//obtener por id
router.get('/:tarifasId', tarifasController.getById);

// Obtener por tipo
router.get('/type/:tarifastype', tarifasController.getBytype);

// Obtener por nombre
router.get('/name/:tarifasName', tarifasController.getByName);

// Obtener por datos
router.get('/gb/:tarifasGb', tarifasController.getByGb);

// Obtener por datos
router.get('/speed/:tarifasSpeed', tarifasController.getBySpeed);

//Crear tarifa
router.post('/', tarifasController.createTarifa);
//Actualizar Tarifas
router.put('/:tarifasId', tarifasController.updateTarifa);
//Borrar tarifas
router.delete('/:tarifaId', tarifasController.deleteTarifa);

module.exports = router;
