CREATE DATABASE IF NOT EXISTS rentech CHARACTER SET utf8mb4;
USE rentech;

-- CREATE TABLE

CREATE TABLE users (
    id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(150) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    role        ENUM('penyewa','petugas','admin') NOT NULL DEFAULT 'penyewa',
    id_number   VARCHAR(30) NULL,
    phone       VARCHAR(20) NULL,
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
                ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB;

CREATE TABLE categories (
    id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name        VARCHAR(100) NOT NULL,
    description TEXT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_categories_name (name)
) ENGINE=InnoDB;

CREATE TABLE equipments (
    id             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    category_id    BIGINT UNSIGNED NOT NULL,
    name           VARCHAR(150) NOT NULL,
    brand          VARCHAR(100) NOT NULL,
    photo          VARCHAR(255) NULL,
    description    TEXT NOT NULL,
    specification  TEXT NOT NULL,
    price_per_day  DECIMAL(12,2) NOT NULL,
    stock          INT NOT NULL DEFAULT 0,
    total_stock    INT NOT NULL DEFAULT 0,
    `condition`    ENUM('baik','cukup','rusak') NOT NULL DEFAULT 'baik',
    status         ENUM('tersedia','tidak_tersedia') NOT NULL
                   DEFAULT 'tersedia',
    PRIMARY KEY (id),
    CONSTRAINT fk_equipments_category FOREIGN KEY (category_id)
        REFERENCES categories (id),
    CONSTRAINT ck_equipments_stock CHECK (stock >= 0
        AND stock <= total_stock)
) ENGINE=InnoDB;

CREATE TABLE carts (
    id       BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id  BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_carts_user (user_id),
    CONSTRAINT fk_carts_user FOREIGN KEY (user_id)
        REFERENCES users (id)
) ENGINE=InnoDB;

CREATE TABLE cart_items (
    id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    cart_id       BIGINT UNSIGNED NOT NULL,
    equipment_id  BIGINT UNSIGNED NOT NULL,
    quantity      INT NOT NULL DEFAULT 1,
    start_date    DATE NOT NULL,
    end_date      DATE NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_cart_items_cart FOREIGN KEY (cart_id)
        REFERENCES carts (id) ON DELETE CASCADE,
    CONSTRAINT fk_cart_items_equipment FOREIGN KEY (equipment_id)
        REFERENCES equipments (id),
    CONSTRAINT ck_cart_items_qty CHECK (quantity > 0),
    CONSTRAINT ck_cart_items_date CHECK (end_date >= start_date)
) ENGINE=InnoDB;

CREATE TABLE rentals (
    id                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    invoice_number    VARCHAR(30) NOT NULL,
    user_id           BIGINT UNSIGNED NOT NULL,
    start_date        DATE NOT NULL,
    end_date          DATE NOT NULL,
    delivery_method   ENUM('ambil_sendiri','diantar_kurir') NOT NULL
                      DEFAULT 'ambil_sendiri',
    return_method     ENUM('antar_sendiri','dijemput_kurir') NOT NULL
                      DEFAULT 'antar_sendiri',
    delivery_address  TEXT NULL,
    distance_km       DECIMAL(4,1) NULL,
    delivery_fee      DECIMAL(12,2) NOT NULL DEFAULT 0,
    return_fee        DECIMAL(12,2) NOT NULL DEFAULT 0,
    total_price       DECIMAL(12,2) NOT NULL,
    status            ENUM('menunggu_verifikasi','menunggu_pembayaran',
                      'dibayar','diambil','dikembalikan','terlambat',
                      'dibatalkan') NOT NULL DEFAULT 'menunggu_verifikasi',
    created_at        TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
                      ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_rentals_invoice (invoice_number),
    CONSTRAINT fk_rentals_user FOREIGN KEY (user_id)
        REFERENCES users (id),
    CONSTRAINT ck_rentals_date CHECK (end_date >= start_date),
    CONSTRAINT ck_rentals_fee CHECK (delivery_fee >= 0
        AND return_fee >= 0),
    CONSTRAINT ck_rentals_courier CHECK (
        (delivery_method = 'ambil_sendiri'
            AND return_method = 'antar_sendiri')
        OR (distance_km IS NOT NULL AND distance_km <= 10))
) ENGINE=InnoDB;

CREATE TABLE rental_items (
    id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    rental_id     BIGINT UNSIGNED NOT NULL,
    equipment_id  BIGINT UNSIGNED NOT NULL,
    quantity      INT NOT NULL,
    price_per_day DECIMAL(12,2) NOT NULL,
    duration_days INT NOT NULL,
    subtotal      DECIMAL(12,2) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_rental_items_rental FOREIGN KEY (rental_id)
        REFERENCES rentals (id) ON DELETE CASCADE,
    CONSTRAINT fk_rental_items_equipment FOREIGN KEY (equipment_id)
        REFERENCES equipments (id),
    CONSTRAINT ck_rental_items_qty CHECK (quantity > 0),
    CONSTRAINT ck_rental_items_dur CHECK (duration_days >= 1)
) ENGINE=InnoDB;

CREATE TABLE identity_verifications (
    id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    rental_id     BIGINT UNSIGNED NOT NULL,
    officer_id    BIGINT UNSIGNED NULL,
    ktp_number    VARCHAR(30) NOT NULL,
    ktp_name      VARCHAR(100) NOT NULL,
    ktp_photo     VARCHAR(255) NULL,
    name_match    BOOLEAN NOT NULL DEFAULT FALSE,
    status        ENUM('menunggu','terverifikasi','ditolak') NOT NULL
                  DEFAULT 'menunggu',
    note          TEXT NULL,
    verified_at   DATETIME NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_verifications_rental (rental_id),
    CONSTRAINT fk_verifications_rental FOREIGN KEY (rental_id)
        REFERENCES rentals (id),
    CONSTRAINT fk_verifications_officer FOREIGN KEY (officer_id)
        REFERENCES users (id)
) ENGINE=InnoDB;

CREATE TABLE payments (
    id             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    rental_id      BIGINT UNSIGNED NOT NULL,
    method         ENUM('Transfer','Debit','QRIS') NOT NULL,
    amount_total   DECIMAL(12,2) NOT NULL,
    amount_paid    DECIMAL(12,2) NOT NULL,
    change_amount  DECIMAL(12,2) NOT NULL DEFAULT 0,
    status         ENUM('pending','berhasil','gagal') NOT NULL
                   DEFAULT 'pending',
    paid_at        TIMESTAMP NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_payments_rental (rental_id),
    CONSTRAINT fk_payments_rental FOREIGN KEY (rental_id)
        REFERENCES rentals (id)
) ENGINE=InnoDB;

CREATE TABLE `returns` (
    id                     BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    rental_id              BIGINT UNSIGNED NOT NULL,
    officer_id             BIGINT UNSIGNED NOT NULL,
    picked_up_at           DATETIME NULL,
    pickup_condition_note  TEXT NULL,
    returned_at            DATETIME NULL,
    return_condition_note  TEXT NULL,
    late_days              INT NOT NULL DEFAULT 0,
    late_fine              DECIMAL(12,2) NOT NULL DEFAULT 0,
    damage_fine            DECIMAL(12,2) NOT NULL DEFAULT 0,
    total_fine             DECIMAL(12,2) NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY uq_returns_rental (rental_id),
    CONSTRAINT fk_returns_rental FOREIGN KEY (rental_id)
        REFERENCES rentals (id),
    CONSTRAINT fk_returns_officer FOREIGN KEY (officer_id)
        REFERENCES users (id)
) ENGINE=InnoDB;

CREATE TABLE damages (
    id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    return_id     BIGINT UNSIGNED NOT NULL,
    equipment_id  BIGINT UNSIGNED NOT NULL,
    description   TEXT NOT NULL,
    fine_amount   DECIMAL(12,2) NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    CONSTRAINT fk_damages_return FOREIGN KEY (return_id)
        REFERENCES `returns` (id) ON DELETE CASCADE,
    CONSTRAINT fk_damages_equipment FOREIGN KEY (equipment_id)
        REFERENCES equipments (id)
) ENGINE=InnoDB;

CREATE TABLE reviews (
    id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id       BIGINT UNSIGNED NOT NULL,
    equipment_id  BIGINT UNSIGNED NOT NULL,
    rental_id     BIGINT UNSIGNED NOT NULL,
    rating        TINYINT NOT NULL,
    comment       TEXT NULL,
    created_at    TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_reviews_once (rental_id, equipment_id, user_id),
    CONSTRAINT fk_reviews_user FOREIGN KEY (user_id)
        REFERENCES users (id),
    CONSTRAINT fk_reviews_equipment FOREIGN KEY (equipment_id)
        REFERENCES equipments (id),
    CONSTRAINT fk_reviews_rental FOREIGN KEY (rental_id)
        REFERENCES rentals (id),
    CONSTRAINT ck_reviews_rating CHECK (rating BETWEEN 1 AND 5)
) ENGINE=InnoDB;

-- INSERT DATA

INSERT INTO users (id, name, email, password, role, id_number, phone, is_active, created_at)
VALUES
  (1, 'Rina Kusuma', 'rina.kusuma@rentech.id',
   '$2y$10$69469ad6ae998d0910eb08b9b628aa082a62d18ff5ba9d25e08e4',
   'admin', NULL, '081234560001', TRUE, '2026-08-11 09:00:00'),
  (2, 'Budi Santoso', 'budi.santoso@rentech.id',
   '$2y$10$83733dac82222a204cf082185280ab6be65985bdfdc869f228474',
   'petugas', NULL, '081234560002', TRUE, '2026-08-12 09:00:00'),
  (3, 'Ahmad Fauzi', 'ahmad.fauzi@mail.com',
   '$2y$10$60eaec7618d52322f840aeda411f73d9a98ac3ece818a16de1cd9',
   'penyewa', '3578010101990001', '081234560003', TRUE, '2026-08-13 09:00:00'),
  (4, 'Siti Nurhaliza', 'siti.nurhaliza@mail.com',
   '$2y$10$28c54d6dda8dfad13f10ca0db609b4c2089605dcac9f2d7265c0b',
   'penyewa', '3578014502000002', '081234560004', TRUE, '2026-08-14 09:00:00'),
  (5, 'Dimas Prakoso', 'dimas.prakoso@mail.com',
   '$2y$10$3d6f1a99a142f17316f47a7725790c0cb3d3b7ea91650dda08802',
   'penyewa', '3578011203980003', '081234560005', TRUE, '2026-08-15 09:00:00');

INSERT INTO categories (id, name, description) VALUES
  (1, 'Kamera', 'Kamera mirrorless dan DSLR untuk foto dan video'),
  (2, 'Tripod dan Stabilizer', 'Penyangga dan penstabil kamera'),
  (3, 'Proyektor', 'Proyektor untuk presentasi dan acara'),
  (4, 'Audio', 'Mikrofon, speaker, dan perlengkapan suara'),
  (5, 'Pencahayaan', 'Lampu LED dan perlengkapan lighting');

INSERT INTO equipments (id, category_id, name, brand, photo, description,
    specification, price_per_day, stock, total_stock, `condition`, status)
VALUES
  (1, 1, 'Canon EOS R6', 'Canon', 'equipments/canon-eos-r6.jpg',
   'Kamera mirrorless full-frame untuk foto dan video.',
   '20 MP, video 4K 60p, IBIS, dual card slot',
   350000.00, 3, 3, 'baik', 'tersedia'),
  (2, 2, 'Tripod Manfrotto 190', 'Manfrotto', 'equipments/manfrotto-190.jpg',
   'Tripod aluminium ringan dengan kepala bola.',
   'Tinggi maks 160 cm, beban maks 7 kg',
   50000.00, 10, 10, 'cukup', 'tersedia'),
  (3, 3, 'Proyektor Epson EB-X06', 'Epson', 'equipments/epson-ebx06.jpg',
   'Proyektor untuk presentasi kelas dan seminar.',
   '3600 lumens, XGA, HDMI dan VGA',
   150000.00, 4, 4, 'cukup', 'tersedia'),
  (4, 4, 'Rode Wireless GO II', 'Rode', 'equipments/rode-wireless-go2.jpg',
   'Mikrofon nirkabel dua kanal untuk wawancara dan vlog.',
   '2 transmitter, jangkauan 200 m, perekaman internal',
   100000.00, 6, 6, 'baik', 'tersedia'),
  (5, 5, 'Godox LED SL60W', 'Godox', 'equipments/godox-sl60w.jpg',
   'Lampu LED studio daylight untuk foto dan video.',
   '60 W, 5600K, Bowens mount, remote',
   75000.00, 8, 8, 'baik', 'tersedia');

INSERT INTO carts (id, user_id) VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5);

