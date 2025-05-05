# Use official Python image
FROM python:3.9

# Set working directory inside container
WORKDIR /app

# Copy all files to container
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose Flask's default port
EXPOSE 5000

# Run Flask app
CMD ["python", "main.py"]

