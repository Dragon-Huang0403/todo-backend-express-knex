CREATE TABLE drivers (
  id serial PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL
);

CREATE TABLE ownerships (
  driver_id int NOT NULL,
  vehicle_id int NOT NULL,
  PRIMARY KEY (driver_id, vehicle_id)
);

CREATE TABLE vehicles (
  id serial PRIMARY KEY,
  license_plate text NOT NULL,
  make text NOT NULL,
  model text NOT NULL,
  year int NOT NULL
);

ALTER TABLE ownerships
  ADD FOREIGN KEY (driver_id) REFERENCES drivers (id);

ALTER TABLE ownerships
  ADD FOREIGN KEY (vehicle_id) REFERENCES vehicles (id);

