package pl.edu.ug.inf.lexica.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Task<T extends Example<T>> extends Entity<Task<T>> {
    private String name;
    private List<T> examples;
    private boolean isActive;
    private String description;
    private TaskType type;

    public Task<T> withPlainInfo() {
        Task<T> plainTask = new Task<>();

        plainTask.setId(this.getId());
        plainTask.setName((this.name));
        plainTask.setActive(this.isActive);
        plainTask.setDescription(this.description);
        plainTask.setType(this.type);

        return plainTask;
    }

    @Override
    public Task<T> patch(Task<T> that) {
        this.name = that.getName();
        this.examples = that.getExamples();
        this.description = that.getDescription();
        this.isActive = that.isActive();
        this.type = that.getType();
        return this;
    }
}
