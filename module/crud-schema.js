const { Schema, model } = require("mongoose");

const InstrumentSchema = new Schema({
     rasm: {
          type: String,
          required: true,
     },
     nomi: {
          type: String,
          required: true,
     },
     malumoti: {
          type: String, // Измените на Number
          required: true,
     },
     turi: {
          type: String, // Измените на Number
          required: true,
     },
     soni: {
          type: Number, // Измените на Number
          required: true,
     },

     narxi: {
          type: Number, // Измените на Number
          required: true,
     },

});

module.exports = model("InstrumentSchema", InstrumentSchema); // Убедитесь, что нет пробела в названии модели
