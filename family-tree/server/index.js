// server/index.js
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 3001; // не 5173, чтобы не мешать Vite

// Разрешаем CORS для клиента
app.use(cors());
app.use(express.json());

// Подключение к базе PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "family-tree",
  password: "postgres",
  port: 5432,
});

// Тестовый маршрут
app.get("/", (req, res) => {
  res.send("Сервер работает!");
});

// Добавить персонажа
app.post("/personalities", async (req, res) => {
  const { name, surname, sex } = req.body;

  if (!name || !surname || !sex) {
    return res.status(400).send("Не хватает данных");
  }

  try {
    await pool.query(
      "INSERT INTO human (name, surname, sex) VALUES ($1, $2, $3)",
      [name, surname, sex]
    );
    res.status(201).send("Персонаж добавлен!");
  } catch (err) {
    console.error("Ошибка при добавлении персонажа:", err);
    res.status(500).send("Ошибка сервера");
  }
});

// Получить всех персонажей
app.get('/personalities', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM human ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка при получении персонажей:', err);
    res.status(500).send('Ошибка сервера');
  }
});


// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер работает на http://localhost:${port}`);
});
