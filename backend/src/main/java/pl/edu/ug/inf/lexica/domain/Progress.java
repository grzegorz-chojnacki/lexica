package pl.edu.ug.inf.lexica.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class Progress extends Entity<Progress> {
    private String taskId;
    private int completed;

    public Progress withPlainInfo() {
        Progress plainProgress = new Progress();

        plainProgress.setId(this.getId());
        plainProgress.setCompleted(this.completed);
        plainProgress.setTaskId(this.taskId);

        return plainProgress;
    }

    @Override
    public Progress patch(Progress that) {
        this.taskId = that.getTaskId();
        this.completed = that.getCompleted();
        return this;
    }
}
