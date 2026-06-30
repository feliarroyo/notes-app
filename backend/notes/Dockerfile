# --- Stage 1: Build the Java Jar ---
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /notes

# Copy the build configuration files first to leverage Docker caching
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code and compile the executable
COPY src ./src
RUN mvn clean package -DskipTests

# --- Stage 2: Run the Executable ---
FROM eclipse-temurin:17-jre-alpine
WORKDIR /notes

# Copy the compiled jar from the build stage
COPY --from=build /notes/target/*.jar app.jar

EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]