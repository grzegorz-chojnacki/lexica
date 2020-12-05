package pl.edu.ug.inf.lexica.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Team extends Entity<Team> {
    private String name;
    private User leader;
    private List<User> members;
    private List<Task<SimpleCard>> tasks;
    private String description;

    public Team withPlainInfo() {
        Team plainTeam = new Team();

        plainTeam.setId(this.getId());
        plainTeam.setName(name);
        plainTeam.setLeader(leader.withPlainInfo());
        plainTeam.setDescription(description);

        return plainTeam;
    }

    public Team withSomeInfo() {
        Team plainTeam = new Team();
        List<User> someMembers = this.members.stream()
                .map(User::withSomeInfo)
                .collect(Collectors.toList());

        plainTeam.setId(this.getId());
        plainTeam.setName(name);
        plainTeam.setLeader(leader.withPlainInfo());
        plainTeam.setDescription(description);
        plainTeam.setMembers(someMembers);

        return plainTeam;
    }

    @Override
    public Team patch(Team that) {
        this.name = that.getName();
        this.members = that.getMembers();
        this.leader = that.getLeader();
        this.tasks = that.getTasks();
        this.description = that.getDescription();
        return this;
    }
}
