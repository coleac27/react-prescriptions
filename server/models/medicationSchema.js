const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Schema or Document Structure
const medicationSchema = new mongoose.Schema({
    medicationName: {
        type: String,
        required: true,
        unique: true
    },
    dosage: {
        type: String,
        required: true,
        unique: true
    },
    timeOfDay: {
        type: String,
        required: true
    },
    pharmacy: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

// Generate Tokens to Verify User
medicationSchema.methods.generateAuthToken = async function() {
    try {
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

// Create Model
const Medication = mongoose.model("MEDICATION", medicationSchema);

module.exports = Medication;


