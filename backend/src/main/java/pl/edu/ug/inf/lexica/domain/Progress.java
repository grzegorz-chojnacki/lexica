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
    private long id;

    @ManyToOne
    private Task task;

    private int completed;

    public Progress withSomeInfo() {
        Progress progress = new Progress();

        progress.setId(this.id);
        progress.setCompleted(this.completed);

        Task task = new Task();
        task.setId(this.task.getId());
        progress.setTask(task);

        return progress;
    }
}
