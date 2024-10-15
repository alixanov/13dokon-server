const { Router } = require("express");
const router = Router();
const { addProduct, getAllProduct, deleteProduct, updateProduct, getOneProduct, registerUser, loginUser, } = require("../controllers/crud.control");

// Маршруты для CRUD операций
router.post('/add',addProduct); // Убираем дублирование маршрута
router.get("/getall", getAllProduct);
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);
router.get("/getone/:id", getOneProduct);
// Определяем маршруты для регистрации и входа
router.post('/register', registerUser);  // Обрабатываем POST запрос на регистрацию
router.post('/login', loginUser);        // Обрабатываем POST запрос на вход


module.exports = router;
