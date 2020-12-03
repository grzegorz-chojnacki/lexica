package pl.edu.ug.inf.lexica.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SimpleCard extends Identifiable<SimpleCard> {
    private String name;
    private String taskType;
    private String description;
    private boolean isActive;

    private String nativeWord;
    private String foreignWord;

    public SimpleCard patch(SimpleCard that) {
        this.name = that.getName();
        this.taskType = that.getTaskType();
        this.description = that.getDescription();
        this.isActive = that.isActive();
        this.nativeWord = that.getNativeWord();
        this.foreignWord = that.getForeignWord();
        return this;
    }
}
