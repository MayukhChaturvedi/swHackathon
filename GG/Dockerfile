# Use the JDK 17 image as the base image for build
FROM maven:3.9.9-eclipse-temurin-17 AS build

# Set the working directory
WORKDIR /app

# Copy the Maven wrapper files and source code into the container
COPY ./pom.xml ./
RUN mvn dependency:go-offline
COPY ./src ./src

# Build the application with Maven
RUN mvn clean package -DskipTests

# Use the same JDK 17 image for the runtime
FROM eclipse-temurin:17-jdk

# Set the working directory
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/GG-0.0.1-SNAPSHOT.jar ./GG-0.0.1-SNAPSHOT.jar

# Expose the port the application will run on
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "GG-0.0.1-SNAPSHOT.jar"]
