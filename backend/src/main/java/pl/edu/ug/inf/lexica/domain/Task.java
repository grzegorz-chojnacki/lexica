package pl.edu.ug.inf.lexica.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    // ToDo: @OneToMany
    @ManyToMany(cascade = CascadeType.ALL)
    private List<SimpleCard> examples;

    private boolean isActive;

    private String description;

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
