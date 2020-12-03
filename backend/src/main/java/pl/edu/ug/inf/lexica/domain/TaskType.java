package pl.edu.ug.inf.lexica.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public abstract class TaskType<T> extends Identifiable<T> {
    private String name;
    private String description;
}
