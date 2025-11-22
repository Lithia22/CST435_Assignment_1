# FROM php:8.2-cli

# # Install gRPC extension
# RUN pecl install grpc && docker-php-ext-enable grpc

# WORKDIR /app
# COPY . .

# EXPOSE 50052
# CMD ["php", "-S", "0.0.0.0:50052", "server.php"]

# FROM bref/php-81-fpm

# WORKDIR /app
# COPY . .

# EXPOSE 50052
# CMD ["php", "-S", "0.0.0.0:50052", "server.php"]


FROM php:8.2-cli

WORKDIR /app
COPY . .

EXPOSE 50052
CMD ["php", "-S", "0.0.0.0:50052", "server.php"]