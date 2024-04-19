import pool from "./pool.js";
import bcrypt from "bcrypt";
import { generateJwtToken, verifyJwtToken } from "./helpers.js";

class Controller {
  async signIn(req, res) {
    const { username, password } = req.body;
    const user = await pool.query(
      `SELECT * FROM Users WHERE username = $1 LIMIT 1`,
      [username]
    );

    if (user.rows.length !== 1) {
      res.status(400).json({
        status: false,
        message: "Пользователя с таким ником не существует",
      });
      return;
    }
    const validPassword = bcrypt.compareSync(password, user.rows[0].password);

    if (!validPassword) {
      res.status(400).json({
        status: false,
        message: "Пароли не совпадают",
      });
      return;
    }

    const token = generateJwtToken(username);
    res.status(200).json({ status: true, token });
    return;
  }

  async signUp(req, res) {
    const { username, password } = req.body;
    const user = await pool.query(
      `SELECT * FROM Users WHERE username = $1 LIMIT 1`,
      [username]
    );

    if (user.rows.length !== 0) {
      res.status(400).json({
        status: false,
        message: "Пользователь с таким ником существует",
      });
      return;
    } else if (username.length < 4) {
      res.status(400).json({
        status: false,
        message: "Длина имени должна быть >= 4 символов",
      });
      return;
    } else if (password.length < 8) {
      res.status(400).json({
        status: false,
        message: "Длина пароля должна быть >= 8 символов",
      });
      return;
    } else {
      const token = generateJwtToken(username);
      const hashPassword = bcrypt.hashSync(password, 5);

      await pool.query(
        `INSERT INTO Users (username, password) VALUES ($1, $2) RETURNING *`,
        [username, hashPassword]
      );
      res.status(200).json({ status: true, token });
      return;
    }
  }

