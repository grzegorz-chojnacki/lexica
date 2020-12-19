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
    private int id;

    private String name;

    // ToDo: @OneToMany
    @ManyToMany
    private List<SimpleCard> examples;

    private boolean isActive;

    private String description;

    @ManyToOne
    private TaskType type;

    public Task withPlainInfo() {
        Task plainTask = new Task();

        // plainTask.setId(this.getId());
        plainTask.setName((this.name));
        plainTask.setActive(this.isActive);
        plainTask.setDescription(this.description);
        plainTask.setType(this.type);

        return plainTask;
    }
}
