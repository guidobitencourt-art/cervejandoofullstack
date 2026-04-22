import { Router } from 'express'
import { loginController, registerController, meController } from '../controllers/authController'
import { authMiddleware } from '../middleware/auth'

const router = Router()

router.post('/login', loginController)
router.post('/register', registerController)
router.get('/me', authMiddleware, meController)

export default router
