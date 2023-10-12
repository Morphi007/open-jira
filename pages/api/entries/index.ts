import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

type Data = { message: string } | IEntry[] | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'GET':
			return getEntries(res);
		case 'POST':
			return postEntries(req, res);
		case "PUT":
			return postEntries(req, res);
		default:
			return res.status(400).json({ message: 'Endpoin no existe' });
	}
}

const getEntries = async (res: NextApiResponse<Data>) => {
	await db.connect();
	const entries = await Entry.find().sort({ createdAt: 'ascending' });
	await db.disconnect();

	res.status(200).json(entries);
};

const postEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { description = '' } = req.body;

	const newEntry = new Entry({
		description,
		createdAt: Date.now(),
	});

	try {
		await db.connect();
		await newEntry.save();
		await db.disconnect();

		return res.status(201).json(newEntry);
	} catch (error) {
		await db.disconnect();
		console.error(error);
		res.status(500).json({message:"Algo salo mal, revisar la consola en el servidor"})
	}

	//console.log(req.body);
	res.status(201).json({ message: 'POST' });
};
