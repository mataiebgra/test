SELECT table_name
  FROM information_schema.tables
 WHERE table_schema='main'
   AND table_type='BASE TABLE';
