import { connectToDB } from "@utils/database";
import Receipt from "@models/receipt";

export const GET = async (req, { params }) => {
	try {
		await connectToDB(); // connect to db
		// find all receipts where the creator equals the param id and populate the creator field
		const receipts = await Receipt.find({ creator: params.id }).populate(
			"creator"
		);
		// return new object back
		return new Response(JSON.stringify(receipts), { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch all user's receipts", { status: 500 });
	}
};
