DO $$ BEGIN
 CREATE TYPE "job_prefix" AS ENUM('jr', 'sr', 'lead', 'manager', 'staff', 'intern', 'contractor', 'other', '--');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "job_interests" AS ENUM('Software Engineer', 'Full Stack Engineer', 'Backend Engineer', 'Frontend Engineer', 'DevOps Engineer', 'Data Engineer', 'Data Scientist', 'Machine Learning Engineer', 'QA Engineer', 'Mobile Engineer', 'Security Engineer', 'Product Manager', 'Project Manager', 'Technical Program Manager', 'UX Designer', 'UI Designer', 'UI/UX Designer', 'Recruiter', 'Other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "session_type" AS ENUM('web', 'mobile');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "skills_name_enum" AS ENUM('JavaScript', 'TypeScript', 'NestJs', 'TailwindCss', 'Material UI', 'Sass', 'Bootstrap', 'Chakra UI', 'Less', 'NextJs', 'ReactJs', 'PostgreSQL', 'MySQL', 'Sqlite', 'MongoDB', 'Redis', 'Firebase', 'Supabase', 'GraphQL', 'Apollo', 'Hasura', 'CockroachDB', 'FaunaDB', 'ScyllaDB', 'React Native', 'VueJs', 'Angular', 'Angular 2', 'Qwik', 'Svelte', 'Svelte Kit', 'NuxtJs', 'Express', 'Remix Js', 'Deno', 'Other', 'Solid Js', 'Solid start', 'NodeJs', 'AWS', 'Azure', 'Google Cloud', 'Heroku', 'Vercel', 'Netlify', 'Digital Ocean', 'Linode', 'Cloudflare', 'Cloudinary', 'Fastly', 'C', 'C++', 'C#', 'ASP .Net', 'Entity Framework', 'Springboot', 'Maven', 'Gradle', 'Java', 'Python', 'Django', 'Flask', 'FastAPI', 'Ruby on Rails', 'Laravel', 'Ruby', 'PHP', 'SQL', 'HTML', 'CSS', 'Swift', 'Swift UI', 'Kotlin', 'Go', 'Rust', 'Scala', 'Perl', 'Haskell', 'Lua', 'R', 'Matlab', 'Assembly', 'Objective-C', 'Visual Basic', 'Dart', 'Elixir', 'Clojure', 'Groovy', 'Julia', 'F#', 'Erlang', 'Bash', 'PowerShell', 'OCaml', 'Scheme', 'VimL', 'Apex', 'Arduino', 'Crystal', 'D', 'Docker', 'Kubernetes', 'Helm', 'Git', 'Jira', 'Trello', 'Nim', 'Pascal');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "user_title" AS ENUM('Backend Engineer', 'Cloud Architect', 'Cloud Engineer', 'Cybersecurity Engineer', 'Data Analyst', 'Data Engineer', 'Data Scientist', 'Database Administrator', 'DevOps Engineer', 'Embedded Systems Engineer', 'Frontend Engineer', 'Full Stack Engineer', 'IT Manager', 'Machine Learning Engineer', 'Mobile App Developer', 'Network Engineer', 'Other', 'Product Manager', 'QA Engineer', 'Site Reliability Engineer', 'Software Architect', 'Software Engineer', 'Systems Administrator', 'Systems Analyst', 'UI/UX Designer', 'Web Developer', 'title');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "user_role" AS ENUM('company_user', 'standard_user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "applications_and_files" (
	"application_id" uuid NOT NULL,
	"file_id" uuid NOT NULL,
	CONSTRAINT applications_and_files_file_id_application_id PRIMARY KEY("file_id","application_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "applications_and_skills" (
	"application_id" uuid NOT NULL,
	"skill_id" uuid NOT NULL,
	CONSTRAINT applications_and_skills_application_id_skill_id PRIMARY KEY("application_id","skill_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "applications" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"job_post_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companies_and_jobs" (
	"company_id" uuid NOT NULL,
	"job_post_id" uuid NOT NULL,
	CONSTRAINT companies_and_jobs_company_id_job_post_id PRIMARY KEY("company_id","job_post_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "companies_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"file_name" text NOT NULL,
	"file_url" text NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_title" text NOT NULL,
	"job_prefix" "job_prefix" NOT NULL,
	"other_title" text,
	"description" text NOT NULL,
	"salary" text[],
	"company_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"archived_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_posts_and_skills" (
	"job_post_id" uuid NOT NULL,
	"skill_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"interested_in" job_interests[],
	"user_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_and_skills" (
	"profile_id" uuid NOT NULL,
	"skill_id" uuid NOT NULL,
	CONSTRAINT users_and_skills_profile_id_skill_id PRIMARY KEY("profile_id","skill_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "session_type" NOT NULL,
	"refresh_token" text NOT NULL,
	"expiration" timestamp NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"skill_name" "skills_name_enum" NOT NULL,
	"other_name" text,
	CONSTRAINT "skills_other_name_unique" UNIQUE("other_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" "user_title" DEFAULT 'title',
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"avatar" text,
	"boosts" smallint DEFAULT 3 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"first_time_login" boolean DEFAULT true NOT NULL,
	"role" "user_role" DEFAULT 'standard_user' NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_and_applications" (
	"user_id" uuid NOT NULL,
	"application_id" uuid NOT NULL,
	"applied_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT users_and_applications_user_id_application_id PRIMARY KEY("user_id","application_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_and_companies" (
	"user_id" uuid NOT NULL,
	"company_id" uuid NOT NULL,
	CONSTRAINT users_and_companies_user_id_company_id PRIMARY KEY("user_id","company_id")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_index" ON "companies" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "file_name_on_user_id" ON "files" ("file_name","user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "job_title_index" ON "job_posts" ("job_prefix","other_title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_index" ON "users" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "active_index" ON "users" ("is_active");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "boosts_index" ON "users" ("boosts");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications_and_files" ADD CONSTRAINT "applications_and_files_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications_and_files" ADD CONSTRAINT "applications_and_files_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications_and_skills" ADD CONSTRAINT "applications_and_skills_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications_and_skills" ADD CONSTRAINT "applications_and_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications" ADD CONSTRAINT "applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications" ADD CONSTRAINT "applications_job_post_id_job_posts_id_fk" FOREIGN KEY ("job_post_id") REFERENCES "job_posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "companies_and_jobs" ADD CONSTRAINT "companies_and_jobs_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "companies_and_jobs" ADD CONSTRAINT "companies_and_jobs_job_post_id_job_posts_id_fk" FOREIGN KEY ("job_post_id") REFERENCES "job_posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "files" ADD CONSTRAINT "files_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_posts" ADD CONSTRAINT "job_posts_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_posts_and_skills" ADD CONSTRAINT "job_posts_and_skills_job_post_id_job_posts_id_fk" FOREIGN KEY ("job_post_id") REFERENCES "job_posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_posts_and_skills" ADD CONSTRAINT "job_posts_and_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_and_skills" ADD CONSTRAINT "users_and_skills_profile_id_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_and_skills" ADD CONSTRAINT "users_and_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_and_applications" ADD CONSTRAINT "users_and_applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_and_applications" ADD CONSTRAINT "users_and_applications_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_and_companies" ADD CONSTRAINT "users_and_companies_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_and_companies" ADD CONSTRAINT "users_and_companies_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
