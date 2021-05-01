package pl.edu.ug.inf.lexica.api;



import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import pl.edu.ug.inf.lexica.service.TeamService;
import pl.edu.ug.inf.lexica.service.UserService;

import java.nio.charset.Charset;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
public static final MediaType APPLICATION_JSON_UTF8 = new MediaType(MediaType.APPLICATION_JSON.getType(), MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));
    @Test
    void register() throws Exception {
        Map<String, String> registration = new HashMap<>();
        registration.put("username","xd");
        registration.put("password","xd");
        registration.put("surname","xd");
        registration.put("firstname","xd");
        registration.put("color","xd");
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow =  mapper.writer().withDefaultPrettyPrinter();
        String requestJson= ow.writeValueAsString(registration);
        mockMvc.perform(MockMvcRequestBuilders.post("/user/register")
                .contentType(APPLICATION_JSON_UTF8)
                .content(requestJson))
                // Validate the response code
                .andExpect(status().is(200));

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