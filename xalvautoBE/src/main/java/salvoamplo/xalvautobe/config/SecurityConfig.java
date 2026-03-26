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

                        .requestMatchers(HttpMethod.GET, "/auth/test").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/admin-login").permitAll()

                        .requestMatchers("/contatti/**").permitAll()

                        .requestMatchers(HttpMethod.GET, "/auto/**").permitAll()

                        .requestMatchers(HttpMethod.GET, "/noleggio/**").permitAll()

                        .requestMatchers(HttpMethod.POST, "/prenotazioni-noleggio").permitAll()

                        // REVIEWS PUBBLICHE
                        .requestMatchers(HttpMethod.GET, "/reviews/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/reviews/**").permitAll()

                        .requestMatchers(HttpMethod.GET, "/prenotazioni-noleggio").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/prenotazioni-noleggio/non-lette").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/prenotazioni-noleggio/non-lette/count").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/prenotazioni-noleggio/segna-tutte-lette").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/prenotazioni-noleggio/*/letta").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/prenotazioni-noleggio/*/annulla").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/prenotazioni-noleggio/*/concludi").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/auto/upload").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/auto/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/auto/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/noleggio/upload").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/noleggio/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/noleggio/**").hasRole("ADMIN")

                        .anyRequest().permitAll()
                )
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}