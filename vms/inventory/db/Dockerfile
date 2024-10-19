# Use the penultimate stable version of Alpine
FROM alpine:3.16

# Install PostgreSQL
RUN apk add --no-cache postgresql postgresql-contrib

# Set environment variables
ENV POSTGRES_USER=${INVENTORY_DB_USER}
ENV POSTGRES_PASSWORD=${INVENTORY_DB_PASSWORD}
ENV POSTGRES_DB=${INVENTORY_DB_NAME}

# Expose the PostgreSQL port
EXPOSE 5432

# Initialize database and run PostgreSQL
CMD ["sh", "-c", "pg_ctl init && pg_ctl start"]
