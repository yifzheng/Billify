import { connectToDB } from "@utils/database";
import Receipt from "@models/receipt";

// DELETE
export const DELETE = async (req, { params }) => {
	try {
		await connectToDB();
		await Receipt.findByIdAndRemove(params.id);

		return new Response("Successfully delete receipt", { status: 200 });
	} catch (error) {
		return new Response("Failed to delete receipt", { status: 500 });
	}
};
