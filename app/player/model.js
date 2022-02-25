const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const HAST_HOUND = 10;

let playerSchema = mongoose.Schema(
	{
		email: {
			type: String,
			require: [true, "email harus diisi"],
		},
		name: {
			type: String,
			require: [true, "Nama harus diisi"],
			maxlength: [225, "panjang nama harus antara 3 - 225 karakter"],
			minlength: [3, "panjang nama harus antara 3 - 225 karakter"],
		},
		username: {
			type: String,
			require: [true, "Username harus diisi"],
			maxlength: [225, "panjang nama harus antara 3 - 225 karakter"],
			minlength: [3, "panjang nama harus antara 3 - 225 karakter"],
		},
		password: {
			type: String,
			require: [true, "Kata sandi harus diisi"],
			maxlength: [255, "panjang password maksimal 255 karakter"],
		},
		role: {
			type: String,
			enum: ["admin", "user"],
			defaul: "user",
		},
		status: {
			type: String,
			enum: ["Y", "N"],
			default: "Y",
		},
		avatar: {
			type: String,
		},
		filename: {
			type: String,
		},
		phoneNumber: {
			type: String,
			require: [true, "Nomor telepon harus di isi"],
			maxlength: [13, "panjang nomor telepon harus antara 9 - 13 karakter"],
			minlength: [9, "panjang nomor telepon harus antara 9 - 13 karakter"],
		},
		favorite: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Player",
		},
	},
	{ timestamps: true }
);

playerSchema.path("email").validate(
	async function (value) {
		try {
			const count = await this.model("Player").countDocuments({ email: value });
			return !count;
		} catch (err) {
			throw err;
		}
	},
	(attr) => `${attr.value} sudah terdaftar`
);

playerSchema.pre("save", function (next) {
	this.password = bcrypt.hashSync(this.password, HAST_HOUND);
	next();
});

module.exports = mongoose.model("Player", playerSchema);
