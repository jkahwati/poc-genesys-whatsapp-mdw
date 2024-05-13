const express = require('express');
const router = express.Router();

// Endpoint para /wh
router.post('/', (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        // Accedemos a io utilizando req.app.get('io')
        console.log("Llego mensaje de genesys:", body);
        try {
            req.app.get('io').emit('webhook', body);
            res.sendStatus(200);
        } catch (error) {
            console.error("Error al emitir el evento 'webhook':", error);
            res.sendStatus(500); // Envía un estado de error al cliente
        }
    });
});

module.exports = router;
