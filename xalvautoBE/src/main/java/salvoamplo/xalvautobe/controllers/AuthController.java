package salvoamplo.xalvautobe.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
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

    @GetMapping("/test")
    public String test() {
        return "AUTH_OK_123";
    }

    @PostMapping("/admin-login")
    public AdminLoginResponse login(@RequestBody AdminLoginRequest request) {
        System.out.println(">>> SONO ENTRATO IN /auth/admin-login");
        System.out.println("EMAIL: [" + request.getEmail() + "]");
        System.out.println("PASSWORD: [" + request.getPassword() + "]");

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "TEST123456789");
    }
}