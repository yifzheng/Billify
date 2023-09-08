import { Schema, model, models } from "mongoose";

const ReceiptSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
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
			quantity: {
				type: Number,
				required: true,
				default: 1,
			},
			members: [
				{
					name: {
						type: String,
						required: true,
					},
				},
			],
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
	contribution: [
		{
			member: {
				type: String,
				required: true,
			},
			price: {
				tpye: Number,
				required: true,
			},
		},
	],
});

const Receipt = models.Receipt || model("Receipt", ReceiptSchema);

export default Receipt;
