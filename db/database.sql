--  sudo -u postgres psql         into postgres bash

CREATE DATABASE hotel_database;

--  \c hotel_database             into room-database

CREATE TABLE room (
    room_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    sleeps INT NOT NULL,
    floor INT NOT NULL,
    price NUMERIC NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE reservation (
    reservation_id SERIAL PRIMARY KEY,
    room_id INT NOT NULL,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE NOT NULL,
    document_number VARCHAR(11) NOT NULL UNIQUE,
    CONSTRAINT fk_room
        FOREIGN KEY(room_id)
            REFERENCES room(room_id)
);