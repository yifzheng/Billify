import { connectToDB } from "@utils/database";
import Receipt from "@models/receipt";

export const POST = async (req, res) => {
	// deconstruct the data from reqest body
	const { resturantName, items, tax, tip, total, contribution, userId } =
		await req.json();

	try {
		await connectToDB(); // connect to db
		// create a new receipt
		const newReceipt = new Receipt({
			resturantName,
			items,
			tax,
			tip,
			total,
			creator: userId,
			contribution,
		});
		await newReceipt.save(); // attempt to save prompt

		return new Response(JSON.stringify(newReceipt), { status: 201 });
	} catch (error) {
		console.error("Error creating receipt:", error);
		return new Response("Failed to create new receipt", { status: 500 });
	}
};
