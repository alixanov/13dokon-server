const mongoose = require("mongoose");

const connectDB = async () => {
     try {
          const conn = await mongoose.connect(process.env.MONGO_URI, {
               useUnifiedTopology: true, // Рекомендуется для обработки подключений
          });
          console.log(`MongoDB connected: ${conn.connection.host}`);
     } catch (error) {
          console.error(`Error: ${error.message}`);
          process.exit(1); // Завершаем процесс, если подключение не удалось
     }
};

module.exports = connectDB;
