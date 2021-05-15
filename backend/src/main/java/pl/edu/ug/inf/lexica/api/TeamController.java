package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Task;
import pl.edu.ug.inf.lexica.domain.Team;
import pl.edu.ug.inf.lexica.domain.User;
import pl.edu.ug.inf.lexica.service.TaskService;
import pl.edu.ug.inf.lexica.service.TeamService;
import pl.edu.ug.inf.lexica.service.UserService;

import java.security.Principal;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/team")
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
    public Optional<Team> getTeam(@PathVariable UUID id, Principal principal) {
        return teamService.getIfMember(id, principal).map(Team::withMoreInfo);
    }

    @PostMapping
    public void addTeam(@RequestBody Team team, Principal principal) {
        userService.get(principal).ifPresent(user -> {
            team.setLeader(user);
            team.getMembers().add(user);
            teamService.add(team);
        });
    }

    @PutMapping("/{id}")
    public void updateTeam(@RequestBody Team updated, @PathVariable UUID id, Principal principal) {
        teamService.getIfLeader(id, principal).ifPresent(team -> {
            team.setName(updated.getName());
            team.setDescription(updated.getDescription());
            team.setColor(updated.getColor());
            teamService.update(team);
        });
    }

    @PostMapping("/{id}/task")
    public void addTask(@RequestBody Task task, @PathVariable UUID id, Principal principal) {
        teamService.getIfLeader(id, principal).ifPresent(team -> {
            team.getTasks().add(task);
            teamService.update(team);
        });
    }

    @DeleteMapping("/{teamId}/task/{taskId}")
    public void removeTask(@PathVariable UUID teamId, @PathVariable UUID taskId, Principal principal) {
        teamService.getIfLeader(teamId, principal).ifPresent(team -> {
            taskService.get(taskId).ifPresent(task -> {
                team.getTasks().remove(task);
                teamService.update(team);
            });
        });
    }

    @PostMapping("/{id}/user")
    public void joinTeam(@RequestBody User u, @PathVariable UUID id) {
        teamService.get(id).ifPresent(team -> {
            userService.get(u.getId()).ifPresent(user -> {
                team.getMembers().add(user);
                teamService.update(team);
            });
        });
    }

    @DeleteMapping("/{teamId}/user/{userId}")
    public void leaveTeam(@PathVariable UUID teamId, @PathVariable UUID userId) {
        teamService.leaveTeam(teamId, userId);
    }

    @DeleteMapping("/{id}")
    public void removeTeam(@PathVariable UUID id, Principal principal) {
        teamService.getIfLeader(id, principal)
                .ifPresent(team -> teamService.remove(team.getId()));
    }

    @GetMapping("/{teamId}/task/{taskId}")
    public Optional<Task> getTask(@PathVariable UUID teamId, @PathVariable UUID taskId, Principal principal) {
        return teamService.getIfMember(teamId, taskId, principal).map(task -> {
            Collections.shuffle(task.getExamples());
            return task;
        });
    }

    @PutMapping("/{teamId}/task/{taskId}")
    public void updateTask(@RequestBody Task updated, @PathVariable UUID teamId, @PathVariable UUID taskId, Principal principal) {
        teamService.getIfLeader(teamId, taskId, principal).ifPresent(task -> {
            if (task.getType().getId().equals(updated.getType().getId())) {
                task.setName(updated.getName());
                task.setDescription(updated.getDescription());
                task.setExamples(updated.getExamples());
                taskService.update(task);
            }
        });
    }
}
