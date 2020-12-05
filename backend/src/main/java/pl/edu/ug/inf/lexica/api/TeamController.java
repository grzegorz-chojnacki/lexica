package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Team;
import pl.edu.ug.inf.lexica.service.EntityService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/team")
public class TeamController {
    private final EntityService<Team> teamService;

    @Autowired
    public TeamController(EntityService<Team> teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public List<Team> getTeams() {
        return teamService.getAll().stream().map(Team::withPlainInfo).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Team getTeam(@PathVariable String id) {
        return teamService.get(id).map(Team::withSomeInfo).orElse(null);
    }

    @PostMapping
    public Team addTeam(@RequestBody Team newTeam) {
        Team team = new Team().patch(newTeam);
        teamService.add(team);
        return team;
    }

    @PutMapping("/{id}")
    public Team updateTeam(@RequestBody Team newTeam, @PathVariable String id) {
        return teamService.replace(id, newTeam);
    }

    @DeleteMapping("/{id}")
    public void deleteTeam(@PathVariable String id) {
        teamService.remove(id);
    }
}
