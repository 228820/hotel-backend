-- 
-- ROOMS SECTION
-- 

-- Reset room id etc
TRUNCATE TABLE rooms RESTART IDENTITY CASCADE;

-- Add rooms
INSERT INTO ROOMS(IMG_LINK, TITLE, SLEEPS, FLOOR, PRICE, DESCRIPTION, EXTENDED_DESCRIPTION)
VALUES('https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Living_Room.jpg/2560px-Living_Room.jpg',
	  'NORTHERN ROOM I',
	  2,
	  2,
	  70,
	  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
	  'Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');

INSERT INTO ROOMS(IMG_LINK, TITLE, SLEEPS, FLOOR, PRICE, DESCRIPTION, EXTENDED_DESCRIPTION)
VALUES('http://cdn.home-designing.com/wp-content/uploads/2017/07/modern-loft-design.jpg',
	  'SOUTHERN ROOM I',
	  2,
	  1,
	  50,
	  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
	  'Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');

INSERT INTO ROOMS(IMG_LINK, TITLE, SLEEPS, FLOOR, PRICE, DESCRIPTION, EXTENDED_DESCRIPTION)
VALUES('https://www.thenordroom.com/wp-content/uploads/2019/09/TheNordroom-ASmallLightandBeautifulScandinavianApartment.jpg',
	  'EASTERN ROOM I',
	  1,
	  0,
	  30,
	  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
	  'Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');

INSERT INTO ROOMS(IMG_LINK, TITLE, SLEEPS, FLOOR, PRICE, DESCRIPTION, EXTENDED_DESCRIPTION)
VALUES('https://lundholmhotels.com/img/uploads/apartment_images/1580995944-1753089.jpg',
	  'WESTERN ROOM I',
	  4,
	  1,
	  80,
	  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
	  'Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');

INSERT INTO ROOMS(IMG_LINK, TITLE, SLEEPS, FLOOR, PRICE, DESCRIPTION, EXTENDED_DESCRIPTION)
VALUES('https://www.caandesign.com/wp-content/uploads/2017/07/riddargatan-stylish-scandinavian-apartment-designed-henrik-nero-caandesign-01.jpg',
	  'NORTHERN ROOM II',
	  2,
	  3,
	  100,
	  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
	  'Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');

INSERT INTO ROOMS(IMG_LINK, TITLE, SLEEPS, FLOOR, PRICE, DESCRIPTION, EXTENDED_DESCRIPTION)
VALUES('https://roohome.com/wp-content/uploads/2017/02/Zrobym-Architects.jpg',
	  'SOUTHERN ROOM II',
	  4,
	  0,
	  120,
	  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
	  'Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');


-- Check rooms
SELECT * FROM ROOMS;


-- 
-- ROOM_FEATURES SECTION
-- 


-- Add rooms features
INSERT INTO ROOM_FEATURES(ROOM_ID, TYPE, STATUS)
VALUES(1, 'IS_PARKING', TRUE);

INSERT INTO ROOM_FEATURES(ROOM_ID, TYPE, STATUS)
VALUES(1, 'IS_WIFI', TRUE);

INSERT INTO ROOM_FEATURES(ROOM_ID, TYPE, STATUS)
VALUES(1, 'ANIMAL_ALLOW', FALSE);

INSERT INTO ROOM_FEATURES(ROOM_ID, TYPE, STATUS)
VALUES(2, 'IS_PARKING', TRUE);

INSERT INTO ROOM_FEATURES(ROOM_ID, TYPE, STATUS)
VALUES(2, 'IS_WIFI', TRUE);

INSERT INTO ROOM_FEATURES(ROOM_ID, TYPE, STATUS)
VALUES(2, 'ANIMAL_ALLOW', TRUE);

INSERT INTO ROOM_FEATURES(ROOM_ID, TYPE, STATUS)
VALUES(3, 'IS_PARKING', FALSE);

INSERT INTO ROOM_FEATURES(ROOM_ID, TYPE, STATUS)
VALUES(3, 'IS_WIFI', FALSE);

INSERT INTO ROOM_FEATURES(ROOM_ID, TYPE, STATUS)
VALUES(3, 'ANIMAL_ALLOW', FALSE);

INSERT INTO ROOM_FEATURES(ROOM_ID, TYPE, STATUS)
VALUES(4, 'IS_PARKING', TRUE);

INSERT INTO ROOM_FEATURES(ROOM_ID, TYPE, STATUS)
VALUES(4, 'IS_WIFI', FALSE);

INSERT INTO ROOM_FEATURES(ROOM_ID, TYPE, STATUS)
VALUES(4, 'ANIMAL_ALLOW', FALSE);

INSERT INTO ROOM_FEATURES(ROOM_ID, TYPE, STATUS)
VALUES(5, 'IS_PARKING', FALSE);

