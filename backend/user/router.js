import express from "express";
import md5 from "md5";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";
import { append } from "vary";
const router = express.Router();

function generateToken(id) {
	const secret = process.env.TOKEN_SECRET;
	return jwt.sign(
		{
			id,
		},
		secret,
		{ expiresIn: "14d" },
	);
}

router.get("/account", async (req, res) => {
	try {
		const jwtTokenUser = req.header("Authorization").split(" ")[1];
		const decoded = jwt.verify(jwtTokenUser, process.env.TOKEN_SECRET);
		const getUser = await prisma.user.findUnique({
			where: {
				id: decoded.id,
			},
		});
		const { id, email, name, orders } = getUser;
		console.log(orders);
		const clientResponse = {
			id,
			email,
			name,
			orders,
		};
		res.send(clientResponse);
	} catch (error) {
		res
			.status(401)
			.send("access denied: you try to log in with incorrect data");
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const errorMessage = "this user is not exists or password is invalid";

	const getUser = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});
	if (!getUser) {
		res.status(404).send(errorMessage);
		return;
	}

	const passwordHash = md5(password);
	const passwordsAreSimilar = passwordHash === getUser.password;
	if (!passwordsAreSimilar) {
		res.status(404).send(errorMessage);
		return;
	}
	res.send(generateToken(getUser.id));
});

router.post("/register", async function (req, res) {
	const { email, password, name } = req.body;

	// console.log(req.body);

	if (!email || !password) {
		res.send("You should explicitly point password and valid email ");
		return;
	}

	const passwordHash = md5(password);

	const result = await prisma.user
		.create({
			data: {
				email,
				name,
				password: passwordHash,
			},
		})
		.catch((e) => {
			console.log(e);
		});

	if (!result) {
		res.status(400).send("OSHIBKA");
		return;
	}

	console.log(result);
	const token = generateToken(result.id);

	res.send(token);
});

router.post("/addorder", async (req, res) => {
	const { items } = req.body;

	if (!items) {
		res.sendStatus(400);
		return;
	}

	const jwtTokenUser = req.header("Authorization").split(" ")[1];
	if (!jwtTokenUser) {
		res.status(401);
		return;
	}

	const decoded = jwt.verify(jwtTokenUser, process.env.TOKEN_SECRET);
	console.log(`USER INFO: ${JSON.stringify(decoded)}`);

	const order = await prisma.order.create({
		data: {
			items: JSON.stringify(items),
			userId: decoded.id,
		},
	});

	// console.log(order);

	res.sendStatus(200);
});

router.get("/ordersuccess", async (req, res) => {
	let decoded;
	const { orderId } = req.query;

	if (!orderId) {
		res.sendStatus(400);
		return;
	}

	try {
		decoded = jwt.verify(
			req.header("Authorization").split(" ")[1],
			process.env.TOKEN_SECRET,
		);
	} catch (error) {
		console.log(error);
		res.sendStatus(401);
		return;
	}

	const order = await prisma.order.findUnique({
		where: {
			id: parseInt(orderId),
		},
	});

	if (!order) {
		res.sendStatus(400);
		return;
	}

	const items = JSON.parse(order.items);

	const itemsData = await prisma.product.findMany({
		where: {
			id: {
				in: items,
			},
		},
	});

	res.send({ data: itemsData });
});

export default router;
