DROP TABLE IF EXISTS progress;

CREATE TABLE progress (
  id VARCHAR(30) AUTO_INCREMENT  PRIMARY KEY,
  task_id VARCHAR(30) NOT NULL,
  user_id VARCHAR(30) NOT NULL,
  completed INT DEFAULT NULL
);

INSERT INTO billionaires (task_id, user_id, completed) VALUES
  ('Aliko', 'Dangote', 0),
  ('Bill', 'Gates', 30),
  ('Folrunsho', 'Alakija', 'Billionaire Oil Magnate');