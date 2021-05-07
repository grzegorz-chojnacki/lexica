package pl.edu.ug.inf.lexica.api;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import pl.edu.ug.inf.lexica.domain.User;
import pl.edu.ug.inf.lexica.repository.UserRepository;
import pl.edu.ug.inf.lexica.service.TeamService;
import pl.edu.ug.inf.lexica.service.UserService;

import java.nio.charset.Charset;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
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

    @Autowired
    private UserRepository userRepository;

    private User user1;


    //    @Test
//    void getTeams() {
//    }
    public static final MediaType APPLICATION_JSON_UTF8 = new MediaType(MediaType.APPLICATION_JSON.getType(), MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

    @BeforeEach
    void setup() {
        user1 = new User("Jan", "Kowalski", "janK", "xyz123", "#D2326A");
        userRepository.saveAndFlush(user1);
    }

    @AfterEach
    void del() {
        userRepository.deleteAll();
    }

    @Test
    void getEmptyUser() throws Exception {
        // Setup our mocked service
        doReturn(Optional.empty()).when(service).get(principal);

        // Execute the GET request
        mockMvc.perform(MockMvcRequestBuilders.get("/user")
                .principal(principal))
                // Validate the response code
                .andExpect(status().isOk())
                .andDo(print());

    }

    @Test
    void getUser() throws Exception {
        // Setup our mocked service
        doReturn(Optional.of(user1)).when(service).get(principal);

        // Execute the GET request
        mockMvc.perform(MockMvcRequestBuilders.get("/user")
                .principal(principal))
                // Validate the response code
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstname").value("Jan"))
                .andExpect(jsonPath("$.surname").value("Kowalski"))
                .andExpect(jsonPath("$.username").value("janK"))
                .andExpect(jsonPath("$.color").value("#D2326A"))
                .andDo(print());

    }


    @Test
    void login() throws Exception {

        //userRepository.findByUsername("janK").get();
        Map<String, String> user = new HashMap<>();
        user.put("username", "janKc");
        user.put("password", "xyz123c");


        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(user);
        mockMvc.perform(MockMvcRequestBuilders.post("/user/login")
                .contentType(APPLICATION_JSON_UTF8)
                .content(requestJson))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    void register() throws Exception {
        Map<String, String> registration = new HashMap<>();
        registration.put("username", "janK");
        registration.put("password", "xyz123");
        registration.put("surname", "Kowalski");
        registration.put("firstname", "Jan");
        registration.put("color", "#9F865C");
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(registration);

        mockMvc.perform(MockMvcRequestBuilders.post("/user/register")
                .content(requestJson)
                .contentType(APPLICATION_JSON_UTF8))
                // Validate the response code
                .andExpect(status().is(200))
                .andDo(print());


    }
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