import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
	email: {
		type: String,
		unique: [true, "Email already exits"],
		required: [true, "Email is required"],
	},
	username: {
		type: String,
		required: true,
	},
	image: {
		type: String, 
		default: ''
	}
});

const User = models.User || model("User", UserSchema);

export default User;
