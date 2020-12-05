package pl.edu.ug.inf.lexica.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

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
