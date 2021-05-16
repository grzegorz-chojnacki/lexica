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
import pl.edu.ug.inf.lexica.domain.Progress;
import pl.edu.ug.inf.lexica.domain.Task;
import pl.edu.ug.inf.lexica.domain.User;
import pl.edu.ug.inf.lexica.repository.UserRepository;
import pl.edu.ug.inf.lexica.service.TaskService;
import pl.edu.ug.inf.lexica.service.TeamService;
import pl.edu.ug.inf.lexica.service.UserService;

import java.nio.charset.Charset;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private TaskService taskService;

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
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user")
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
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user")
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
        Map<String, String> user = new HashMap<>();
        user.put("username", "janK");
        user.put("password", "xyz123c");

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(user);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/login")
                .contentType(APPLICATION_JSON_UTF8)
                .content(requestJson))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    void register() throws Exception {


        Map<String, String> registration = new HashMap<>();
        registration.put("username", "username");
        registration.put("password", "password");
        registration.put("surname", "surname");
        registration.put("firstname", "firstname");
        registration.put("color", "#9F865C");

        User user = new User();
        user.setUsername(registration.get("username"));
        user.setPassword(registration.get("password"));
        user.setFirstname(registration.get("firstname"));
        user.setSurname(registration.get("surname"));
        user.setColor(registration.get("color"));
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(registration);

        doReturn(Optional.of(user)).when(service).add(user);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/register")
                .content(requestJson)
                .contentType(APPLICATION_JSON_UTF8))
                // Validate the response code
                .andExpect(status().is(200))
                .andExpect(jsonPath("$.username").value("username"))
                .andExpect(jsonPath("$.color").value("#9F865C"))
                .andDo(print());
    }

//    @Test
//    void addProgress() throws Exception {
//        Task task = new Task();
//        Progress progress = new Progress(task,80);
//        ObjectMapper mapper = new ObjectMapper();
//        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
//        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
//        String requestJson = ow.writeValueAsString(progress);
//        user1.setProgress(Set.of(progress));
//
//        service.update(user1);
//        doReturn(Optional.of(user1)).when(service).get(principal);
//
//
//        mockMvc.perform(MockMvcRequestBuilders.put("/api/user/progress")
//                .content(requestJson)
//                .principal(principal)
//                .contentType(APPLICATION_JSON_UTF8))
//                // Validate the response code
//                .andExpect(status().is(200))
//                .andDo(print());
//    }

    @Test
    void getEmptyProgress() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/progress")
                .principal(principal))
                // Validate the response code
                .andExpect(status().is(200))
                .andExpect(content().string("[]"))
                .andDo(print());
    }

    @Test
    void getProgress() throws Exception {
        Task task = new Task();
        Progress progress = new Progress(task, 80);
        user1.setProgress(Set.of(progress));
        doReturn(Optional.of(user1)).when(service).get(principal);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/progress")
                .principal(principal))
                // Validate the response code
                .andExpect(status().is(200))
                .andExpect(content().string("[{\"task\":{\"id\":null},\"completion\":80}]"))
                .andDo(print());
    }

    @Test
    void updateUser() throws Exception {
        Map<String, String> user = new HashMap<>();
        user.put("username", "newName");
        user.put("password", "newPassword");
        user.put("firstname", "newFirstname");
        user.put("surname", "newSurname");
        user.put("color", "newColor");

        user1.setPassword(user.get("password"));
        user1.setUsername(user.get("username"));
        user1.setFirstname(user.get("firstname"));
        service.updateWithPassword(user1);

        doReturn(Optional.of(user1)).when(service).get(principal);

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(user);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/user")
                .contentType(APPLICATION_JSON_UTF8)
                .principal(principal)
                .content(requestJson))
                .andExpect(status().is(200));
    }

    @Test
    void deleteUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/user")
                .contentType(APPLICATION_JSON_UTF8)
                .principal(principal))
                .andExpect(status().is(200));
    }
}