import { Router } from 'express'
import { createProperty, deleteProperty, filtersProperty, getOneProperty, getProperty, updateProperty } from '../controllers/property.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router=Router();

router.post("/",authMiddleware,createProperty)
router.get("/",getProperty)
router.get("/filter",filtersProperty);
router.get("/:propertyId",getOneProperty)
router.put("/:id",authMiddleware,updateProperty)
router.delete("/:id",authMiddleware,deleteProperty)
export default router;