INSERT INTO cart_items (id, cart_id, equipment_id, quantity, start_date, end_date)
VALUES
  (1, 3, 1, 1, '2026-10-26', '2026-10-28'),
  (2, 3, 2, 1, '2026-10-26', '2026-10-28'),
  (3, 4, 4, 2, '2026-10-30', '2026-11-01'),
  (4, 5, 3, 1, '2026-11-03', '2026-11-04'),
  (5, 5, 5, 2, '2026-11-03', '2026-11-04');

INSERT INTO rentals (id, invoice_number, user_id, start_date, end_date,
    delivery_method, return_method, delivery_address, distance_km,
    delivery_fee, return_fee, total_price, status, created_at)
VALUES
  (1, 'INV-20260901-0001', 3, '2026-09-01', '2026-09-03',
   'ambil_sendiri', 'antar_sendiri', NULL, NULL,
   0.00, 0.00, 700000.00, 'dikembalikan', '2026-08-31 14:10:00'),
  (2, 'INV-20260905-0002', 4, '2026-09-05', '2026-09-08',
   'diantar_kurir', 'dijemput_kurir', 'Jl. Mawar No. 12, Blok C', 3.2,
   20000.00, 20000.00, 340000.00, 'dikembalikan', '2026-09-04 10:25:00'),
  (3, 'INV-20260910-0003', 5, '2026-09-10', '2026-09-12',
   'diantar_kurir', 'antar_sendiri', 'Jl. Kenanga No. 8', 7.5,
   40000.00, 0.00, 340000.00, 'dikembalikan', '2026-09-09 16:40:00'),
  (4, 'INV-20260915-0004', 3, '2026-09-15', '2026-09-18',
   'ambil_sendiri', 'dijemput_kurir', 'Jl. Anggrek No. 21', 4.0,
   0.00, 20000.00, 620000.00, 'dikembalikan', '2026-09-14 11:05:00'),
  (5, 'INV-20260920-0005', 4, '2026-09-20', '2026-09-21',
   'ambil_sendiri', 'antar_sendiri', NULL, 12.5,
   0.00, 0.00, 150000.00, 'dikembalikan', '2026-09-19 09:50:00');

