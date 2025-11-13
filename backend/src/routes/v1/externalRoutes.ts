import { Router } from 'express';
import * as healthController from '@/api/v1/external/public/health/controller';

const router = Router();

// This is a sample route. Feature-specific routes should be added here.
router.get('/public/health', healthController.getHealthStatus);

// MARK: - Feature Routes Placeholder
// Add new external feature routes here
// Example: import authRoutes from './authRoutes';
// router.use('/security', authRoutes);

export default router;
