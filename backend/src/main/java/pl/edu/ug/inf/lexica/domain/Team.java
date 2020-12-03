package pl.edu.ug.inf.lexica.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class Team extends Identifiable<Team>{
    private String name;
    private List<String> memberIds;
    private String leaderId;
    private List<String> taskIds;
    private String description;

    @Override
    public Team patch(Team that) {
        this.name = that.getName();
        this.memberIds = that.getMemberIds();
        this.leaderId = that.getLeaderId();
        this.taskIds = that.getTaskIds();
        this.description = that.getDescription();
        return this;
    }
}
