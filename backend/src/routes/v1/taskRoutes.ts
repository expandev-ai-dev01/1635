import { Router } from 'express';
import * as taskController from '@/api/v1/internal/task/controller';

const router = Router();

// Route for creating a new task
router.post('/', taskController.postHandler);

// Other task-related routes (GET, PUT, DELETE) will be added here in other features.

export default router;
