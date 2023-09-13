import { connectToDB } from "@utils/database";
import Receipt from "@models/receipt";

// GET
export const GET = async (req, { params }) => {
	try {
		await connectToDB(); // connect to database
		const retrievedReceipt = await Receipt.findById(params.id).populate(
			"creator"
		);
		console.log(retrievedReceipt.creator._id.toString() !== params.userId);
		if (retrievedReceipt.creator._id.toString() !== params.userId) {
			return new Response("Unauthorized to delete this receipt", {
				status: 401,
			});
		}

		return new Response(JSON.stringify(retrievedReceipt), { status: 200 });
	} catch (error) {
		return new Response("Failed to get receipt", { status: 500 });
	}
};

// PATCH
export const PATCH = async (req, { params }) => {
	const { resturantName, items, tax, tip, total, contribution, userId } =
		await req.json();
	try {
		await connectToDB(); // connect to database
		const existingReceipt = await Receipt.findById(params.id).populate(
			"creator"
		);
		// if not found return not found error
		if (!existingReceipt) {
			return new Response("Receipt not found", { status: 404 });
		}
		// Check if the userId from the route path matches the creator's ID
		if (existingReceipt.creator.toString() !== userId) {
			return new Response("Unauthorized to delete this receipt", {
				status: 401,
			});
		}
		// update fields
		// Use the .updateOne() method to update the existing receipt
		const updatedReceipt = await Receipt.updateOne(
			{ _id: params.id }, // Match the receipt by its ID
			{
				$set: {
					resturantName, // Update the resturantName
					items, // Update the items
					tax, // Update the tax
					tip, // Update the tip
					total, // Update the total
					contribution, // Update the contribution
					userId, // Update the userId
				},
			}
		);

		// Check if the receipt was found and updated
		if (updatedReceipt.nModified === 0) {
			return new Response("Receipt not found or not modified", { status: 404 });
		}

		// Return the updated receipt and status 200
		return new Response(JSON.stringify(updatedReceipt), { status: 200 });
	} catch (error) {
		return new Response("Failed to update receipt", { status: 500 });
	}
};

// DELETE
export const DELETE = async (req, { params }) => {
	const { userId, id } = params;
	try {
		await connectToDB(); // connect to database
		const existingReceipt = await Receipt.findById(id); // find receipt by ID

		// If the receipt doesn't exist, return a 404 response
		if (!existingReceipt) {
			return new Response("Receipt not found", { status: 404 });
		}
		// Check if the userId from the route path matches the creator's ID
		if (existingReceipt.creator.toString() !== userId) {
			return new Response("Unauthorized to delete this receipt", {
				status: 401,
			});
		}

		// Delete the receipt if the userId matches the creator's ID
		await Receipt.findByIdAndRemove(id);

		return new Response("Successfully delete receipt", { status: 200 });
	} catch (error) {
		return new Response("Failed to delete receipt", { status: 500 });
	}
};
