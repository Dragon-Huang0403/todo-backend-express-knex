-- We would like to know what all of the vehicles are for driver with id 5
SELECT
  v.*
FROM
  vehicles v
  JOIN ownerships o ON o.vehicle_id = v.id
  JOIN drivers d ON d.id = o.driver_id
WHERE
  d.id = 5;

