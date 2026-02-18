-- Supabase Database Setup Script
-- Project: Portfolio CMS

-- 1. Enable Extensions
create extension if not exists "uuid-ossp";

-- 2. Profiles Table (Admin Only)
create table profiles (
id uuid primary key references auth.users(id) on delete cascade,
email text,
role text default 'admin',
created_at timestamp with time zone default timezone('utc', now())
);

-- 3. Projects Table
create table projects (
id uuid primary key default uuid_generate_v4(),
title text not null,
slug text unique not null,
description text,
role text,
category text,
thumbnail_url text,
tags text[],
link text default '#',
case_study jsonb default '{ "challenge": "", "solution": "", "impact": "" }',
pinned boolean default false,
order_index integer default 0,
created_at timestamp with time zone default timezone('utc', now())
);

-- 4. Skills Table
create table skills (
id uuid primary key default uuid_generate_v4(),
name text not null,
category text, -- frontend, backend, database, etc.
proficiency integer default 3,
order_index integer default 0,
created_at timestamp with time zone default timezone('utc', now())
);

-- 5. Certifications Table
create table certifications (
id uuid primary key default uuid_generate_v4(),
title text not null,
issuer text,
issue_date text,
description text,
credential_url text default '#',
order_index integer default 0,
created_at timestamp with time zone default timezone('utc', now())
);

-- 6. Research Papers Table
create table research_papers (
id uuid primary key default uuid_generate_v4(),
title text not null,
abstract text,
full_content text,
pdf_url text,
supervisor text,
publication_status text,
order_index integer default 0,
created_at timestamp with time zone default timezone('utc', now())
);

-- 7. Sections Table (Dynamic Content)
create table sections (
id uuid primary key default uuid_generate_v4(),
section_name text not null, -- hero, about, etc.
section_type text not null, -- hero_main, about_story, etc.
content_json jsonb,
enabled boolean default true,
order_index integer default 0,
created_at timestamp with time zone default timezone('utc', now())
);

-- 8. Enable RLS
alter table projects enable row level security;
alter table skills enable row level security;
alter table certifications enable row level security;
alter table research_papers enable row level security;
alter table sections enable row level security;
alter table profiles enable row level security;

-- 9. Public Read Access
create policy "Public read projects" on projects for select using (true);
create policy "Public read skills" on skills for select using (true);
create policy "Public read certifications" on certifications for select using (true);
create policy "Public read research" on research_papers for select using (true);
create policy "Public read sections" on sections for select using (true);

-- 10. Admin Full Access (Authenticated only)
create policy "Admin access projects" on projects for all using (auth.role() = 'authenticated');
create policy "Admin access skills" on skills for all using (auth.role() = 'authenticated');
create policy "Admin access certifications" on certifications for all using (auth.role() = 'authenticated');
create policy "Admin access research" on research_papers for all using (auth.role() = 'authenticated');
create policy "Admin access sections" on sections for all using (auth.role() = 'authenticated');
create policy "Admin access profiles" on profiles for all using (auth.role() = 'authenticated');

-- 11. Initial Admin Setup Instructions
/\*
To set up your master admin account:

1. Go to your Supabase Project -> Authentication -> Users
2. Click "Add User" -> "Create new user"
3. Use the following credentials:
   - Email: anirbaansarkar@example.com (or your preferred email)
   - Password: anirbaansarkar
4. After creating the user, copy their User ID (UUID).
5. Run the following SQL to link them to the admin profile:

INSERT INTO profiles (id, email, role)
VALUES ('PASTE_USER_UUID_HERE', 'anirbaansarkar@example.com', 'admin');
\*/
