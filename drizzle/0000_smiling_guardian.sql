CREATE TABLE `users` (
	`id` varchar(26) NOT NULL,
	`google_id` varchar(50) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255),
	`status` tinyint NOT NULL DEFAULT 1,
	`role` enum('admin','user') NOT NULL DEFAULT 'user',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp DEFAULT null,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `options` (
	`id` varchar(26) NOT NULL,
	`text` varchar(255) NOT NULL,
	`pollId` varchar(26) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `options_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `polls` (
	`id` varchar(26) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` varchar(1000),
	`user` varchar(26) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp DEFAULT null,
	CONSTRAINT `polls_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `votes` (
	`id` varchar(26) NOT NULL,
	`user_id` varchar(26) NOT NULL,
	`option_id` varchar(26) NOT NULL,
	`poll_id` varchar(26) NOT NULL,
	`voted_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `uq_vote_user_poll_option` UNIQUE(`user_id`,`option_id`,`poll_id`)
);
--> statement-breakpoint
ALTER TABLE `options` ADD CONSTRAINT `options_pollId_polls_id_fk` FOREIGN KEY (`pollId`) REFERENCES `polls`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `polls` ADD CONSTRAINT `polls_user_users_id_fk` FOREIGN KEY (`user`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `votes` ADD CONSTRAINT `votes_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `votes` ADD CONSTRAINT `votes_option_id_options_id_fk` FOREIGN KEY (`option_id`) REFERENCES `options`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `votes` ADD CONSTRAINT `votes_poll_id_polls_id_fk` FOREIGN KEY (`poll_id`) REFERENCES `polls`(`id`) ON DELETE no action ON UPDATE no action;