CREATE TABLE `users` (
	`id` varchar(26) NOT NULL,
	`google_id` varchar(50) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`status` tinyint NOT NULL DEFAULT 1,
	`role` enum('admin','user') NOT NULL DEFAULT 'user',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp DEFAULT null,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
