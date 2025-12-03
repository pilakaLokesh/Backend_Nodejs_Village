const Admin = require("../models/Admin");   // MUST RETURN MODEL
const bcrypt = require("bcryptjs");

async function createDefaultAdmin() {
    try {
        console.log("Admin loaded:", typeof Admin);  // SHOULD PRINT 'function'

        const adminEmail = "admin@gmail.com";
        const adminPassword = "Admin123";

        const exists = await Admin.findOne({ email: adminEmail });

        if (!exists) {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);

            await Admin.create({
                email: adminEmail,
                password: hashedPassword
            });

            console.log("✔ Default Admin Created");
        } else {
            console.log("✔ Admin Already Exists");
        }
    } catch (error) {
        console.error("Admin Creation Error:", error);
    }
}

module.exports = createDefaultAdmin;
