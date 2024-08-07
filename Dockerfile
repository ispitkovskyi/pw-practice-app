from mcr.microsoft.com/playwright:v1.45.3-jammy

#Create directory for test framework and copy all the files there. Make that directory default for Docker
RUN mkdir /app
WORKDIR /app
COPY . /app/

# Install dependencies from the package.json file:
RUN npm install --force
# Install all required browser needed for Playwright
RUN npx playwright install