  async verifyToken(req, res) {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) return res.sendStatus(400);
    const isVerified = verifyJwtToken(token);
    if (isVerified) return res.sendStatus(200);
    return res.sendStatus(400);
  }

  async getCases(req, res) {
    const cases = await pool.query(`SELECT * FROM Cases`);
    let products = "";

    cases.rows.forEach((product) => {
      const productHTML = `
        <div class="products_item" id="Cases_${product.id}" price="${product.price}">
            <img src="${product.image_url}">
            <p class="products_item_title">${product.name}</p>
            <p class="products_item_text">Магазин: ${product.store_name}</p>
            <p class="products_item_text">Гарантия: ${product.warranty}</p>
            <p class="products_item_text">Вес: ${product.weight}</p>
            <p class="products_item_text">Материал: ${product.material}</p>
            <div class="products_item_wrap">
              <p class="products_item_price">${product.price} руб.</p>
              <a class="products_item_link" href="${product.product_url}" target="_blank">На сайт</a>
            </div>
        </div>`;
      products+=productHTML
    });
    res.json(products);
    return;
  }

  async getCasesJSON(req, res) {
    const cases = await pool.query(`SELECT * FROM Cases`);
    res.json(cases.rows);
    return;
  }

  async getGraphicsCards(req, res) {
    const graphicsCards = await pool.query(`SELECT * FROM GraphicsCards`);
    let products = "";

    graphicsCards.rows.forEach((product) => {
      const productHTML = `
        <div class="products_item" id="GraphicsCards_${product.id}" price="${product.price}">
            <img src="${product.image_url}">
            <p class="products_item_title">${product.name}</p>
            <p class="products_item_text">Магазин: ${product.store_name}</p>
            <p class="products_item_text">Гарантия: ${product.warranty}</p>
            <p class="products_item_text">Объём памяти: ${product.memory_size}</p>
            <p class="products_item_text">Тип памяти: ${product.memory_type}</p>
            <p class="products_item_text">GPU clock: ${product.gpu_clock}</p>
            <div class="products_item_wrap">
              <p class="products_item_price">${product.price} руб.</p>
              <a class="products_item_link" href="${product.product_url}" target="_blank">На сайт</a>
            </div>
        </div>`;
      products+=productHTML
    });
    res.json(products);
    return;
  }

  async getGraphicsCardsJSON(req, res) {
    const graphicsCards = await pool.query(`SELECT * FROM GraphicsCards`);
    res.json(graphicsCards.rows);
    return;
  }

  async getMemory(req, res) {
    const memory = await pool.query(`SELECT * FROM Memory`);
    let products = "";

    memory.rows.forEach((product) => {
      const productHTML = `
        <div class="products_item" id="Memory_${product.id}" price="${product.price}">
            <img src="${product.image_url}">
            <p class="products_item_title">${product.name}</p>
            <p class="products_item_text">Магазин: ${product.store_name}</p>
            <p class="products_item_text">Гарантия: ${product.warranty}</p>
            <p class="products_item_text">Страна производства: ${product.country_of_origin}</p>
            <p class="products_item_text">Ёмкость: ${product.module_capacity}</p>
            <p class="products_item_text">Общая ёмкость: ${product.total_capacity}</p>
            <p class="products_item_text">Частота памяти: ${product.memory_frequency}</p>
            <p class="products_item_text">Тип памяти: ${product.memory_type}</p>
            <p class="products_item_text">Объём памяти: ${product.modules_in_kit}</p>
            <div class="products_item_wrap">
              <p class="products_item_price">${product.price} руб.</p>
              <a class="products_item_link" href="${product.product_url}" target="_blank">На сайт</a>
            </div>
        </div>`;
      products+=productHTML
    });
    res.json(products);
    return;
  }

  async getMemoryJSON(req, res) {
    const memory = await pool.query(`SELECT * FROM Memory`);
    res.json(memory.rows);
    return;
  }

  async getMotherboards(req, res) {
    const motherboards = await pool.query(`SELECT * FROM Motherboards`);
    let products = "";

    motherboards.rows.forEach((product) => {
      const productHTML = `
        <div class="products_item" id="Motherboards_${product.id}" price="${product.price}">
            <img src="${product.image_url}">
            <p class="products_item_title">${product.name}</p>
            <p class="products_item_text">Магазин: ${product.store_name}</p>
            <p class="products_item_text">Разъём: ${product.socket}</p>
            <p class="products_item_text">Страна производства: ${product.country_of_origin}</p>
            <p class="products_item_text">Чипсет: ${product.chipset}</p>
            <p class="products_item_text">Тип памяти: ${product.memory_type}</p>
            <p class="products_item_text">Ячейки памяти: ${product.memory_slots}</p>
            <div class="products_item_wrap">
              <p class="products_item_price">${product.price} руб.</p>
              <a class="products_item_link" href="${product.product_url}" target="_blank">На сайт</a>
            </div>
        </div>`;
      products+=productHTML
    });
    res.json(products);
    return;
  }

  async getMotherboardsJSON(req, res) {
    const motherboards = await pool.query(`SELECT * FROM Motherboards`);
    res.json(motherboards.rows);
    return;
  }

  async getPowerSupplies(req, res) {
    const powerSupplies = await pool.query(`SELECT * FROM PowerSupplies`);
    let products = "";

    powerSupplies.rows.forEach((product) => {
      const productHTML = `
        <div class="products_item" id="PowerSupplies_${product.id}" price="${product.price}">
            <img src="${product.image_url}">
            <p class="products_item_title">${product.name}</p>
            <p class="products_item_text">Магазин: ${product.store_name}</p>
            <p class="products_item_text">Гарантия: ${product.warranty}</p>
            <p class="products_item_text">Страна производства: ${product.country_of_origin}</p>
            <p class="products_item_text">Модель: ${product.model}</p>
            <p class="products_item_text">Мощность: ${product.power}</p>
            <p class="products_item_text">Длина: ${product.length}</p>
            <p class="products_item_text">Ширина: ${product.width}</p>
            <p class="products_item_text">Высота: ${product.height}</p>
            <div class="products_item_wrap">
              <p class="products_item_price">${product.price} руб.</p>
              <a class="products_item_link" href="${product.product_url}" target="_blank">На сайт</a>
            </div>
        </div>`;
      products+=productHTML
    });
    res.json(products);
    return;
  }

  async getPowerSuppliesJSON(req, res) {
    const powerSupplies = await pool.query(`SELECT * FROM PowerSupplies`);
    res.json(powerSupplies.rows);
    return;
  }

  async getProcessors(req, res) {
    const processors = await pool.query(`SELECT * FROM Processors`);
    let products = "";

    processors.rows.forEach((product) => {
      const productHTML = `
        <div class="products_item" id="Processors_${product.id}" price="${product.price}">
            <img src="${product.image_url}">
            <p class="products_item_title">${product.name}</p>
            <p class="products_item_text">Магазин: ${product.store_name}</p>
            <p class="products_item_text">Гарантия: ${product.warranty}</p>
            <p class="products_item_text">Разъём: ${product.socket}</p>
            <p class="products_item_text">Ядра: ${product.cores}</p>
            <p class="products_item_text">Потоки: ${product.threads}</p>
            <p class="products_item_text">Базовая частота: ${product.base_clock}</p>
            <p class="products_item_text">Повышенная частота: ${product.turbo_clock}</p>
            <p class="products_item_text">TDP: ${product.tdp}</p>
            <div class="products_item_wrap">
              <p class="products_item_price">${product.price} руб.</p>
              <a class="products_item_link" href="${product.product_url}" target="_blank">На сайт</a>
            </div>
        </div>`;
      products+=productHTML
    });
    res.json(products);
    return;
  }

  async getProcessorsJSON(req, res) {
    const processors = await pool.query(`SELECT * FROM Processors`);
    res.json(processors.rows);
    return;
  }

  async getStorage(req, res) {
    const storage = await pool.query(`SELECT * FROM Storage`);
    let products = "";

    storage.rows.forEach((product) => {
      const productHTML = `
        <div class="products_item" id="Storage_${product.id}" price="${product.price}">
            <img src="${product.image_url}">
            <p class="products_item_title">${product.name}</p>
            <p class="products_item_text">Магазин: ${product.store_name}</p>
            <p class="products_item_text">Гарантия: ${product.warranty}</p>
            <p class="products_item_text">Емкость: ${product.capacity}</p>
            <p class="products_item_text">Максимальная читаемая скорость: ${product.max_read_speed}</p>
            <p class="products_item_text">Максимальная записываемая скорость: ${product.max_write_speed}</p>
            <div class="products_item_wrap">
              <p class="products_item_price">${product.price} руб.</p>
              <a class="products_item_link" href="${product.product_url}" target="_blank">На сайт</a>
            </div>
        </div>`;
      products+=productHTML
    });
    res.json(products);
    return;
  }

  async getStorageJSON(req, res) {
    const storage = await pool.query(`SELECT * FROM Storage`);
    res.json(storage.rows);
    return;
  }
}

export default new Controller();
