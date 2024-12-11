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
-- Unique  (cost=45.73..45.75 rows=1 width=19) (actual time=0.604..0.608 rows=1 loops=1)
--   ->  Sort  (cost=45.73..45.74 rows=1 width=19) (actual time=0.602..0.606 rows=1 loops=1)
--         Sort Key: d.id, d.first_name, d.last_name
--         Sort Method: quicksort  Memory: 25kB
--         ->  Nested Loop Semi Join  (cost=38.68..45.72 rows=1 width=19) (actual time=0.467..0.571 rows=1 loops=1)
--               ->  Nested Loop  (cost=38.26..40.79 rows=6 width=23) (actual time=0.417..0.459 rows=10 loops=1)
--                     ->  HashAggregate  (cost=37.98..38.04 rows=6 width=4) (actual time=0.346..0.352 rows=10 loops=1)
--                           Group Key: o_1.driver_id
--                           Batches: 1  Memory Usage: 24kB
--                           ->  Hash Join  (cost=31.74..37.97 rows=6 width=4) (actual time=0.276..0.336 rows=10 loops=1)
--                                 Hash Cond: (o_1.vehicle_id = v_1.id)
--                                 ->  Seq Scan on ownerships o_1  (cost=0.00..5.35 rows=335 width=8) (actual time=0.022..0.047 rows=335 loops=1)
--                                 ->  Hash  (cost=31.50..31.50 rows=19 width=4) (actual time=0.217..0.218 rows=19 loops=1)
--                                       Buckets: 1024  Batches: 1  Memory Usage: 9kB
--                                       ->  Seq Scan on vehicles v_1  (cost=0.00..31.50 rows=19 width=4) (actual time=0.016..0.205 rows=19 loops=1)
-- "                                            Filter: (make = 'Honda'::text)"
--                                             Rows Removed by Filter: 981
--                     ->  Index Scan using drivers_pkey on drivers d  (cost=0.28..0.46 rows=1 width=19) (actual time=0.010..0.010 rows=1 loops=10)
--                           Index Cond: (id = o_1.driver_id)
--               ->  Nested Loop  (cost=0.42..0.81 rows=1 width=4) (actual time=0.011..0.011 rows=0 loops=10)
--                     ->  Index Only Scan using ownerships_pkey on ownerships o  (cost=0.15..0.18 rows=1 width=8) (actual time=0.002..0.003 rows=1 loops=10)
--                           Index Cond: (driver_id = d.id)
--                           Heap Fetches: 12
--                     ->  Index Scan using vehicles_pkey on vehicles v  (cost=0.28..0.62 rows=1 width=4) (actual time=0.006..0.006 rows=0 loops=12)
--                           Index Cond: (id = o.vehicle_id)
-- "                          Filter: (make = 'Toyota'::text)"
--                           Rows Removed by Filter: 1
-- Planning Time: 1.131 ms
-- Execution Time: 0.808 ms

-- Simplicity
SELECT
  d.id, d.first_name, d.last_name
FROM
  drivers d
  JOIN ownerships o ON o.driver_id = d.id
  JOIN vehicles v ON o.vehicle_id = v.id
WHERE
  v.make IN ('Toyota', 'Honda')
GROUP BY
  d.id
HAVING
  COUNT(DISTINCT v.make) = 2;
-- GroupAggregate  (cost=48.63..49.07 rows=1 width=19) (actual time=1.305..1.319 rows=1 loops=1)
--   Group Key: d.id
--   Filter: (count(DISTINCT v.make) = 2)
--   Rows Removed by Filter: 23
--   ->  Sort  (cost=48.63..48.69 rows=22 width=26) (actual time=1.291..1.295 rows=25 loops=1)
--         Sort Key: d.id, v.make
--         Sort Method: quicksort  Memory: 26kB
--         ->  Nested Loop  (cost=32.60..48.14 rows=22 width=26) (actual time=0.884..1.117 rows=25 loops=1)
--               ->  Hash Join  (cost=32.33..38.55 rows=22 width=11) (actual time=0.836..0.901 rows=25 loops=1)
--                     Hash Cond: (o.vehicle_id = v.id)
--                     ->  Seq Scan on ownerships o  (cost=0.00..5.35 rows=335 width=8) (actual time=0.023..0.049 rows=335 loops=1)
--                     ->  Hash  (cost=31.50..31.50 rows=66 width=11) (actual time=0.728..0.729 rows=66 loops=1)
--                           Buckets: 1024  Batches: 1  Memory Usage: 11kB
--                           ->  Seq Scan on vehicles v  (cost=0.00..31.50 rows=66 width=11) (actual time=0.050..0.661 rows=66 loops=1)
-- "                                Filter: (make = ANY ('{Toyota,Honda}'::text[]))"
--                                 Rows Removed by Filter: 934
--               ->  Index Scan using drivers_pkey on drivers d  (cost=0.28..0.44 rows=1 width=19) (actual time=0.007..0.007 rows=1 loops=25)
--                     Index Cond: (id = o.driver_id)
-- Planning Time: 2.114 ms
-- Execution Time: 1.658 ms