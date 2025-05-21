package com.itvitae.Eindopdracht.Controller;

import com.itvitae.Eindopdracht.DTO.RegisterForm;
import com.itvitae.Eindopdracht.Model.User;
import com.itvitae.Eindopdracht.Service.AuthenticationService;
import com.itvitae.Eindopdracht.Service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.itvitae.Eindopdracht.DTO.LoginResponseDTO;
import com.itvitae.Eindopdracht.DTO.LoginForm;

import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {"http://localhost:5173"}, methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE
})
@Tag(name = "User Management", description = "APIs for managing users")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    AuthenticationService authService;

    @Operation(summary = "Create a new user", description = "Add a new user to the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User logged in successfully",
                    content = @Content(schema = @Schema(implementation = LoginForm.class))),
            @ApiResponse(responseCode = "400", description = "Invalid username or password",
                    content = @Content(schema = @Schema())),
            @ApiResponse(responseCode = "404", description = "User does not exist in the Database",
                    content = @Content(schema = @Schema()))
    })
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginForm loginForm) {

        String username = loginForm.username();
        String password = loginForm.password();

        if (username.isBlank() || password.isBlank())
            return ResponseEntity.badRequest().body(new LoginResponseDTO(""));

        Optional<User> user = this.userService.exists(username);

        if (user.isEmpty())
            return ResponseEntity.notFound().build();

        String token = this.authService.add(user.get());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @Operation(summary = "Create a new user", description = "Add a new user to the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User created successfully",
                    content = @Content(schema = @Schema(implementation = RegisterForm.class))),
            @ApiResponse(responseCode = "400", description = "Username or email already exists",
                    content = @Content(schema = @Schema()))
    })
    @PostMapping("/register")
    public ResponseEntity<LoginResponseDTO> register(@RequestBody RegisterForm registerForm) {
        if (this.userService.exists(registerForm.username()).isPresent())
            return ResponseEntity.badRequest().body(new LoginResponseDTO("USERNAME"));

        if (this.userService.emailExists(registerForm.email()).isPresent())
            return ResponseEntity.badRequest().body(new LoginResponseDTO("EMAIL"));

        User createdUser = this.userService.createUser(registerForm);

        String token = this.authService.add(createdUser);

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }
}
