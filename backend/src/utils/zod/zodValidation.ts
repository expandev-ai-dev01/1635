import { z } from 'zod';

// Common validation for titles (e.g., tasks, categories)
export const zTitle = z
  .string({
    required_error: 'Title is required.',
  })
  .trim()
  .min(3, { message: 'Title must be at least 3 characters long.' })
  .max(100, { message: 'Title must be no more than 100 characters long.' });

// Common validation for descriptions
export const zDescription = z
  .string({
    required_error: 'Description is required.',
  })
  .trim()
  .min(1, { message: 'Description cannot be empty.' })
  .max(500, { message: 'Description must be no more than 500 characters long.' });
