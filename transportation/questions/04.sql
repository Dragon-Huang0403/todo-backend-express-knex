-- Who are all the drivers who own both a Toyota and a Honda car at the same time. Make sure that each driver is only listed once.
SELECT DISTINCT
  d.*
FROM
  drivers d
WHERE
  EXISTS (
    SELECT
      v.id
    FROM
      vehicles v
      JOIN ownerships o ON o.vehicle_id = v.id
    WHERE
      v.make = 'Toyota'
      AND o.driver_id = d.id)
  AND EXISTS (
    SELECT
      v.id
    FROM
      vehicles v
      JOIN ownerships o ON o.vehicle_id = v.id
    WHERE
      v.make = 'Honda'
      AND o.driver_id = d.id);

