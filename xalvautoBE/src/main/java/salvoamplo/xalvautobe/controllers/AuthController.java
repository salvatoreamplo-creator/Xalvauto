package salvoamplo.xalvautobe.controllers;

import org.springframework.web.bind.annotation.*;
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
        throw new RuntimeException("SONO NEL CONTROLLER NUOVO");
    }
}