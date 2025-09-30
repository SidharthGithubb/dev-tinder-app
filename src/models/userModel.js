const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 4,
        maxlength: 30,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        minlength: 4,
        maxlength: 30,
    },
    emailId: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, "Email ID is required"],
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 15,
        required: [true, "Password is required"]
    },
    age: {
        type: Number,
        maxlength:3
    },
    gender: {
        type: String,
        // This method will validate the condition only when a new record/object is created.
        validate(value){
            if(!["male", "female", "other"].includes(value.toLowerCase())){
                throw new Error("Gender data is not valid");
            }
        }
    },
    bio: {
        type: String,
        default: "",
        maxlength: 250
    },
    skill: {
        type: String,
        enum: ["JavaScript", "Python", "Java", "C++", "Ruby", "Go", "PHP", "C#", "TypeScript", "Swift", "Kotlin", "Rust", "Dart", "Scala", "Perl", "Haskell", "Lua", "Elixir", "Clojure", "Erlang"],
        default: "JavaScript"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);