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
public class Task<T extends Example> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @OneToMany(mappedBy = "id")
    private List<T> examples;

    private boolean isActive;

    private String description;

    @ManyToOne
    private TaskType type;

    public Task<T> withPlainInfo() {
        Task<T> plainTask = new Task<>();

        // plainTask.setId(this.getId());
        plainTask.setName((this.name));
        plainTask.setActive(this.isActive);
        plainTask.setDescription(this.description);
        plainTask.setType(this.type);

        return plainTask;
    }
}
