import { Schema, model, models } from "mongoose";

const ReceiptSchema = new Schema({
	resturantName: {
		type: String,
		required: true,
	},
	items: [
		{
			name: {
				type: String,
				required: true,
			},
			amount: {
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
	total: {
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
			contribution: {
				tpye: Number,
				required: true,
			},
		},
	],
});

const Receipt = models.Receipt || model("Receipt", ReceiptSchema);

export default Receipt;
