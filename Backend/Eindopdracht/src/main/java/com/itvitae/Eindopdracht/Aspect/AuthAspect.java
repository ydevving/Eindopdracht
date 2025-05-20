package com.itvitae.Eindopdracht.Aspect;

import com.itvitae.Eindopdracht.Service.AuthenticationService;
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

@Aspect
@Component
public class AuthAspect {
    @Autowired
    private AuthenticationService authenticationService;

    @Around("@annotation(auth)")
    public Object checkAuthorization(ProceedingJoinPoint joinPoint, Auth auth) throws Throwable {
        HttpServletRequest request = this.getCurrentHttpRequest();
        if (request == null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("No HTTP request found");

        String authHeader = request.getHeader("Authorization");

        boolean isAuthorized = this.authenticationService.authenticateUser(authHeader);

        if (!isAuthorized)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        return joinPoint.proceed();
    }

    private HttpServletRequest getCurrentHttpRequest() {
        ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        return attrs != null ? attrs.getRequest() : null;
    }
}
