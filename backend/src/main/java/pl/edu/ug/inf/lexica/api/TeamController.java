package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Task;
import pl.edu.ug.inf.lexica.domain.Team;
import pl.edu.ug.inf.lexica.domain.User;
import pl.edu.ug.inf.lexica.service.TaskService;
import pl.edu.ug.inf.lexica.service.TeamService;
import pl.edu.ug.inf.lexica.service.UserService;

import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/team")
public class TeamController {
    private final TeamService teamService;
    private final UserService userService;
    private final TaskService taskService;

    @Autowired
    public TeamController(TeamService teamService, UserService userService, TaskService taskService) {
        this.teamService = teamService;
        this.userService = userService;
        this.taskService = taskService;
    }

    @GetMapping("/{id}")
    public Optional<Team> getTeam(@PathVariable UUID id) {
        return teamService.get(id).map(Team::withMoreInfo);
    }

    @PostMapping
    public void addTeam(@RequestBody Team team) {
        teamService.add(team);
    }

    @PutMapping("/{id}")
    public void updateTeam(@RequestBody Team updated, @PathVariable UUID id) {
        teamService.get(id).ifPresent(team -> {
            team.setName(updated.getName());
            team.setDescription(updated.getDescription());
            team.setColor(updated.getColor());
            teamService.update(team);
        });
    }

    @PostMapping("/{id}/task")
    public void addTask(@RequestBody Task task, @PathVariable UUID id) {
        teamService.get(id).ifPresent(team -> {
            team.getTasks().add(task);
            teamService.update(team);
        });
    }

    @DeleteMapping("/{teamId}/task/{taskId}")
    public void removeTask(@PathVariable UUID teamId, @PathVariable UUID taskId) {
        teamService.get(teamId).ifPresent(team ->
                taskService.get(taskId).ifPresent(task -> {
                    team.getTasks().remove(task);
                    teamService.update(team);
                })
        );
    }

    @PostMapping("/{id}/user")
    public void joinTeam(@RequestBody User u, @PathVariable UUID id) {
        teamService.get(id).ifPresent(team ->
                userService.get(u.getId()).ifPresent(user -> {
                    team.getMembers().add(user);
                    teamService.update(team);
                })
        );
    }

    @DeleteMapping("/{teamId}/user/{userId}")
    public void leaveTeam(@PathVariable UUID teamId, @PathVariable UUID userId) {
        teamService.get(teamId).ifPresent(team ->
                userService.get(userId).ifPresent(user -> {
                    user.getProgress().removeAll(user.getProgressInTeam(team));
                    team.getMembers().remove(user);
                    teamService.update(team);
                })
        );
    }

    @DeleteMapping("/{teamId}")
    public void removeTeam(@PathVariable UUID teamId) {
        teamService.get(teamId).ifPresent(team -> teamService.remove(team.getId()));
    }
}