INSERT INTO rental_items (id, rental_id, equipment_id, quantity,
    price_per_day, duration_days, subtotal)
VALUES
  (1, 1, 1, 1, 350000.00, 2, 700000.00),
  (2, 2, 2, 2,  50000.00, 3, 300000.00),
  (3, 3, 3, 1, 150000.00, 2, 300000.00),
  (4, 4, 4, 2, 100000.00, 3, 600000.00),
  (5, 5, 5, 2,  75000.00, 1, 150000.00);

INSERT INTO identity_verifications (id, rental_id, officer_id,
    ktp_number, ktp_name, ktp_photo, name_match, status, note, verified_at)
VALUES
  (1, 1, 2, '3578010101990001', 'Ahmad Fauzi', 'ktp/rental-1.jpg', TRUE,
   'terverifikasi', 'KTP asli, nama sesuai akun.', '2026-08-31 14:12:00'),
  (2, 2, 2, '3578014502000002', 'Siti Nurhaliza', 'ktp/rental-2.jpg', TRUE,
   'terverifikasi', 'KTP asli, nama sesuai akun.', '2026-09-04 10:27:00'),
  (3, 3, 2, '3578011203980003', 'Dimas Prakoso', 'ktp/rental-3.jpg', TRUE,
   'terverifikasi', 'KTP asli, nama sesuai akun.', '2026-09-09 16:42:00'),
  (4, 4, 2, '3578010101990001', 'Ahmad Fauzi', 'ktp/rental-4.jpg', TRUE,
   'terverifikasi', 'KTP asli, nama sesuai akun.', '2026-09-14 11:07:00'),
  (5, 5, 2, '3578014502000002', 'Siti Nurhaliza', 'ktp/rental-5.jpg', TRUE,
   'terverifikasi', 'KTP asli, nama sesuai akun.', '2026-09-19 09:52:00');

