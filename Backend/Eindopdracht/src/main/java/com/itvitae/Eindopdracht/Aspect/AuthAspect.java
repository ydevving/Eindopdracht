package com.itvitae.Eindopdracht.Aspect;

import com.itvitae.Eindopdracht.Model.User;
import com.itvitae.Eindopdracht.Repository.UserRepository;
import com.itvitae.Eindopdracht.Service.AuthenticationService;
import com.itvitae.Eindopdracht.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.itvitae.Eindopdracht.Annotation.Auth;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Optional;

@Aspect
@Component
public class AuthAspect {

    private UserRepository userRepo;
    private AuthenticationService authService;
    private UserService userService;

    public AuthAspect(
            UserRepository userRepo,
            AuthenticationService authService,
            UserService userService
    ) {
        this.userRepo = userRepo;
        this.authService = authService;
        this.userService = userService;
    }

    @Around("@annotation(auth)")
    public Object checkAuthorization(ProceedingJoinPoint joinPoint, Auth auth) throws Throwable {
        HttpServletRequest request = this.getCurrentHttpRequest();

        if (request == null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        String token = request.getHeader("Authorization");

        Optional<User> user = this.authService.retrieveUserFromToken(token);

        if (user.isEmpty())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        if (auth.requiresAdmin() && !(this.authService.isAdmin(user.get())))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        boolean isAuthorized = this.authService.authenticateUser(user.get());

        if (!isAuthorized)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        return joinPoint.proceed();
    }

    private HttpServletRequest getCurrentHttpRequest() {
        ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        return attrs != null ? attrs.getRequest() : null;
    }
}
