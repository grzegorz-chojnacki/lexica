package pl.edu.ug.inf.lexica.api;



import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.Assert;
import pl.edu.ug.inf.lexica.domain.User;
import pl.edu.ug.inf.lexica.service.UserService;

import java.security.Principal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class UserControllerTest {

    @Test
    void getTeams() {
    }

    @Test
    void getUser() {
//        UserService userService = Mockito.mock(UserService.class);
//        User user = new User("Jan", "Kowalski", "jkowalski", "opBUs", "#D2326A");
//        when(userService.get("jkowalski")).thenReturn(Optional.of(user));
//        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
//        UserController userController = new UserController(userService,bCryptPasswordEncoder);
//        Optional<User> optionalUser = userController.getUser(() -> "jkowalski");
//        assertEquals(Optional.of(user),optionalUser);

    }

    @Test
    void login() {
    }

    @Test
    void register() {
    }

    @Test
    void addProgress() {
    }

    @Test
    void getProgress() {
    }

    @Test
    void updateUser() {
    }

    @Test
    void deleteUser() {
    }
}