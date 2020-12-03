package pl.edu.ug.inf.lexica.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SimpleCard extends TaskType<SimpleCard> {
    private String nativeWord;
    private String foreignWord;

    public SimpleCard patch(SimpleCard that) {
        this.nativeWord = that.getNativeWord();
        this.foreignWord = that.getForeignWord();
        return this;
    }
}
