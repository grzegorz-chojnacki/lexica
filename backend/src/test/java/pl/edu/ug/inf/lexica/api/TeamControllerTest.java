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
import pl.edu.ug.inf.lexica.domain.*;
import pl.edu.ug.inf.lexica.repository.TeamRepository;
import pl.edu.ug.inf.lexica.repository.UserRepository;
import pl.edu.ug.inf.lexica.service.TaskService;
import pl.edu.ug.inf.lexica.service.TeamService;
import pl.edu.ug.inf.lexica.service.UserService;

import java.nio.charset.Charset;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class TeamControllerTest {
    @MockBean
    private TeamService teamService;
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private Principal principal;
    @MockBean
    private TaskService taskService;
    @MockBean
    private UserService service;
    @MockBean
    private BCryptPasswordEncoder crypt;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private UserRepository userRepository;

    UUID id = UUID.fromString("c81d4e2e-bcf2-11e6-869b-7df92533d2db");
    private Team team;
    private User user1;
    public static final MediaType APPLICATION_JSON_UTF8 = new MediaType(MediaType.APPLICATION_JSON.getType(), MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));


    @BeforeEach
    void setup() {
        user1 = new User("Jan", "Kowalski", "janK", "xyz123", "#D2326A");
        userRepository.saveAndFlush(user1);

        team = new Team("team", user1, "description of team", "#D2326A");
        team.setId(id);
        teamRepository.saveAndFlush(team);
    }

    @AfterEach
    void del() {
        teamRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    void getTeam() throws Exception {
        doReturn(Optional.empty()).when(service).get(principal);

        mockMvc.perform(MockMvcRequestBuilders.get("/team/{id}", id)
                .principal(principal))
                .andExpect(status().isOk())
                .andDo(print());

    }

    @Test
    void addTeam() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(team);

        mockMvc.perform(MockMvcRequestBuilders.post("/team")
                .contentType(APPLICATION_JSON_UTF8)
                .content(requestJson)
                .principal(principal))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    void updateTeam() throws Exception {
        Team updateTeam = team;
        updateTeam.setDescription("new");
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(updateTeam);

        mockMvc.perform(MockMvcRequestBuilders.put("/team/{id}", id)
                .contentType(APPLICATION_JSON_UTF8)
                .content(requestJson)
                .principal(principal))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    void addTask() throws Exception {
        Task task = new Task("task", List.of(new SimpleCard("liczba", "number")), "task description", new TaskType(1, "Fiszka", "Fiszka to karteczka, która zawiera słówko w języku obcym, a na odwrocie jego tłumaczenie. Służy do nauki w oparciu o prosty mechanizm pytanie-odpowiedź."));
        taskService.add(task);
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(task);

        team.setTasks(List.of(task));
        // doReturn(team).when(team).getTasks().add(task);

        mockMvc.perform(MockMvcRequestBuilders.post("/team/{id}/task", id)
                .content(requestJson)
                .contentType(APPLICATION_JSON_UTF8)
                .principal(principal))
                .andExpect(status().isOk())
                .andDo(print());
    }
//
//    @Test
//    void removeTask() {
//    }
//
//    @Test
//    void joinTeam() {
//    }
//
//    @Test
//    void leaveTeam() {
//    }
//
//    @Test
//    void removeTeam() {
//    }
//
//    @Test
//    void getTask() {
//    }
//
//    @Test
//    void updateTask() {
//    }
}