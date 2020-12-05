package pl.edu.ug.inf.lexica.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class Progress<T extends Example<T>> extends Entity<Progress<T>> {
    private Task<T> task;
    private int completed;

    @Override
    public Progress<T> patch(Progress<T> that) {
        this.task = that.getTask();
        this.completed = that.getCompleted();
        return this;
    }
}
