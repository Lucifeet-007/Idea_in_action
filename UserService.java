package com.pitchperfect.service;

import com.pitchperfect.model.User;
import com.pitchperfect.exception.UserNotFoundException;
import com.pitchperfect.exception.InvalidCredentialsException;
import com.pitchperfect.exception.EmailAlreadyExistsException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class UserService {
    private final Map<Long, User> users = new ConcurrentHashMap<>();
    private final Map<String, User> usersByEmail = new ConcurrentHashMap<>();
    private Long nextId = 1L;

    public User registerUser(String name, String email, String password, String role, String phoneNumber) {
        // Check if email already exists
        if (usersByEmail.containsKey(email)) {
            throw new EmailAlreadyExistsException("Email already registered: " + email);
        }

        // Create new user
        User user = new User(name, email, password, role, phoneNumber);
        user.setId(nextId++);
        
        // Store user
        users.put(user.getId(), user);
        usersByEmail.put(email, user);
        
        return user;
    }

    public User loginUser(String email, String password) {
        User user = usersByEmail.get(email);
        if (user == null) {
            throw new UserNotFoundException("User not found with email: " + email);
        }

        if (!user.getPassword().equals(password)) {
            throw new InvalidCredentialsException("Invalid password");
        }

        user.setLastLogin(LocalDateTime.now());
        return user;
    }

    public User getUserById(Long id) {
        User user = users.get(id);
        if (user == null) {
            throw new UserNotFoundException("User not found with ID: " + id);
        }
        return user;
    }

    public User getUserByEmail(String email) {
        User user = usersByEmail.get(email);
        if (user == null) {
            throw new UserNotFoundException("User not found with email: " + email);
        }
        return user;
    }

    public List<User> getAllUsers() {
        return new ArrayList<>(users.values());
    }

    public List<User> getUsersByRole(String role) {
        return users.values().stream()
                .filter(user -> user.getRole().equals(role))
                .toList();
    }

    public void updateUser(User user) {
        if (!users.containsKey(user.getId())) {
            throw new UserNotFoundException("User not found with ID: " + user.getId());
        }
        users.put(user.getId(), user);
        usersByEmail.put(user.getEmail(), user);
    }

    public void deleteUser(Long id) {
        User user = users.remove(id);
        if (user != null) {
            usersByEmail.remove(user.getEmail());
        }
    }

    public void deactivateUser(Long id) {
        User user = getUserById(id);
        user.setActive(false);
        updateUser(user);
    }

    public void activateUser(Long id) {
        User user = getUserById(id);
        user.setActive(true);
        updateUser(user);
    }
}
