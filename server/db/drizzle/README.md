# Customer Search with Drizzle ORM

This module provides fast customer search capabilities using PostgreSQL and Drizzle ORM.

## Features

- **Full-text search** using PostgreSQL's built-in search capabilities
- **Optimised indexes** for customer account, postcode, name, and contact details
- **Automatic sync** from Oracle MAGINUS database
- **Composite search** across customer, address, and contact information

## Database Schema

The `customer_search` table combines data from multiple Oracle tables:
- `MAGINUS.CUSTOMER` - Core customer information
- `MAGINUS.CUSTOMER_ADDRESS` - Address details
- `MAGINUS.CUSTOMER_CONTACT` - Contact information

### Key Features

1. **Automatic Search Vector**: The `search_vector` field is automatically maintained via PostgreSQL triggers
2. **GIN Index**: Full-text search uses PostgreSQL's GIN index for optimal performance
3. **Composite Indexes**: Multiple indexes for different search patterns
4. **Status Filtering**: Built-in filtering for active/withdrawn customers

## API Endpoints

### Search Customers
```
GET /api/customer-search?q=search_term&limit=50
```

### Get Single Customer
```
GET /api/customer-search/[customerAccount]
```

### Sync Data
```
POST /api/customer-search/sync
Body: { customerAccount?: string } // Optional: sync single customer
```

## Usage

### Setup Database
1. Start PostgreSQL (via Docker Compose)
2. Run migration: `npm run db:migrate`
3. Sync data: `POST /api/customer-search/sync`

### Search Examples
- Search by name: `?q=Smith`
- Search by postcode: `?q=SW1A`
- Search by email: `?q=john@example.com`
- Search by account: `?q=CUST001`

### Full-text Search
The system supports sophisticated search queries:
- Multiple terms: `?q=John Smith London`
- Partial matches: `?q=Smi` (finds Smith)
- Cross-field search: `?q=CUST001 London` (account + location)

## Performance

- **Indexes**: 10+ specialised indexes for different search patterns
- **Full-text**: PostgreSQL tsvector with GIN index
- **Fallback**: LIKE queries if full-text search fails
- **Caching**: Consider adding Redis caching for frequent searches

## Monitoring

Use Drizzle Studio to monitor:
```bash
npm run db:studio
```

View in pgAdmin:
- Table structure and indexes
- Query performance via EXPLAIN
- Search vector content