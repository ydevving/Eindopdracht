package com.itvitae.Eindopdracht.Controller;

import com.itvitae.Eindopdracht.Annotation.Auth;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins = {"http://localhost:5173"}, methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE
})
public class TestController {
    // USER role needs to be able to acces it, without USER access denied
    @GetMapping("/home")
    @Auth(admin = false)
    public ResponseEntity<String> handleWelcomeUser() {
        System.out.println("/Home");
        return new ResponseEntity<>("Hello World!", HttpStatus.CREATED);
    }

    // ADMIN role can access this role
    @GetMapping("/admin")
    @Auth(admin = true)
    public ResponseEntity<String> handleWelcomeAdmin() {
        System.out.println("/admin");
        return new ResponseEntity<>("Welcome, admin!", HttpStatus.OK);
    }

    // Any user can access this
    @GetMapping("/ping")
    public String pingPong() {
        return "Pong!";
    }
}
