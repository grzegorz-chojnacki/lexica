package pl.edu.ug.inf.lexica.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Progress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Task<?> task;

    private int completed;

    //@JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    public Progress withPlainInfo() {
        Progress plainProgress = new Progress();

        plainProgress.setId(this.getId());
        plainProgress.setCompleted(this.completed);
        // plainProgress.setTaskId(this.taskId);

        return plainProgress;
    }
}
