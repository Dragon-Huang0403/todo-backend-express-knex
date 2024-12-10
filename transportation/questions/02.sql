-- List all of the drivers and their corresponding cars, regardless of whether they currently own a car or not
SELECT
  d.id as driver_id,
  d.first_name,
  d.last_name,
  v.id as vehicle_id,
  v.license_plate,
  v.make,
  v.model,
  v.year
FROM
  drivers d
  LEFT JOIN ownerships o ON o.driver_id = d.id
  LEFT JOIN vehicles v ON v.id = o.vehicle_id;

