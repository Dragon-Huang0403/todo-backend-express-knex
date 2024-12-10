-- Who are all of the drivers who drive Toyota or Honda cars. Make sure that each driver is only listed once.
SELECT DISTINCT
  d.*
FROM
  drivers d
  JOIN ownerships o ON o.driver_id = d.id
  JOIN vehicles v ON v.id = o.vehicle_id
WHERE
  v.make IN ('Toyota', 'Honda');

