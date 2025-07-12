# PostgreSQL Database Setup Guide

## Option 1: Free Cloud Database (Recommended for Demo)

### Using Neon (Free Tier)
1. Go to [neon.tech](https://neon.tech)
2. Sign up for a free account
3. Create a new project
4. Copy your connection string
5. Update your `.env` file:
   ```env
   DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"
   ```

### Using Supabase (Free Tier)
1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project
4. Go to Settings > Database
5. Copy your connection string
6. Update your `.env` file:
   ```env
   DATABASE_URL="postgresql://postgres:[password]@[host]:5432/postgres"
   ```

## Option 2: Local PostgreSQL Installation

### Windows
1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Install with default settings
3. Create a database:
   ```sql
   CREATE DATABASE bountyboard;
   ```
4. Update your `.env` file:
   ```env
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/bountyboard"
   ```

### macOS
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql

# Create database
createdb bountyboard
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database
sudo -u postgres createdb bountyboard
```

## Setup Commands

After setting up your database and `.env` file:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database with sample data
npm run db:seed

# Start the development server
npm run dev
```

## Troubleshooting

### Connection Issues
- Make sure your database is running
- Check your connection string format
- Verify firewall settings
- For cloud databases, ensure SSL is enabled

### Permission Issues
- Make sure your database user has proper permissions
- For local installations, check PostgreSQL authentication settings

### Common Error: "relation does not exist"
- Run `npm run db:push` to create tables
- Run `npm run db:seed` to add sample data 