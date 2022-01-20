# Re Generates the client library in the frontend project
# -Xmx9000m
java -Xmx9000m -jar ./swagger-codegen-cli.jar generate -i ./public/swagger/swagger.yaml -l typescript-axios -o ../frontend/src/swagger --additional-properties modelPropertyNaming=original,supportsES6=true

# cd ../beyondskool-react
# ./sanitize-swagger.sh