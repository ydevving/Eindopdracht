package com.itvitae.Eindopdracht.Aspect;

import com.itvitae.Eindopdracht.Model.User;
import com.itvitae.Eindopdracht.Repository.UserRepository;
import com.itvitae.Eindopdracht.Service.AuthenticationService;
import com.itvitae.Eindopdracht.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.itvitae.Eindopdracht.Annotation.Auth;
import com.itvitae.Eindopdracht.Service.AuthenticationService;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Optional;

@Aspect
@Component
public class AuthAspect {
    @Autowired
    private AuthenticationService authService;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private UserService userService;

    @Around("@annotation(auth)")
    public Object checkAuthorization(ProceedingJoinPoint joinPoint, Auth auth) throws Throwable {
        HttpServletRequest request = this.getCurrentHttpRequest();

        if (request == null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("No HTTP request found");

        String token = request.getHeader("Authorization");

        Optional<User> user = this.authService.retrieveUserFromToken(token);

        if (user.isEmpty())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        if (auth.admin() && !(this.authService.isAdmin(user.get())))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED);

        boolean isAuthorized = this.authService.authenticateUser(user.get());

        if (!isAuthorized)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED);

        return joinPoint.proceed();
    }

    private HttpServletRequest getCurrentHttpRequest() {
        ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        return attrs != null ? attrs.getRequest() : null;
    }
}
