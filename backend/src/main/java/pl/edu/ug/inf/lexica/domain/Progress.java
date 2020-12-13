package pl.edu.ug.inf.lexica.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@javax.persistence.Entity
@Table(name="progress")
public class Progress  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "progress_id")
    private String id;

    @Column(name = "task_id")
    private String taskId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "completed")
    private int completed;

    //@JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    public Progress withPlainInfo() {
        Progress plainProgress = new Progress();

        plainProgress.setId(this.getId());
        plainProgress.setCompleted(this.completed);
        plainProgress.setTaskId(this.taskId);

        return plainProgress;
    }


}
