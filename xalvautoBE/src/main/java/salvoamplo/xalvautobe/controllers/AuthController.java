package salvoamplo.xalvautobe.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import salvoamplo.xalvautobe.payloads.AdminLoginRequest;
import salvoamplo.xalvautobe.payloads.AdminLoginResponse;
import salvoamplo.xalvautobe.services.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtService jwtService;

    @Value("${ADMIN_EMAIL}")
    private String adminEmail;

    @Value("${PASS}")
    private String adminPassword;

    public AuthController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public AdminLoginResponse login(@RequestBody AdminLoginRequest request) {
        if (!"salvatoreamplo@gmail.com".equals(request.getEmail()) || !"salvo434".equals(request.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenziali non valide");
        }

        String token = jwtService.generateToken(request.getEmail());
        return new AdminLoginResponse(token);
    }
}