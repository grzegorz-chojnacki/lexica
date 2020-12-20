package pl.edu.ug.inf.lexica.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.inf.lexica.domain.Task;
import pl.edu.ug.inf.lexica.domain.Team;
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
        return teamService.getAll().stream().map(Team::withPlainInfo).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Team getTeam(@PathVariable Integer id) {
        return teamService.get(id).map(Team::withSomeInfo).orElse(null);
    }

    @PostMapping
    public Team addProgress(@RequestBody Team newTeam) {
      teamService.add(newTeam);
        return null;
    }
    //
    // @PostMapping
    // public Team addTeam(@RequestBody Team newTeam) {
    //     Team team = new Team().patch(newTeam);
    //     teamService.add(team);
    //     return team;
    // }
    //
    // @PutMapping("/{id}")
    // public Team updateTeam(@RequestBody Team newTeam, @PathVariable Integer id) {
    //     return teamService.replace(id, newTeam);
    // }
    //
    // @DeleteMapping("/{id}")
    // public void deleteTeam(@PathVariable Integer id) {
    //     teamService.remove(id);
    // }
}