INSERT INTO payments (id, rental_id, method, amount_total, amount_paid,
    change_amount, status, paid_at)
VALUES
  (1, 1, 'Debit',    700000.00, 700000.00, 0.00, 'berhasil', '2026-08-31 14:15:00'),
  (2, 2, 'Transfer', 340000.00, 340000.00, 0.00, 'berhasil', '2026-09-04 10:30:00'),
  (3, 3, 'QRIS',     340000.00, 340000.00, 0.00, 'berhasil', '2026-09-09 16:45:00'),
  (4, 4, 'Transfer', 620000.00, 620000.00, 0.00, 'berhasil', '2026-09-14 11:10:00'),
  (5, 5, 'QRIS',     150000.00, 150000.00, 0.00, 'berhasil', '2026-09-19 09:55:00');

INSERT INTO `returns` (id, rental_id, officer_id, picked_up_at,
    pickup_condition_note, returned_at, return_condition_note,
    late_days, late_fine, damage_fine, total_fine)
VALUES
  (1, 1, 2, '2026-09-01 09:00:00', 'Kamera dan aksesori lengkap, kondisi baik.',
   '2026-09-03 16:00:00', 'Penutup lensa hilang.',
   0, 0.00, 50000.00, 50000.00),
  (2, 2, 2, '2026-09-05 09:30:00', 'Dua tripod berfungsi normal.',
   '2026-09-09 10:30:00', 'Terlambat 1 hari, engsel kepala tripod longgar.',
   1, 10000.00, 75000.00, 85000.00),
  (3, 3, 2, '2026-09-10 10:00:00', 'Proyektor menyala normal, lensa bersih.',
   '2026-09-12 15:45:00', 'Lensa proyektor tergores.',
   0, 0.00, 250000.00, 250000.00),
  (4, 4, 2, '2026-09-15 09:15:00', 'Dua set mikrofon lengkap dengan windscreen.',
   '2026-09-18 17:00:00', 'Satu windscreen hilang.',
   0, 0.00, 40000.00, 40000.00),
  (5, 5, 2, '2026-09-20 13:00:00', 'Dua lampu LED lengkap dengan diffuser.',
   '2026-09-22 11:00:00', 'Terlambat 1 hari, diffuser retak.',
   1, 15000.00, 60000.00, 75000.00);

