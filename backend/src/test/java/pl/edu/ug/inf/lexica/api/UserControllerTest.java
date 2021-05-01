package pl.edu.ug.inf.lexica.api;



import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.util.Assert;
import pl.edu.ug.inf.lexica.domain.User;
import pl.edu.ug.inf.lexica.service.TeamService;
import pl.edu.ug.inf.lexica.service.UserService;

import java.security.Principal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.Mockito.doReturn;
import static org.mockito.ArgumentMatchers.any;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static org.hamcrest.Matchers.*;
@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {
    @MockBean
    private UserService service;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TeamService teamService;

    @MockBean
    private BCryptPasswordEncoder crypt;

    @MockBean
    private Principal principal;

//    @Test
//    void getTeams() {
//    }

    @Test
    void getUser() throws Exception {
//        UserService userService = Mockito.mock(UserService.class);
      //  crypt = new BCryptPasswordEncoder();
       User user = new User("Jan", "Kowalski", "jkowalski", "opBUs", "#D2326A");

  //     user.setPassword(crypt.encode(user.getPassword()));
//        when(userService.get("jkowalski")).thenReturn(Optional.of(user));
//        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
//        UserController userController = new UserController(userService,bCryptPasswordEncoder);
//        Optional<User> optionalUser = userController.getUser(() -> "jkowalski");
//        assertEquals(Optional.of(user),optionalUser);
        // Setup our mocked service
        doReturn(Optional.empty()).when(service).get(principal);

        // Execute the GET request
         mockMvc.perform(MockMvcRequestBuilders.get("/user")
                .principal(principal))
                // Validate the response code
                .andExpect(status().is(401));

    }

//    @Test
//    void login() {
//    }
//
//    @Test
//    void register() {
//    }
//
//    @Test
//    void addProgress() {
//    }
//
//    @Test
//    void getProgress() {
//    }
//
//    @Test
//    void updateUser() {
//    }
//
//    @Test
//    void deleteUser() {
//    }
}