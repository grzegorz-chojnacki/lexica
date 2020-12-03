package pl.edu.ug.inf.lexica.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class Progress extends Identifiable<Progress> {
    private String taskId;
    private String userId;
    private int completed;

    @Override
    public Progress patch(Progress that) {
        this.taskId = that.getTaskId();
        this.userId = that.getUserId();
        this.completed = that.getCompleted();
        return this;
    }
}