INSERT INTO damages (id, return_id, equipment_id, description, fine_amount)
VALUES
  (1, 1, 1, 'Penutup lensa hilang', 50000.00),
  (2, 2, 2, 'Engsel kepala tripod longgar', 75000.00),
  (3, 3, 3, 'Lensa proyektor tergores', 250000.00),
  (4, 4, 4, 'Satu windscreen mikrofon hilang', 40000.00),
  (5, 5, 5, 'Diffuser lampu LED retak', 60000.00);

INSERT INTO reviews (id, user_id, equipment_id, rental_id, rating, comment,
    created_at)
VALUES
  (1, 3, 1, 1, 5, 'Kualitas video sangat bagus, kamera terawat.', '2026-09-04 08:00:00'),
  (2, 4, 2, 2, 4, 'Tripod kokoh, harga sewa terjangkau.', '2026-09-10 09:00:00'),
  (3, 5, 3, 3, 4, 'Gambar proyektor terang untuk ruang kelas.', '2026-09-13 10:00:00'),
  (4, 3, 4, 4, 5, 'Suara jernih, praktis dipakai wawancara.', '2026-09-19 08:30:00'),
  (5, 4, 5, 5, 3, 'Cahaya cukup, tetapi diffuser mudah rusak.', '2026-09-23 09:00:00');