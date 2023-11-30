const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        Type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        Type: String,
        required: [true, "Last name is required"]
    },
    avater: {
        Type: String
    },
    email: {
        Type: String,
        required: [true, "Email is required"],
        validate: {
            validate: {
                function (email) {
                    
                }
            }
        }
    }
})