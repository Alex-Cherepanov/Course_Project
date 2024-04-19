CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Processors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cores VARCHAR(255) NOT NULL,
    threads VARCHAR(255) NOT NULL,
    socket VARCHAR(255) NOT NULL,
    warranty VARCHAR(255) NOT NULL,
    base_clock VARCHAR(255) NOT NULL,
    turbo_clock VARCHAR(255) NOT NULL,
    tdp VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    product_url VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    store_name VARCHAR(255) NOT NULL
);

CREATE TABLE Motherboards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    socket VARCHAR(255) NOT NULL,
    chipset VARCHAR(255) NOT NULL,
    memory_type VARCHAR(255) NOT NULL,
    memory_slots VARCHAR(255) NOT NULL,
    country_of_origin VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    product_url VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    store_name VARCHAR(255) NOT NULL
);


CREATE TABLE GraphicsCards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    warranty VARCHAR(255) NOT NULL,
    memory_size VARCHAR(255) NOT NULL,
    memory_type VARCHAR(255) NOT NULL,
    gpu_clock VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    product_url VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    store_name VARCHAR(255) NOT NULL
);                                                                                                                      


CREATE TABLE Memory (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    warranty VARCHAR(255) NOT NULL,
    country_of_origin VARCHAR(255) NOT NULL,
    module_capacity VARCHAR(255) NOT NULL,
    total_capacity VARCHAR(255) NOT NULL,
    memory_frequency VARCHAR(255) NOT NULL,
    memory_type VARCHAR(255) NOT NULL,
    modules_in_kit VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    product_url VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    store_name VARCHAR(255) NOT NULL
);

  

CREATE TABLE Storage (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    warranty VARCHAR(255) NOT NULL,
    capacity VARCHAR(255) NOT NULL,
    max_read_speed VARCHAR(255) NOT NULL,
    max_write_speed VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    product_url VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    store_name VARCHAR(255) NOT NULL
);

CREATE TABLE PowerSupplies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    warranty VARCHAR(255) NOT NULL,
    country_of_origin VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    power VARCHAR(255) NOT NULL,
    length VARCHAR(255) NOT NULL,
    width VARCHAR(255) NOT NULL,
    height VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    product_url VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    store_name VARCHAR(255) NOT NULL
);

CREATE TABLE Cases (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    warranty VARCHAR(255) NOT NULL,
    weight VARCHAR(255) NOT NULL,
    material VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    product_url VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    store_name VARCHAR(255) NOT NULL
);