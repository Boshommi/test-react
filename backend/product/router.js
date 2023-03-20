import express from "express";
import prisma from "../prismaClient.js";
import fs from "fs";

const router = express.Router();

// Home page route.
router.get("/get", async function (req, res) {
	try {
		const result = await prisma.product.findMany();
		res.json(result);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

router.get("/get/:id", async (req, res) => {
	try {
		const result = await prisma.product.findUnique({
			where: {
				id: parseInt(req.params.id),
			},
		});
		res.json(result);
	} catch (error) {
		console.log(error);
		res.sendStatus(404);
	}
});

export default router;
