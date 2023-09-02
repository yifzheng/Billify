import { Schema, model, models } from "mongoose";

const ReceiptSchema = new Schema({
	items: [
		{
			name: {
				type: String,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
			owner: {
				type: String,
			},
		},
	],
	tax: {
		type: Number,
		required: true,
	},
	tip: {
		type: Number,
		required: true,
	},
	totalAmount: {
		type: Number,
		required: true,
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

const Receipt = models.Receipt || model("Receipt", ReceiptSchema);

export default Receipt;
