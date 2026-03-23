package salvoamplo.xalvautobe.controllers;

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

    public AuthController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public AdminLoginResponse login(@RequestBody AdminLoginRequest request) {

        String email = request.getEmail() == null ? "" : request.getEmail().trim();
        String password = request.getPassword() == null ? "" : request.getPassword().trim();

        System.out.println("EMAIL RICEVUTA = [" + email + "]");
        System.out.println("PASSWORD RICEVUTA = [" + password + "]");

        if (!"salvatoreamplo@gmail.com".equalsIgnoreCase(email) || !"salvo434".equals(password)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenziali non valide");
        }

        String token = jwtService.generateToken(email);
        return new AdminLoginResponse(token);
    }
}