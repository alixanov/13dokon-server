const InstrumentSchema = require('../module/crud-schema')
const User = require('../module/user-schema'); // Модель пользователя
const Cart = require('../module/cart'); // Модель корзины
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const addProduct = async (req, res) => {
     try {
          // const { rasm, nomi, soni, narxi } = req.body
          const newProduct = await new InstrumentSchema(req.body)
          await newProduct.save();
          res.status(201).json(newProduct)
     } catch (error) {
          res.status(500).json({ message: "Ошибка при добавлении продукта", error })
     }
}

const getAllProduct = async (req, res) => {
     try {
          const products = await InstrumentSchema.find()
          res.status(200).json(products)
     } catch (error) {
          res.status(500).json({ message: "Ошибка при получении продуктов", error })
     }
}


const deleteProduct = async (req, res) => {
     try {
          const { id } = req.params;
          const deletedProduct = await InstrumentSchema.findByIdAndDelete(id);
          if (!deletedProduct) {
               return res.status(404).json({ message: "Продукт не найден" });
          }
          res.status(200).json({ message: "Продукт успешно удален" });
     } catch (error) {
          res.status(500).json({ message: "Ошибка при удалении продукта", error });
     }
};

const updateProduct = async (req, res) => {
     try {
          const { id } = req.params;
          const { rasm, nomi, malumoti, turi, soni, narxi,ton } = req.body;

          const updatedProduct = await InstrumentSchema.findByIdAndUpdate(
               id,
               { rasm, nomi, malumoti, turi, soni, narxi ,ton},
               { new: true } // Вернуть обновленный документ
          );

          if (!updatedProduct) {
               return res.status(404).json({ message: "Продукт не найден" });
          }

          res.status(200).json(updatedProduct);
     } catch (error) {
          res.status(500).json({ message: "Ошибка при обновлении продукта", error });
     }
};

// Получение одного продукта по ID
const getOneProduct = async (req, res) => {
     try {
          console.log(req.params.id); // Выводим ID для проверки
          const product = await InstrumentSchema.findById(req.params.id);
          if (!product) {
               return res.status(404).json({ message: "Продукт не найден" });
          }
          res.status(200).json(product);
     } catch (error) {
          res.status(500).json({ message: "Ошибка при получении продукта", error });
     }
};




//login-regitser-cabinet

// Регистрация пользователя
const registerUser = async (req, res) => {
     try {
          const { login, password } = req.body;

          const existingUser = await User.findOne({ login });
          if (existingUser) {
               return res.status(400).json({ message: "Этот логин уже используется." });
          }

          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new User({ login, password: hashedPassword });
          await newUser.save();

          res.status(201).json({ message: "Пользователь зарегистрирован" });
     } catch (error) {
          res.status(500).json({ message: "Ошибка при регистрации", error });
     }
};

// Авторизация пользователя
const loginUser = async () => {
     if (!login || !password) {
          notifyError('Пожалуйста, заполните все поля.');
          return;
     }

     const data = { login, password };

     try {
          const res = await axios.post("http://localhost:8080/api/users/login", data, {
               headers: {
                    'Content-Type': 'application/json',
               }
          });

          // Сохраняем токен и логин
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userLogin", login); // Сохраняем логин пользователя

          // Показываем уведомление перед навигацией
          notifySuccess("Вы успешно вошли в систему!");

          // Переход в кабинет пользователя
          navigate('/cabinet');
          window.location.reload();
     } catch (error) {
          console.error("Ошибка:", error.response?.data || error.message);

          if (error.response?.status === 400) {
               notifyError('Неверный логин или пароль.');
          } else {
               notifyError('Произошла ошибка на сервере.');
          }
     }
};

const addToCart = async (req, res) => {
     const { userId, productId, quantity } = req.body;

     try {
          let cart = await Cart.findOne({ userId });

          if (cart) {
               // Если корзина существует, обновляем её
               const itemIndex = cart.items.findIndex(p => p.productId === productId);

               if (itemIndex > -1) {
                    // Если товар уже есть, увеличиваем количество
                    let productItem = cart.items[itemIndex];
                    productItem.quantity += quantity;
                    cart.items[itemIndex] = productItem;
               } else {
                    // Если товара нет в корзине, добавляем новый
                    cart.items.push({ productId, quantity });
               }
               await cart.save();
               res.status(200).json({ message: "Товар добавлен в корзину" });
          } else {
               // Если корзины нет, создаем новую
               const newCart = new Cart({
                    userId,
                    items: [{ productId, quantity }]
               });
               await newCart.save();
               res.status(201).json({ message: "Корзина создана и товар добавлен" });
          }
     } catch (error) {
          res.status(500).json({ message: "Ошибка при добавлении товара в корзину", error });
     }
};



module.exports = { addProduct, getAllProduct, deleteProduct, updateProduct, getOneProduct, registerUser, loginUser, addToCart }