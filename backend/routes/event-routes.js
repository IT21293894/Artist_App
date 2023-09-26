import express from "express";
import {
  add,
  deleteEvent,
  getAllEvent,
  getById,
  getByUserId,
  updateEvent,
} from "../controllers/event-controller";

const router = express.Router();

router.get("/", getAllEvent);
router.post("/add", add);
router.put("/update/:id", updateEvent);
router.get("/:id", getById);
router.delete("/:id", deleteEvent);
router.get("/user/:id", getByUserId);

export default router;
