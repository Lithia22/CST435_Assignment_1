# FROM maven:3.8.8-eclipse-temurin-17 AS build
# WORKDIR /app
# COPY . .
# RUN mvn clean compile

# FROM eclipse-temurin:17-jre
# WORKDIR /app
# COPY --from=build /app/target/classes ./target/classes
# EXPOSE 50055
# CMD ["java", "-cp", "target/classes", "svc.App"]

FROM maven:3.8.8-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean compile 
RUN mvn dependency:copy-dependencies -DincludeScope=compile

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/classes ./target/classes
COPY --from=build /app/target/dependency ./target/dependency
EXPOSE 50055
CMD ["java", "-cp", "target/classes:target/dependency/*", "svc.App"]