import { connectToDB } from "@utils/database";
import Receipt from "@models/receipt";

export const GET = async (req, { params }) => {
	const url = new URL(req.url, "http://localhost"); // Replace "http://localhost" with your actual base URL
	const userId = url.searchParams.get("userId");

	try {
		await connectToDB(); // connect to db
		// find all receipts where the creator equals the param id and populate the creator field
		const receipts = await Receipt.find({ creator: params.id }).populate(
			"creator"
		);
		if (userId !== params.id) {
			return new Response("Unauthorized to delete this receipt", {
				status: 401,
			});
		}

		// return new object back
		return new Response(JSON.stringify(receipts), { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch all user's receipts", { status: 500 });
	}
};
