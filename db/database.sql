--  sudo -u postgres psql         into postgres bash

CREATE DATABASE hotel_database;

--  \c hotel_database             into room-database

CREATE TABLE rooms (
    room_id SERIAL PRIMARY KEY,
    img_link VARCHAR(128) NOT NULL 
    DEFAULT 'https://encrypted-tbn0.gstatic.com/
    images?q=tbn:ANd9GcTa_Oc-DoKyRc7pc3-32xQzefUjPycL3-w07g&usqp=CAU', -- link to img of room which is saved on 'server'
    title VARCHAR(50) NOT NULL, -- name of room
    sleeps INT NOT NULL, -- sleep slots (example. number of beds)
    floor INT NOT NULL,
    price NUMERIC NOT NULL, -- per night
    description VARCHAR(128) NOT NULL, -- short description for rooms cards
    extended_description VARCHAR(512) NOT NULL -- description for rooms pages
);

CREATE TYPE feature_type AS ENUM ('is_parking', 'is_wifi', 'animal_allow');

CREATE TABLE room_features (
    feature_id SERIAL PRIMARY KEY,
    room_id INT,
    type feature_type NOT NULL, -- type of feature
    status Boolean NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_rooms
        FOREIGN KEY(room_id)
            REFERENCES rooms(room_id)
);

CREATE TABLE clients (
    client_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR(120) NOT NULL,
    document_number VARCHAR(11) NOT NULL,
    phone_number VARCHAR(16) NOT NULL,
    email VARCHAR(64) NOT NULL,

    postal_code VARCHAR(8) NOT NULL,
    city VARCHAR(64) NOT NULL,
    street VARCHAR(64) NOT NULL,
    house_number VARCHAR(10) NOT NULL,
    apartment_number VARCHAR(10)
);

CREATE TABLE reservations (
    reservation_id SERIAL PRIMARY KEY,
    room_id INT NOT NULL,
    client_id INT NOT NULL,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE NOT NULL,
    message VARCHAR(255),
    paid Boolean DEFAULT FALSE,

    CONSTRAINT fk_rooms
        FOREIGN KEY(room_id)
            REFERENCES rooms(room_id),
    CONSTRAINT fk_clients
        FOREIGN KEY(client_id)
            REFERENCES clients(client_id)
);

CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    reservation_id INT NOT NULL,
    date DATE NOT NULL,
    amount NUMERIC NOT NULL,    
    card_id VARCHAR(16) NOT NULL,

    CONSTRAINT fk_reservations
        FOREIGN KEY(reservation_id)
            REFERENCES reservations(reservation_id)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(64) NOT NULL,
    login VARCHAR(64) NOT NULL,
    password VARCHAR(128) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(120) NOT NULL
);

CREATE TABLE ratings (
    rating_id SERIAL PRIMARY KEY,
    room_id INT NOT NULL,
    rating INT NOT NULL, -- count of 'stars' from 0 to 5
    review VARCHAR(512), -- message from clients for their stay

    CONSTRAINT chk_rating
        CHECK (rating between 0 and 5),
    CONSTRAINT fk_rooms
        FOREIGN KEY(room_id)
            REFERENCES rooms(room_id)
);
