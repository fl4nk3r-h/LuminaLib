# Environment Variables Setup

This application uses environment variables to secure sensitive credentials.

## Quick Setup

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your actual credentials:**
   ```bash
   nano .env  # or use your preferred editor
   ```

3. **Update the values:**
   ```env
   DB_USERNAME=your_mysql_username
   DB_PASSWORD=your_mysql_password
   JWT_SECRET=your_generated_secret_key
   ```

## Generate JWT Secret

Generate a secure JWT secret key:

```bash
# Using OpenSSL
openssl rand -base64 64

# Or using Python
python3 -c "import secrets; print(secrets.token_hex(32))"
```

## Running the Application

### Option 1: Using Spring Boot with .env file

Install `spring-boot-dotenv` dependency (already configured):

```bash
./mvnw spring-boot:run
```

### Option 2: Using System Environment Variables

**Linux/Mac:**
```bash
export DB_USERNAME=your_username
export DB_PASSWORD=your_password
export JWT_SECRET=your_secret
./mvnw spring-boot:run
```

**Windows (PowerShell):**
```powershell
$env:DB_USERNAME="your_username"
$env:DB_PASSWORD="your_password"
$env:JWT_SECRET="your_secret"
.\mvnw.cmd spring-boot:run
```

### Option 3: IntelliJ IDEA

1. Run → Edit Configurations
2. Add Environment Variables:
   - `DB_USERNAME=your_username`
   - `DB_PASSWORD=your_password`
   - `JWT_SECRET=your_secret`

### Option 4: VS Code

Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "java",
      "name": "Spring Boot App",
      "request": "launch",
      "mainClass": "com.fl4nk3r.luminalib.LuminalibApplication",
      "env": {
        "DB_USERNAME": "your_username",
        "DB_PASSWORD": "your_password",
        "JWT_SECRET": "your_secret"
      }
    }
  ]
}
```

## Production Deployment

For production, set environment variables on your server:

**Docker:**
```dockerfile
ENV DB_USERNAME=prod_user
ENV DB_PASSWORD=prod_password
ENV JWT_SECRET=prod_secret
```

**Kubernetes:**
```yaml
env:
  - name: DB_USERNAME
    valueFrom:
      secretKeyRef:
        name: db-secret
        key: username
```

**Cloud Platforms:**
- AWS: Use AWS Secrets Manager or Parameter Store
- Azure: Use Azure Key Vault
- Heroku: Set Config Vars in dashboard
- Railway: Set Environment Variables in settings

## Security Best Practices

✅ **DO:**
- Keep `.env` in `.gitignore`
- Use different credentials for dev/prod
- Rotate JWT secrets regularly
- Use strong, random passwords

❌ **DON'T:**
- Commit `.env` to Git
- Share credentials in chat/email
- Use default passwords in production
- Hardcode secrets in code

## Troubleshooting

**Environment variables not loading?**

1. Check `.env` file exists and is in project root
2. Verify Spring Boot Dotenv dependency is installed
3. Ensure no spaces around `=` in `.env`
4. Check file is named exactly `.env` (not `.env.txt`)

**Database connection failed?**

1. Verify MySQL is running: `sudo systemctl status mysql`
2. Check credentials in `.env` are correct
3. Ensure database exists or `createDatabaseIfNotExist=true` is set
4. Verify MySQL port 3306 is accessible
