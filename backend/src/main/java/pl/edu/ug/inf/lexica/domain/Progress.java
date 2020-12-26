package pl.edu.ug.inf.lexica.domain;

import lombok.*;

import javax.persistence.*;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
@Entity
public class Progress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NonNull
    @ManyToOne
    private Task task;

    @NonNull
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
