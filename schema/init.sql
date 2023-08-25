CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(220) NOT NULL,
  `username` varchar(255) DEFAULT '',
  `state` varchar(255) DEFAULT 'start',
  `balance` decimal(10,2) DEFAULT 0.00,
  `binomo_id` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `deals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(220) NOT NULL,
  `successful_deal` tinyint(1) DEFAULT 0,
  `unsuccsesfull_deal` tinyint(1) DEFAULT 0,
  `currency_pair` varchar(255) DEFAULT '',
  `signal_date` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;