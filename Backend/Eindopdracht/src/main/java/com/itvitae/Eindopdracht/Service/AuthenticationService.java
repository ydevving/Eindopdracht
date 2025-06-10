package com.itvitae.Eindopdracht.Service;

import com.itvitae.Eindopdracht.Model.Transaction;
import com.itvitae.Eindopdracht.Model.User;
import com.itvitae.Eindopdracht.Repository.TransactionRepository;
import com.itvitae.Eindopdracht.Repository.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Stream;

class TTLQueueThread extends Thread {

    public TTLQueueThread() {
//        super("ttlThread");
    }

    @Override
    public void run() {

        System.out.println("Run TTLQueue service");

        try {
            while (true) {
                synchronized (this) {
                    AuthenticationService.userList.keySet().stream().peek((user) -> {
                        if (AuthenticationService.userList.get(user).TTL().isAfter(LocalDateTime.now()))
                            AuthenticationService.userList.remove(user);
                    });
                }


                synchronized (this) {
                    AuthenticationService.adminList.keySet().stream().peek((user) -> {
                        if (AuthenticationService.adminList.get(user).TTL().isAfter(LocalDateTime.now()))
                            AuthenticationService.adminList.remove(user);
                    });
                }

                // Checks every minute if User's token is expired
                sleep(TimeUnit.MINUTES.toMillis(1));
            }
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}

@Service
public class AuthenticationService {

    public record Token(
            String token,
            LocalDateTime TTL
    ) {
        public static Token of(String token, LocalDateTime TTL) {
            return new Token(token, TTL);
        }
    }

    public static HashMap<User, Token> userList = new HashMap<>();
    public static HashMap<User, Token> adminList = new HashMap<>();

    private static LocalDateTime defaultTTL = LocalDateTime.now().plusWeeks(1);
//    private static TTLQueueThread ttlThread = new TTLQueueThread();

    @Autowired
    UserRepository userRepo;

    @Autowired
    TransactionRepository transactionRepo;

    @PostConstruct
    void init() throws SQLException {
//        ttlThread.start();

//        Optional<User> admin = userRepo.findByUsername("admin");
//
//        if (!(admin.isPresent()))
//            throw new SQLException("User 'admin' has not been found in the Database!");
//
//        this.add(admin.get());
    }

    @PreDestroy
    void destruct() {
//        ttlThread.interrupt();
    }

    private String generateToken() {
        return UUID.randomUUID().toString();
    }

    public boolean authenticateUser(User user) {
        return (this.userList.get(user) != null);
    }

    public boolean authenticateAdmin(User user) {
        return (this.adminList.get(user) != null);
    }

    public String add(User user) {
        if (user.getUsername().equals("admin"))
            return this.addAdmin(user);

        return this.addUser(user);
    }

    public String addUser(User user) {
        String token = this.generateToken();

        this.userList.put(user, Token.of(token, defaultTTL));

        return token;
    }

    public String addAdmin(User user) {
        String token = generateToken();

        this.userList.put(user, Token.of(token, defaultTTL));
        this.adminList.put(user, Token.of(token, defaultTTL));

        return token;
    }

    public Boolean isAdmin(User user) {
        return user.getUsername().equals("admin");
    }

    public Optional<User> retrieveUserFromToken(String token) {
        return Stream.concat(adminList.entrySet().stream(), userList.entrySet().stream())
                .filter(entry -> entry.getValue().token.equals(token))
                .map(Map.Entry::getKey)
                .findFirst();
    }

    public boolean itemBelongsToUser(long itemID, String username) {

        List<Transaction> transactions = transactionRepo.findItemRentingUser(LocalDate.now(), username);

        if (transactions.size() == 1) {
            Transaction transaction = transactions.get(0);

//            if (username.equals("admin"))
//                return true;

            return (transaction.getRentingUser().getUsername().equals(username) && transaction.getItem().getId().equals(itemID));
        }

        return false;
    }
}
