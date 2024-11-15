const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        tags: {
            type: [String],
            required: true
        },
        type: {
            type: String,
            default:""
        },
        company:{
            type: String,
            default:""
        },
        dealer:{
            type:String,
            default:""
        },
        images: {
            type: [String],
        }
    }
);

module.exports = mongoose.model("car", carSchema);