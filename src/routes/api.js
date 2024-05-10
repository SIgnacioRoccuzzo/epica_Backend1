const express = require('express');
const router = express.Router(); // Correcto


router.use('/tarifas', require('./api/tarifas'));


// Exporta el enrutador para usarlo en otros archivos
module.exports = router;
