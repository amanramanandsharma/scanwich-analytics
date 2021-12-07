--- Which suppliers contributed to the online traffic last month?
SELECT COUNT(*) AS page_counter ,users.name, v.supplier_id,MONTH(v.created_at), ROUND(COUNT(*)/(SELECT COUNT(*) FROM visitor_logs AS t WHERE MONTH(t.created_at) = MONTH(CURRENT_DATE()) - 1 AND YEAR(t.created_at) = YEAR(CURRENT_DATE())) * 100,2) AS percentage_of_total_traffic FROM visitor_logs AS v join users ON v.supplier_id = users.id WHERE MONTH(v.created_at) = MONTH(CURRENT_DATE()) - 1 AND YEAR(v.created_at) = YEAR(CURRENT_DATE()) group BY v.supplier_id,Month(v.created_at) ORDER BY percentage_of_total_traffic desc;

--- What was the total amount/orders bought from scanwich month-year wise?
SELECT concat(SUBSTR(MONTHNAME(created_at),1,3),' ',YEAR(created_at)) as xaxis_label,YEAR(created_at) AS y, MONTH(created_at) AS m, MONTHNAME(created_at) AS month_name, COUNT(id) AS number_of_orders, SUM(total) AS total FROM orders GROUP BY y, m , month_name,xaxis_label ORDER BY y,m

--- How is the trend for total amount/orders for supplier 1?
SELECT concat(SUBSTR(MONTHNAME(created_at),1,3),' ',YEAR(created_at)) as xaxis_label, YEAR(created_at) AS y, MONTH(created_at) AS m, MONTHNAME(created_at) AS month_name, COUNT(id) AS number_of_orders, SUM(total) AS total FROM orders where supplier_id = 1 GROUP BY y, m , month_name, xaxis_label ORDER BY y,m

--- What is the trend of traffic on scanwich
SELECT concat(SUBSTR(MONTHNAME(created_at),1,3),' ',YEAR(created_at)) as xaxis_label,YEAR(created_at) AS y, MONTH(created_at) AS m, MONTHNAME(created_at) AS month_name, COUNT(id) AS number_of_hits FROM visitor_logs  GROUP BY y, m , month_name,xaxis_label ORDER BY y,m 

