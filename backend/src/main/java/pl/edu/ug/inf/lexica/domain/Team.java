package pl.edu.ug.inf.lexica.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @ManyToOne
    private User leader;

    @ManyToMany
    private List<User> members;

    // ToDo: @OneToMany
    @ManyToMany
    private List<Task> tasks;

    private String description;

    public Team withPlainInfo() {
        Team plainTeam = new Team();

        // plainTeam.setId(this.getId());
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

        // List<Task<SimpleCard>> someTasks = this.tasks.stream()
        //         .map(Task::withPlainInfo)
        //         .collect(Collectors.toList());

        plainTeam.setId(this.getId());
        plainTeam.setName(name);
        plainTeam.setLeader(leader.withSomeInfo());
        plainTeam.setDescription(description);
        // plainTeam.setTasks(someTasks);
        plainTeam.setMembers(someMembers);

        return plainTeam;
    }

    // @Override
    // public Team patch(Team that) {
    //     this.name = that.getName();
    //     this.members = that.getMembers();
    //     this.leader = that.getLeader();
    //     this.tasks = that.getTasks();
    //     this.description = that.getDescription();
    //     return this;
    // }
}
