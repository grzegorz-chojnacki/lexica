package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Task;
import pl.edu.ug.inf.lexica.domain.Team;
import pl.edu.ug.inf.lexica.service.TeamService;
import pl.edu.ug.inf.lexica.service.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/team")
public class TeamController {
    private final TeamService teamService;
    private final UserService userService;

    @Autowired
    public TeamController(TeamService teamService, UserService userService) {
        this.teamService = teamService;
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public Team getTeam(@PathVariable Long id) {
        return teamService.get(id).map(Team::withMoreInfo).orElse(new Team());
    }

    @PostMapping
    public void addTeam(@RequestBody Team team) {
        teamService.add(team);
    }

    @PutMapping("/{id}")
    public void updateTeam(@RequestBody Team updated, @PathVariable Long id) {
        teamService.get(id).ifPresent(team -> {
            team.setName(updated.getName());
            team.setDescription(updated.getDescription());
            teamService.update(team);
        });
    }

    @DeleteMapping("/{id}")
    public void deleteTeam(@PathVariable Long id) {
        teamService.remove(id);
    }

    @PostMapping("/{id}/task")
    public void addTask(@RequestBody Task task, @PathVariable Long id) {
        teamService.get(id).ifPresent(team -> {
            team.getTasks().add(task);
            teamService.update(team);
        });
    }

    @PutMapping("/{teamId}/user/{userId}")
    public void joinTeam(@PathVariable Long teamId, @PathVariable Long userId) {
        teamService.get(teamId).ifPresent(team ->
            userService.get(userId).ifPresent(user -> {
                team.getMembers().add(user);
                teamService.update(team);
            })
        );
    }

    @DeleteMapping("/{teamId}/user/{userId}")
    public void leaveTeam(@PathVariable Long teamId, @PathVariable Long userId) {
        teamService.get(teamId).ifPresent(team ->
            userService.get(userId).ifPresent(user -> {
                team.getMembers().remove(user);
                teamService.update(team);
            })
        );
    }
}
