-- Look up all vehicles of make Toyota and model Camry. Explain what you see in the query plan for that query. Please explain how that query plan can be expedited so that the query completes faster and more efficiently. Apply the "fix" and demonstrate that the query is now faster.
EXPLAIN ANALYZE
SELECT
  *
FROM
  vehicles v
WHERE
  v.make = 'Toyota'
  AND v.model = 'Camry';

-- Seq Scan on vehicles v  (cost=0.00..23.00 rows=1 width=31) (actual time=0.110..0.278 rows=2 loops=1)
-- "  Filter: ((make = 'Toyota'::text) AND (model = 'Camry'::text))"
--   Rows Removed by Filter: 998
-- Planning Time: 0.668 ms
-- Execution Time: 0.451 ms
CREATE INDEX idx_make_model ON vehicles (make, model);

-- Index Scan using idx_make_model on vehicles v  (cost=0.28..8.29 rows=1 width=31) (actual time=0.152..0.156 rows=2 loops=1)
-- "  Index Cond: ((make = 'Toyota'::text) AND (model = 'Camry'::text))"
-- Planning Time: 0.096 ms
-- Execution Time: 0.175 ms
