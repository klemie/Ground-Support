import express from "express";
import controller from "../controllers/Generic";
import { RocketSim } from "../models/RocketSimModel";

const router = express.Router();

router.get("/", controller.getAll(RocketSim));
router.get("/:id", controller.get(RocketSim));
router.post("/", controller.create(RocketSim));
router.patch("/:id", controller.update(RocketSim));
router.delete("/:id", controller.deleteOne(RocketSim));

export default router;