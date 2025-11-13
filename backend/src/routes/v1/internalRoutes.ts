import { Router } from 'express';

const router = Router();

// This is a placeholder for internal routes that require authentication.
// All routes here will be prefixed with /api/v1/internal

router.get('/', (_req, res) => {
  res.json({ message: 'Internal API endpoint' });
});

// MARK: - Feature Routes Placeholder
// Add new internal feature routes here
// Example: import taskRoutes from './taskRoutes';
// router.use('/tasks', taskRoutes);

export default router;