INSERT INTO ROOM_FEATURES(ROOM_ID, TYPE, STATUS)
VALUES(5, 'IS_WIFI', TRUE);

INSERT INTO ROOM_FEATURES(ROOM_ID, TYPE, STATUS)
VALUES(5, 'ANIMAL_ALLOW', FALSE);

INSERT INTO ROOM_FEATURES(ROOM_ID, TYPE, STATUS)
VALUES(6, 'IS_PARKING', FALSE);

INSERT INTO ROOM_FEATURES(ROOM_ID, TYPE, STATUS)
VALUES(6, 'IS_WIFI', TRUE);

INSERT INTO ROOM_FEATURES(ROOM_ID, TYPE, STATUS)
VALUES(6, 'ANIMAL_ALLOW', TRUE);


-- Check rooms features
SELECT * FROM ROOM_FEATURES;


-- 
-- CLIENTS SECTION
-- 


-- Add clients
INSERT INTO CLIENTS(FIRST_NAME, LAST_NAME, DOCUMENT_NUMBER, PHONE_NUMBER, EMAIL,
POSTAL_CODE, CITY, STREET, HOUSE_NUMBER)
VALUES('JOHN',
	   'SMITH',
	   '11111111111',
	   '123456789',
	   'SMITH@GMAIL.COM',
	   '12-345',
	   'SMITH-TOWN',
	   'STREET',
	   12);


INSERT INTO CLIENTS(FIRST_NAME, LAST_NAME, DOCUMENT_NUMBER, PHONE_NUMBER, EMAIL,
POSTAL_CODE, CITY, STREET, HOUSE_NUMBER, APARTMENT_NUMBER)
VALUES('JACK',
	   'DAWSON',
	   '22222222222',
	   '987654321',
	   'JACK@GMAIL.COM',
	   '67-890',
	   'NEW-YORK',
	   'THAT STREET',
	   2,
	   30);


INSERT INTO CLIENTS(FIRST_NAME, LAST_NAME, DOCUMENT_NUMBER, PHONE_NUMBER, EMAIL,
POSTAL_CODE, CITY, STREET, HOUSE_NUMBER, APARTMENT_NUMBER)
VALUES('BRUCE',
	   'JOBS',
	   '33333333333',
	   '847291734',
	   'BRUCE.JOBS@TEST.COM',
	   '23-623',
	   'LONDON',
	   'THIS STREET',
	   21,
	   3);
	   

-- Check clients
SELECT * FROM CLIENTS


-- 
-- RESERVATIONS SECTION
-- 


-- Add reservations
INSERT INTO RESERVATIONS(ROOM_ID, CLIENT_ID, START_DATE, END_DATE, MESSAGE, PAID)
VALUES(1,
	   2,
	   '2022-08-02',
	   '2022-08-10',
	   'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
	   FALSE);
	   

INSERT INTO RESERVATIONS(ROOM_ID, CLIENT_ID, START_DATE, END_DATE, MESSAGE, PAID)
VALUES(4,
	   2,
	   '2022-07-12',
	   '2022-07-20',
	   'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
	   TRUE);
	   

INSERT INTO RESERVATIONS(ROOM_ID, CLIENT_ID, START_DATE, END_DATE, MESSAGE, PAID)
VALUES(2,
	   3,
	   '2022-07-07',
	   '2022-08-10',
	   'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
	   FALSE);
	

-- Check reservations
SELECT * FROM RESERVATIONS;


-- 
-- PAYMENTS SECTION
-- 



INSERT INTO PAYMENTS(RESERVATION_ID, DATE, AMOUNT, CARD_ID)
VALUES(1,
	   '2022-06-01',
	  350,
	  '1234567890123456');
	  

INSERT INTO PAYMENTS(RESERVATION_ID, DATE, AMOUNT, CARD_ID)
VALUES(2,
	   '2022-06-02',
	  640,
	  '1723274917347265');

INSERT INTO PAYMENTS(RESERVATION_ID, DATE, AMOUNT, CARD_ID)
VALUES(3,
	   '2022-06-03',
	  1700,
	  '9603745815503275');


-- Check payments
SELECT * FROM PAYMENTS;


-- 
-- RATINGS SECTION
-- 


-- Add ratings
DO $$
BEGIN
	FOR ROOM IN 1..6 LOOP
	   FOR ROOM_RATINGS IN 1..10 LOOP
		INSERT INTO RATINGS(ROOM_ID, RATING, REVIEW)
		VALUES(ROOM,
			   floor(random() * 6)::int,
			   'Lorem Ipsum is simply dummy text of the printing and typesetting industry.');
-- 		raise notice 'cnt: % - % - %', ROOM, ROOM_RATINGS, floor(random() * 6)::int;
	   END LOOP;
	END LOOP;
END; $$

-- Check ratings
SELECT * FROM RATINGS;
