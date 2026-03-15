package salvoamplo.xalvautobe.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers("/auth/**").permitAll()

                        // AUTO pubbliche
                        .requestMatchers(HttpMethod.GET, "/auto/**").permitAll()

                        // NOLEGGIO pubblico
                        .requestMatchers(HttpMethod.GET, "/noleggio/**").permitAll()

                        // AUTO admin
                        .requestMatchers(HttpMethod.POST, "/auto/upload").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/auto/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/auto/**").hasRole("ADMIN")

                        // NOLEGGIO admin
                        .requestMatchers(HttpMethod.POST, "/noleggio/upload").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/noleggio/**").hasRole("ADMIN")

                        .anyRequest().authenticated()
                )
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}