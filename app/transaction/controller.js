const Transaction = require("./model");

module.exports = {
	index: async (req, res) => {
		try {
			const alertMessage = req.flash("alertMessage");
			const alertStatus = req.flash("alertStatus");
			const alert = { message: alertMessage, status: alertStatus };

			const transaction = await Transaction.find()
				.populate("player")
				.populate("user");

			res.render("admin/transaction/view_transaction", {
				alert,
				transaction,
				name: req.session.user.name,
				title: "Halaman Transaksi",
			});
		} catch (err) {
			req.flash("alertMessage", `${err.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/transaction");
		}
	},
	actionStatus: async (req, res) => {
		try {
			const { id } = req.params;
			const { status } = req.query;

			await Transaction.findByIdAndUpdate({ _id: id }, { status });

			req.flash("alertMessage", "Berhasil ubah status");
			req.flash("alertStatus", "success");
			res.redirect("/transaction");
		} catch (err) {
			req.flash("alertMessage", `${err.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/transaction");
		}
	},
	actionDelete: async (req, res) => {
		try {
			try {
				const { id } = req.params;

				await Transaction.findOneAndRemove({ _id: id });

				req.flash("alertMessage", "Berhasil delete transaction");
				req.flash("alertStatus", "success");
				res.redirect("/transaction");
			} catch (err) {
				req.flash("alertMessage", `${err.message}`);
				req.flash("alertStatus", "danger");
				res.redirect("/voucher");
			}
		} catch (err) {
			req.flash("alertMessage", `${err.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/transaction");
		}
	},
};
