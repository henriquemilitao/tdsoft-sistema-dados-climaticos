import SubscriptionService from "../services/SubscriptionService"
import * as Yup from 'yup'
class SubscriptionController {

    /**
     * @swagger
     * /subscriptions:
     *   post:
     *     summary: Registra um email para receber boletins informativos.
     *     description: Registra um email para receber boletins informativos sobre o tempo.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *                 description: Email do usuário.
     *               frequency:
     *                 type: string
     *                 enum: [weekly, biweekly, monthly, semiannually]
     *                 description: Frequência dos boletins informativos.
     *     responses:
     *       201:
     *         description: Assinatura criada com sucesso.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Subscription'
     *       400:
     *         description: Requisição inválida. Verifique os dados fornecidos.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Requisição inválida. Verifique os dados fornecidos."
     */
    async store(request, response) {

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            frequency: Yup.string().oneOf(['weekly', 'biweekly', 'monthly', 'semiannually']).required(),
        })

        try {
            await schema.validateSync(request.body, { abortEarly: false });
          } catch (err) {
            return response.status(400).json({ error: err.errors });
          }

        const { email, frequency } = request.body

        try {
            const subscription = await SubscriptionService.store(email, frequency)
            return response.status(201).json(subscription)
        } catch (error) {
            return response.status(400).json({ error: error.message })
        }
    }


    /**
     * @swagger
     * /subscriptions/{email}:
     *   delete:
     *     summary: Cancela uma assinatura de boletim informativo.
     *     description: Cancela uma assinatura de boletim informativo pelo email.
     *     parameters:
     *       - in: path
     *         name: email
     *         required: true
     *         schema:
     *           type: string
     *           format: email
     *         description: Email do usuário.
     *         example: user@example.com
     *     responses:
     *       200:
     *         description: Usuário descadastrado com sucesso.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Usuário descadastrado com sucesso."
     *       400:
     *         description: Requisição inválida. O e-mail fornecido pode estar incorreto.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Requisição inválida. O e-mail fornecido está incorreto."
      */
    async delete(request, response) {

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
          });
      
          try {
            await schema.validateSync(request.params, { abortEarly: false });
          } catch (err) {
            return response.status(400).json({ error: err.errors });
          }

        const { email } = request.params

        try {
            const result = await SubscriptionService.delete(email)
            return response.status(200).json(result)
        } catch (error) {
            return response.status(400).json({ error: error.message })
        }
    }


    /**
     * @swagger
     * /subscriptions:
     *   get:
     *     summary: Lista todas as assinaturas de boletins informativos.
     *     description: Retorna uma lista de todas as assinaturas de boletins informativos registradas no sistema.
     *     responses:
     *       200:
     *         description: Requisição bem-sucedida. Retorna uma lista de todas as assinaturas de boletins informativos.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 subscriptions:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/Subscription'
     *       400:
     *         description: Requisição inválida.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Requisição inválida."
     */
    async index(request, response) {
        try {
            const subscriptions = await SubscriptionService.index()
            return response.status(200).json(subscriptions)
        } catch (error) {
            return response.status(500).json({ error: error.message })
        }
    }
}

export default new SubscriptionController()
