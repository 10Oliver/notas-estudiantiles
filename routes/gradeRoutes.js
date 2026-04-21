const express = require('express');
const { calculateAverage } = require('../controllers/gradeController');
const { validateGrades } = require('../middlewares/validationMiddleware');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /grades/calculate:
 *   post:
 *     summary: Calcula el promedio de un arreglo de notas estudiantiles
 *     description: Recibe un arreglo de mínimo 3 notas (valores entre 0 y 10, máximo 2 decimales), calcula su promedio e indica si el estudiante aprobó (promedio >= 6).
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - grades
 *             properties:
 *               grades:
 *                 type: array
 *                 items:
 *                   type: number
 *                   format: float
 *                   minimum: 0
 *                   maximum: 10
 *                 minItems: 3
 *                 description: Arreglo de notas
 *                 example: [7.5, 8.25, 9, 6.4]
 *     responses:
 *       200:
 *         description: Promedio calculado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 average:
 *                   type: number
 *                   description: Promedio calculado
 *                   example: 7.79
 *                 passed:
 *                   type: boolean
 *                   description: Indica si aprobó o no
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Mensaje sobre el estado de aprobación
 *                   example: Felicidades, el estudiante ha aprobado.
 *       400:
 *         description: Error de validación en las notas proporcionadas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                       value:
 *                         type: string
 *                       msg:
 *                         type: string
 *                       path:
 *                         type: string
 *                       location:
 *                         type: string
 *             example:
 *               errores: [
 *                 {
 *                   "type": "field",
 *                   "value": 11,
 *                   "msg": "Cada nota debe ser un número entre 0 y 10",
 *                   "path": "grades[0]",
 *                   "location": "body"
 *                 }
 *               ]
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No autorizado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Ocurrió un error al calcular el promedio
 */
router.post('/calculate', authMiddleware, validateGrades, calculateAverage);

module.exports = router;
