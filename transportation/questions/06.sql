-- The person who initially designed the database tables left some redundancies in the data that we'd like to remove. Can we normalize the vehicles table? Think along the lines of third normal form (3NF)
-- Please write and execute the queries to execute on this.
-- 1. create table
CREATE TABLE vehicle_models (
  id serial PRIMARY KEY,
  make text NOT NULL,
  model text NOT NULL,
  year int NOT NULL,
  UNIQUE (make, model, year)
);

-- 2. update table to new table
INSERT INTO vehicle_models (make, model, "year")
SELECT DISTINCT
  make,
  model,
  "year"
FROM
  vehicles;

-- 3. reference to the new table
ALTER TABLE vehicles
  ADD COLUMN model_id int;

ALTER TABLE vehicles
  ADD FOREIGN KEY (model_id) REFERENCES vehicle_models (id);

UPDATE
  vehicles v
SET
  model_id = vm.id
FROM
  vehicle_models vm
WHERE
  vm.make = v.make
  AND vm.model = v.model
  AND vm.year = v.year;
  
ALTER TABLE vehicles
  ALTER COLUMN model_id SET NOT NULL;

-- 4. delete old columns
ALTER TABLE vehicles
  DROP COLUMN make;

ALTER TABLE vehicles
  DROP COLUMN model;

ALTER TABLE vehicles
  DROP COLUMN year;

