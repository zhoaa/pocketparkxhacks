import express from 'express';
import { getPark, createPark } from '../controllers/parks.js';


const router = express.Router();

// router.get('/', getPosts);
router.post('/', createPark);
router.get('/:id', getPark);
// router.patch('/:id', updatePost);
// router.delete('/:id', deletePost);
// router.patch('/:id/likePost', likePost);

export default router;
