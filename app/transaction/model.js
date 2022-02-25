const mongoose = require("mongoose");

let transactionSchema = mongoose.Schema(
	{
		historyVoucherTopup: {
			gameName: { type: String, require: [true, "nama game harus disi"] },
			category: { type: String, require: [true, "kategori harus disi"] },
			thumbnail: { type: String },
			coinName: { type: String, require: [true, "nama koin harus disi"] },
			coinQuantity: { type: String, require: [true, "jumlah koin harus disi"] },
			price: { type: Number },
		},
		historyPayment: {
			name: { type: String, require: [true, "nama harus disi"] },
			type: { type: String, require: [true, "tipe pembayaran harus disi"] },
			bankName: { type: String, require: [true, "nama bank harus disi"] },
			noRekening: {
				type: String,
				require: [true, "nomor rekening harus disi"],
			},
		},
		name: {
			type: String,
			require: [true, "Nama harus diisi"],
			maxlength: [255, "panjang nama harus antara 3 - 255 karakter"],
			minlength: [3, "panjang nama harus antara 3 - 255 karakter"],
		},
		accountUser: {
			type: String,
			require: [true, "Nama akun harus diisi"],
			maxlength: [255, "panjang nama akun harus antara 3 - 255 karakter"],
			minlength: [3, "panjang nama akun harus antara 3 - 255 karakter"],
		},
		tax: {
			type: Number,
			default: 0,
		},
		value: {
			type: Number,
			defaul: 0,
		},
		status: {
			type: String,
			enum: ["pending", "success", "failed"],
			default: "pending",
		},
		player: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Player",
		},
		historyUser: {
			name: { type: String, require: [true, "nama player harus disi"] },
			phoneNumber: {
				type: Number,
				require: [true, "Nama akun harus diisi"],
				maxlength: [13, "panjang nama akun harus antara 9 - 13 karakter"],
				minlength: [9, "panjang nama akun harus antara 9 - 13 karakter"],
			},
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Transaction", transactionSchema);
