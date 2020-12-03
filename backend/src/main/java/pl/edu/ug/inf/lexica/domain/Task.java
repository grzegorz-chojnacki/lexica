package pl.edu.ug.inf.lexica.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class Task<T> extends Identifiable<Task<T>> {
    private String name;
    private List<T> content;
    private String description;
    private boolean isActive;

    @Override
    public Task<T> patch(Task<T> that) {
        this.name = that.getName();
        this.content = that.getContent();
        this.description = that.getDescription();
        this.isActive = that.isActive();
        return this;
    }
}
