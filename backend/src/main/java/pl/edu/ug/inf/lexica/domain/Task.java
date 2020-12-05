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
public class Task<T> extends Identifiable<Task<T>> {
    private String name;
    private List<T> content;
    private boolean isActive;
    private String description;

    @Override
    public Task<T> patch(Task<T> that) {
        this.name = that.getName();
        this.content = that.getContent();
        this.description = that.getDescription();
        this.isActive = that.isActive();
        return this;
    }
}
