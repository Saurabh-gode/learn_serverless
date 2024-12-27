CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"first_name" text,
	"last_name" text,
	"created_at" timestamp DEFAULT now(),
	"description" text
);
