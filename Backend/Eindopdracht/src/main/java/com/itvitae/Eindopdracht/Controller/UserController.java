package com.itvitae.Eindopdracht.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.itvitae.Eindopdracht.DTO.LoginResponseDTO;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {"http://localhost:5173"}, methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE
})
public class UserController {
    @GetMapping("/login")
    public ResponseEntity<LoginResponseDTO> login() {
        ResponseEntity<LoginResponseDTO> response = ResponseEntity.ok(
                new LoginResponseDTO("token")
        );

        return response;
    }
}
