const mongoose = require("mongoose");

let categorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			require: [true, "Nama kategori harus di isi"],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
