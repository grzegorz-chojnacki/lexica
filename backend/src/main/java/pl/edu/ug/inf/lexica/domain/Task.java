package pl.edu.ug.inf.lexica.domain;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NonNull
    private String name;

    @NonNull
    @OneToMany(cascade = CascadeType.ALL)
    private List<SimpleCard> examples;

    @NonNull
    private boolean isActive;

    @NonNull
    private String description;

    @NonNull
    @ManyToOne
    private TaskType type;

    public Task withSomeInfo() {
        Task task = new Task();

        task.setId(this.id);
        task.setName(this.name);
        task.setActive(this.isActive);
        task.setDescription(this.description);
        task.setType(this.type);

        return task;
    }
}
