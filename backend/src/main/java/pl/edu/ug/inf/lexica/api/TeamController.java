package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Task;
import pl.edu.ug.inf.lexica.domain.Team;
import pl.edu.ug.inf.lexica.domain.User;
import pl.edu.ug.inf.lexica.service.EntityService;
import pl.edu.ug.inf.lexica.service.TeamService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/team")
public class TeamController {
    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public List<Team> getTeams() {
        return teamService.getAll().stream().map(Team::withSomeInfo).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Team getTeam(@PathVariable Integer id) {
        return teamService.get(id).map(Team::withMoreInfo).orElse(new Team());
    }

    @GetMapping("/{id}/task")
    public List<Task> getTasks(@PathVariable Integer id) {
        return teamService.get(id).map(Team::getTasks).orElse(List.of());
    }

    @PostMapping
    public void addTeam(@RequestBody Team team) {
        teamService.add(team);
    }

    @PostMapping("/{id}/task")
    public void addTask(@RequestBody Task task, @PathVariable Integer id) {
        teamService.get(id).ifPresent(team -> {
            team.getTasks().add(task);
            teamService.update(team);
        });
    }

    @PostMapping("/{id}/join")
    public void joinTeam(@RequestBody User user, @PathVariable Integer id) {
        teamService.get(id).ifPresent(team -> {
            team.getMembers().add(user);
            teamService.update(team);
        });
    }

    @DeleteMapping("/{id}")
    public void deleteTeam(@PathVariable Integer id) {
        teamService.remove(id);
    }
}
