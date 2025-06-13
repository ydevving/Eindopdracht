package com.itvitae.Eindopdracht.Controller;

import com.itvitae.Eindopdracht.Annotation.Auth;
import com.itvitae.Eindopdracht.DTO.RegisterForm;
import com.itvitae.Eindopdracht.DTO.UserInfoDTO;
import com.itvitae.Eindopdracht.Model.Item;
import com.itvitae.Eindopdracht.Model.User;
import com.itvitae.Eindopdracht.Service.AuthenticationService;
import com.itvitae.Eindopdracht.Service.ItemService;
import com.itvitae.Eindopdracht.Service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.itvitae.Eindopdracht.DTO.LoginResponseDTO;
import com.itvitae.Eindopdracht.DTO.LoginForm;
import com.itvitae.Eindopdracht.DTO.UserDTO;

import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {"*"}, methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE
})
@Tag(name = "User Management", description = "APIs for managing users")
public class UserController {

    UserService userService;
    ItemService itemService;
    AuthenticationService authService;

    public UserController(
            UserService userService,
            ItemService itemService,
            AuthenticationService authService
    ) {
        this.userService = userService;
        this.itemService = itemService;
        this.authService = authService;
    }

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

        if (!user.get().getPassword().equals(password))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

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

    @GetMapping("/search/{username}")
    @Auth
    public ResponseEntity userExists(@RequestParam String username) {
        Optional<User> _user = this.userService.exists(username);

        if (_user.isEmpty())
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok().build();
    }

    @GetMapping("/info")
    @Auth
    public ResponseEntity<UserDTO> getOwnInformation(@RequestHeader("Authorization") String token) {
        Optional<User> _user = this.authService.retrieveUserFromToken(token);

        if (_user.isEmpty())
            return ResponseEntity.badRequest().build();

        User user = _user.get();

        return ResponseEntity.ok().body(new UserDTO(user.getUsername(), user.getEmail(), user.getCity(), user.getAddress()));
    }

    @GetMapping("/admin/info/{username}")
    @Auth(requiresAdmin = true)
    public ResponseEntity<UserInfoDTO> getInformation(@PathVariable String username) {
        Optional<User> _user = this.userService.exists(username);

        if (_user.isEmpty())
            return ResponseEntity.badRequest().build();

        User user = _user.get();

        return ResponseEntity.ok().body(new UserInfoDTO(user.getEmail(), user.getCity(), user.getAddress()));
    }
}
