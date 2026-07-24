package com.alibou.book.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.stereotype.Service;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Alibou",
                        email = "contact@alibou.com",
                        url = "https://alibou.com/courses"
                ),
                description = "OpenApi documentation for Spring security",
                title = "OpenAPI specification - Alibou",
                version = "1.0",
                license = @License(
                        name = "Licence name",
                        url = "https"
                ),
                termsOfService = "Terms of Service"
        ),
        servers = {
                @Server(
                        description = "local env",
                        url = "http://localhost:8088/api/v1"
                ),
                @Server(
                        description = "Prod env",
                        url = "https://prod.com"
                )
        }, security = {
        @SecurityRequirement(
                name = "bearerAuth"
        )
}
)
@SecurityScheme(
        name = "bearerAuth",
        description = "JWT auth description",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {

}
