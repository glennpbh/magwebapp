-- Create customer_search table
CREATE TABLE IF NOT EXISTS "customer_search" (
	"customer_account" varchar(10) PRIMARY KEY NOT NULL,
	"customer_name" varchar(100) NOT NULL,
	"sales_office" varchar(6) NOT NULL,
	"address_1" varchar(100),
	"address_2" varchar(100),
	"address_3" varchar(100),
	"address_4" varchar(100),
	"address_5" varchar(100),
	"address_6" varchar(100),
	"postcode" varchar(20),
	"country_code" varchar(6),
	"contact_name" varchar(100),
	"telephone" varchar(30),
	"mobile" varchar(30),
	"email" varchar(256),
	"vat_reg_num" varchar(15),
	"company_reg_num" varchar(20),
	"rep_code" varchar(20),
	"status" varchar(20) DEFAULT 'Active' NOT NULL,
	"prospect_cust_type" varchar(10) DEFAULT 'Customer' NOT NULL,
	"withdrawn" varchar(10) DEFAULT 'Active' NOT NULL,
	"search_vector" text,
	"last_synced" timestamp DEFAULT now() NOT NULL,
	"synced_from" varchar(20) DEFAULT 'Oracle' NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "idx_customer_search_account" ON "customer_search" ("customer_account");
CREATE INDEX IF NOT EXISTS "idx_customer_search_postcode" ON "customer_search" ("postcode");
CREATE INDEX IF NOT EXISTS "idx_customer_search_name" ON "customer_search" ("customer_name");
CREATE INDEX IF NOT EXISTS "idx_customer_search_sales_office" ON "customer_search" ("sales_office");
CREATE INDEX IF NOT EXISTS "idx_customer_search_email" ON "customer_search" ("email");
CREATE INDEX IF NOT EXISTS "idx_customer_search_telephone" ON "customer_search" ("telephone");
CREATE INDEX IF NOT EXISTS "idx_customer_search_mobile" ON "customer_search" ("mobile");
CREATE INDEX IF NOT EXISTS "idx_customer_search_name_postcode" ON "customer_search" ("customer_name","postcode");
CREATE INDEX IF NOT EXISTS "idx_customer_search_office_status" ON "customer_search" ("sales_office","status");

-- Full-text search index (GIN index for tsvector)
CREATE INDEX IF NOT EXISTS "idx_customer_search_vector" ON "customer_search" USING gin (to_tsvector('english', search_vector)) WHERE search_vector IS NOT NULL;

-- Function to automatically update search_vector
CREATE OR REPLACE FUNCTION update_customer_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := 
        COALESCE(NEW.customer_account, '') || ' ' ||
        COALESCE(NEW.customer_name, '') || ' ' ||
        COALESCE(NEW.sales_office, '') || ' ' ||
        COALESCE(NEW.address_1, '') || ' ' ||
        COALESCE(NEW.address_2, '') || ' ' ||
        COALESCE(NEW.address_3, '') || ' ' ||
        COALESCE(NEW.address_4, '') || ' ' ||
        COALESCE(NEW.address_5, '') || ' ' ||
        COALESCE(NEW.address_6, '') || ' ' ||
        COALESCE(NEW.postcode, '') || ' ' ||
        COALESCE(NEW.country_code, '') || ' ' ||
        COALESCE(NEW.contact_name, '') || ' ' ||
        COALESCE(NEW.telephone, '') || ' ' ||
        COALESCE(NEW.mobile, '') || ' ' ||
        COALESCE(NEW.email, '') || ' ' ||
        COALESCE(NEW.vat_reg_num, '') || ' ' ||
        COALESCE(NEW.company_reg_num, '') || ' ' ||
        COALESCE(NEW.rep_code, '');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update search_vector on insert/update
CREATE TRIGGER trigger_update_customer_search_vector
    BEFORE INSERT OR UPDATE ON customer_search
    FOR EACH ROW
    EXECUTE FUNCTION update_customer_search_vector();

-- Create additional helpful indexes for performance
CREATE INDEX IF NOT EXISTS "idx_customer_search_status_withdrawn" ON "customer_search" ("status", "withdrawn") WHERE status = 'Active' AND withdrawn = 'Active';
CREATE INDEX IF NOT EXISTS "idx_customer_search_last_synced" ON "customer_search" ("last_synced");

-- Comments for documentation
COMMENT ON TABLE "customer_search" IS 'Optimised customer search table with full-text search capabilities';
COMMENT ON COLUMN "customer_search"."search_vector" IS 'Automatically maintained full-text search field containing all searchable customer data';
COMMENT ON COLUMN "customer_search"."last_synced" IS 'Timestamp of last synchronisation from Oracle source system';
COMMENT ON INDEX "idx_customer_search_vector" IS 'GIN index for full-text search on customer data';