# Create a volume 
docker volume create atlas-ke-vol

# Build the image
docker build -t atlas-ke .

# Run the image with the volume
docker run -v atlas-ke-vol:/app -p 3000:3000 atlas-ke
