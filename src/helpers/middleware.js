const express = require('express');
const router = express.Router();


function toUrlFriendly(text) {
    return text
        .toLowerCase()  // Convierte a minúsculas
        .replace(/\s+/g, '-')  // Reemplaza espacios por guiones
        .replace(/[^\w\-]+/g, '')  // Elimina caracteres no deseados
        .replace(/\-\-+/g, '-')  // Elimina guiones duplicados
        .replace(/^-+/, '')  // Elimina guiones al principio
        .replace(/-+$/, '');  // Elimina guiones al final
}

function urlFriendlyMiddleware(req, res, next) {
    // Modifica los parámetros para que sean amigables para la URL
    if (req.params.tarifasData) {
        req.params.tarifasData = toUrlFriendly(req.params.tarifasData);
    }

    if (req.params.tarifasName) {
        req.params.tarifasName = toUrlFriendly(req.params.tarifasName);
    }

    if (req.params.tarifastype) {
        req.params.tarifastype = toUrlFriendly(req.params.tarifastype);
    }

    next();
}



// Aplica el middleware antes de las rutas que lo necesiten
router.use('/data/:tarifasData', urlFriendlyMiddleware);


module.exports = router;
