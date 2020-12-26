package pl.edu.ug.inf.lexica.domain;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
@Entity
public class Progress {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

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
