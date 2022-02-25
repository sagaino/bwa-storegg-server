const User = require("./model");
const bcrypt = require("bcryptjs");

module.exports = {
	viewSignin: async (req, res) => {
		try {
			const alertMessage = req.flash("alertMessage");
			const alertStatus = req.flash("alertStatus");

			const alert = { message: alertMessage, status: alertStatus };
			if (req.session.user === null || req.session.user === undefined) {
				res.render("admin/users/view_signin", {
					alert,
					title: "Halaman Signin",
				});
			} else {
				res.redirect("/dashboard");
			}
		} catch (err) {
			req.flash("alertMessage", `${err.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/");
		}
	},
	actionSignin: async (req, res) => {
		try {
			const { email, password } = req.body;

			const check = await User.findOne({ email: email });

			if (check) {
				if (check.status === "Y") {
					const checkPassword = await bcrypt.compare(password, check.password);
					if (checkPassword) {
						req.session.user = {
							id: check._id,
							email: check.email,
							status: check.status,
							name: check.name,
						};
						res.redirect("/dashboard");
					} else {
						req.flash("alertMessage", "Mohon maaf password anda salah");
						req.flash("alertStatus", "danger");
						res.redirect("/");
					}
				} else {
					req.flash("alertMessage", "Mohon maaf status anda belum aktif");
					req.flash("alertStatus", "danger");
					res.redirect("/");
				}
			} else {
				req.flash("alertMessage", "Email yang anda input salah");
				req.flash("alertStatus", "danger");
				res.redirect("/");
			}
		} catch (err) {
			req.flash("alertMessage", `${err.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/");
		}
	},
	actionLogout: async (req, res) => {
		req.session.destroy();
		res.redirect("/");
	},
	viewSignup: async (req, res) => {
		try {
			const alertMessage = req.flash("alertMessage");
			const alertStatus = req.flash("alertStatus");

			const alert = { message: alertMessage, status: alertStatus };
			res.render("admin/users/view_signup", {
				alert,
				title: "Halaman SignUp",
			});
		} catch (err) {
			req.flash("alertMessage", `${err.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/signup");
		}
	},
	actionSignup: async (req, res) => {
		try {
			const { name, email, password, phoneNumber } = req.body;
			let user = await User({ name, email, password, phoneNumber });

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(user.password, salt);
			const check = await User.findOne({ email: email });
			if (check) {
				if (email === check.email) {
					req.flash("alertMessage", `${email} sudah terdaftar`);
					req.flash("alertStatus", "danger");
					res.redirect("/signup");
				}
			} else {
				await user.save();
				req.flash("alertMessage", "Berhasil tambah user");
				req.flash("alertStatus", "success");
				res.redirect("/");
			}
		} catch (err) {
			req.flash("alertMessage", `${err.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/signup");
		}
	},
};
